/* // utils/analytics.ts
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
let sessionId: string | null = null;

// Генерация/получение sessionId
export function getSessionId(): string {
  if (!sessionId) {
    sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }
  return sessionId;
}

// Получаем utm_* из URL
export function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    if (params.get(key)) utm[key] = params.get(key)!;
  });
  return utm;
}


let isGAReady = false;


export function initGA(gaId: string) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    (window.dataLayer as any).push(args);
  }
  (window as any).gtag = gtag;

  gtag("js", new Date());
  gtag("config", gaId);

  isGAReady = true;
  console.log("GA initialized with ID:", gaId);
}

export function trackEvent(event: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;

  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", event, {
      session_id: getSessionId(),
      ...getUtmParams(),
      ...params,
    });
  } else {
    console.warn("gtag not loaded yet:", event, params);
  }
}
 */

// utils/analytics.ts
// небольшая обёртка GA с очередью и типами
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

type QueuedEvent = { name: string; params: Record<string, any> };

const eventQueue: QueuedEvent[] = [];

let sessionId: string | null = null;

// Генерация/получение sessionId
export function getSessionId(): string {
  if (!sessionId) {
    sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }
  return sessionId;
}


/* function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("session_id");
  if (!id) {
    id = Math.random().toString(36).slice(2);
    sessionStorage.setItem("session_id", id);
  }
  return id;
} */

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
    (k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
  );
  return utm;
}

export function trackEvent(event: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    session_id: getSessionId(),
    ...getUtmParams(),
    ...params,
  };

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", event, payload);
    } catch (e) {
      console.warn("gtag send error", e);
    }
  } else {
    // ставим в очередь
    console.warn("gtag not loaded yet:", event, params);
    eventQueue.push({ name: event, params: payload });
  }
}

export function flushEventQueue() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  while (eventQueue.length) {
    const ev = eventQueue.shift()!;
    try {
      window.gtag("event", ev.name, ev.params);
    } catch (e) {
      console.warn("gtag send error", e);
    }
  }
}

// слушаем сигнал о готовности gtag
if (typeof window !== "undefined") {
  window.addEventListener("ga:gtagLoaded", () => {
    // даём немного времени, чтобы gtag точно доступен
    setTimeout(() => flushEventQueue(), 0);
  });

  // если gtag уже есть (редко), пробуем сбросить через секунду
  setTimeout(() => {
    if (typeof window.gtag === "function") flushEventQueue();
  }, 1000);
}

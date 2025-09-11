/* "use client";
import { useEffect } from "react";
import { initGA } from "@/utils/analytics";

export function GAInit() {
  useEffect(() => {
    if (localStorage.getItem("cookieConsent") === "true") {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (gaId) initGA(gaId);
    }
  }, []);

  return null;
}
 */

"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function GAInit() {
  const [consent, setConsent] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId) return;

    // если уже дали согласие
    if (localStorage.getItem("cookieConsent") === "true") {
      setConsent(true);
      return;
    }

    // слушаем событие от CookieConsent
    const handler = () => setConsent(true);
    window.addEventListener("cookieConsentAccepted", handler);
    return () => window.removeEventListener("cookieConsentAccepted", handler);
  }, [gaId]);

  if (!gaId || !consent) return null;

  return (
    <>
      {/* 1) внешний скрипт */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      {/* 2) inline инициализация (выполнится после загрузки внешнего скрипта) */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });

          // для нашей очереди событий — сигнал, что gtag готов
          window.dispatchEvent(new Event('ga:gtagLoaded'));
          console.info('gtag initialized (inline snippet)');
        `}
      </Script>
    </>
  );
}

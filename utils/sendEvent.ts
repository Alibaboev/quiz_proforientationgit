import { getSessionId } from "./analytics";
import { getUTMParams } from "./getUTMParams";

type EventPayload = {
  step: string;
  question?: string;
  answer?: string;
  status?: string;
  type?: string;
};

export const sendEventToServer = async (payload: EventPayload) => {
  try {
    await fetch("/api/session-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getSessionId(),
        utm: getUTMParams(),
        ...payload,
      }),
    });
  } catch (err) {
    console.error("❌ sendEventToServer error:", err);
  }
};

"use client";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/utils/analytics";
import { sendEventToServer } from "@/utils/sendEvent";

export function ThankYouScreen() {
  const t = useTranslations("ThankYouScreen");

  useEffect(() => {
    const payload = { source: "thank_you_page" }; 
    trackEvent("Generate_lead", payload);
    sendEventToServer(payload as any);
  }, []);

  return (
    <div className="quiz-container text-center">
      <div className="text-5xl mb-4">{t("emoji")}</div>
      <h2 className="mb-4">{t("title")}</h2>
      <p>
        {t("message1")}
        <br />
        <br />
        {t("message2")}{" "}
        <a
          href="https://medstudy.cz"
          className="font-bold underline"
          style={{ color: "#00C0FD" }}
        >
          {t("linkText")}
        </a>.
      </p>
    </div>
  );
}

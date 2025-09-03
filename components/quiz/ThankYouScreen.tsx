"use client";
import React from "react";

import { useTranslations } from "next-intl";

export function ThankYouScreen() {

  const t = useTranslations("ThankYouScreen");
  return (
    <div className="quiz-container text-center">
      <div className="text-5xl mb-4">{t("emoji")}</div>
      <h2 className="mb-4">{t("title")}</h2>
      <p>
        {t("message1")}
        <br />
        <br />

        {t("message2")}
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





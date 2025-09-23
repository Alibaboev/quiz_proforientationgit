"use client";
import React from "react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

export function StartScreen({ onStart }: { onStart: () => void }) {
  const t = useTranslations("StartScreen");

  return (
    <div className="quiz-container mt-12 mb-10 text-center" style={{ color: "#153060" }}>
      <p className="mb-2 text-left">{t("description")}</p>

      <div className="mt-6 flex justify-center space-x-6">
        <div className="flex flex-col items-center">
          <img src="/checkCircle.svg" alt="" className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold">{t("feature1")}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/clockIcon.svg" alt="" className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold">{t("feature3")}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/graduationCap.svg" alt="" className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold">{t("feature2")}</span>
        </div>
      </div>
      <div className="mt-6 mb-6 text-sm text-left">{t("footer")}</div>

      <Button onClick={onStart}>{t("button")}</Button>
    </div>
  );
}

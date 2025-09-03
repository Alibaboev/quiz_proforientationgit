"use client";
import React from "react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

export function StartScreen({ onStart }: { onStart: () => void }) {
  const t = useTranslations("StartScreen");

  return (
    <div className="quiz-container">
      <h1 className="mb-4">{t("title")}</h1>
      <p className="mb-8 text-[#7A8899]">{t("description")}</p>

      <Button onClick={onStart}>{t("button")}</Button>

      <div className="mt-6 text-xs text-gray-500">{t("footer")}</div>

      <div className="mt-4 flex justify-center space-x-4">
        <span className="text-sm font-semibold">{t("feature1")}</span>
        <span className="text-sm font-semibold">{t("feature2")}</span>
        <span className="text-sm font-semibold">{t("feature3")}</span>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(false);
  const t = useTranslations("CookieConsent");

  useEffect(() => {
    const stored = localStorage.getItem("cookieConsent");
    if (stored === "true") setAccepted(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setAccepted(true);

    // 🔑 сигнализируем GAInit, что можно загружать GA
    window.dispatchEvent(new Event("cookieConsentAccepted"));
    console.info("cookieConsentAccepted dispatched");
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-7 flex flex-col sm:flex-row sm:justify-between sm:items-center z-50 gap-4">
      <p>{t("massage")}</p>
      <Button onClick={acceptCookies} className="w-full sm:w-auto">
        {t("agree")}
      </Button>
    </div>
  );
}

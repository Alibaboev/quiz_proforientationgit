"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { useQuiz } from "@/context/QuizContext";
import { useLocale } from "next-intl";
import { buildPrompt } from "@/utils/buildPrompt";
import { getUTMParams } from "@/utils/getUTMParams";
import { formatAnswers } from "@/utils/formatAnswers";
import { trackEvent } from "@/utils/analytics";
import { sendEventToServer } from "@/utils/sendEvent";

export function LeadCaptureForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string; email: string }) => void;
}) {
  const { answers, setStep, role, level } = useQuiz();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const t = useTranslations("LeadCaptureForm");
  const locale = useLocale() || "uk";
  const [loading, setLoading] = useState(false);
  let emailSendError = "";


    const previewReport = (
    <div className="preview-content text-left text-gray-700 p-4 border rounded-lg bg-gray-50 blur-sm select-none">
      <h3 className="font-semibold mb-2">{t("preview.title")}</h3>
      <p className="mb-2">{t("preview.description")}</p>
      <h4 className="font-semibold mb-2">{t("preview.schoolsTitle")}</h4>
      <ul className="list-disc list-inside mb-2">
        <li>{t("preview.schools1")}</li>
        <li>{t("preview.schools2")}</li>
        <li>{t("preview.schools3")}</li>
      </ul>
      <small className="text-gray-500">{t("preview.note")}</small>
    </div>
  );




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role || !level) {
      alert("Неможливо згенерувати звіт: відсутні роль або рівень.");
      return;
    }

    try {
      setLoading(true);

      const finalPrompt = buildPrompt({ role, level, answers, locale: locale as "en" | "uk" | "ru" });

      let cleanedHtml = "";
      let reportOk = false;

      // 1. Генерация отчета
      try {
        const reportRes = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ promptText: finalPrompt }),
        });

        const reportData = await reportRes.json();
        if (reportRes.ok && reportData?.report?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const rawText = reportData.report.candidates[0].content.parts[0].text;
          cleanedHtml = rawText
            .replace(/```html\s*/, "")
            .replace(/```/, "")
            .replace(/<head[\s\S]*?<\/head>/gi, "")
            .replace(/<body[^>]*>/gi, "")
            .replace(/<\/body>/gi, "")
            .replace(/<\/?html[^>]*>/gi, "")
            .trim();
          reportOk = true;
        }
      } catch (err) {
        console.error("❌ Report generation failed:", err);
        emailSendError = "❌ Report generation failed. The email was not sent. ";
      }

      // 2. Отправка email
      if (reportOk) {
        try {
          const emailRes = await fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              html: cleanedHtml,
              subject: t("subject"),
            }),
          });
          const emailData = await emailRes.json();
          if (emailRes.ok) {
            trackEvent("email_sent", { step: "email_sent ", type: "report" });
          } else {
            trackEvent("email_sent", { step: "email_sent ", type: "fallback" });
          }
        } catch (err) {
          trackEvent("email_sent", { step: "email_sent ", type: "fallback" });
          console.error("❌ Email send error:", err);
        }
      }

      // 3. Отправка лида в Bitrix
      try {
        await fetch("/api/bitrix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Quiz Lead",
            name,
            email,
            source: "Proforientation quiz",
            answers: emailSendError + formatAnswers(answers, locale as "en" | "uk" | "ru"),
            utm: getUTMParams(),
          }),
        });
      } catch (err) {
        console.error("❌ Bitrix send error:", err);
      }

      setStep("thankyou");
      onSubmit({ name, email });
    } catch (err) {
      trackEvent("contact_form_submit", { step: "contact_form_submit", status: "error" });
      sendEventToServer({ step: "contact_form_submit" });
      console.error("Error during submit:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-container text-left">
      <h2 className="text-center text-lg sm:text-xl font-semibold mb-2">{t("title")}</h2>
      <p className="text-center text-gray-700 mb-6">{t("subtitle")}</p>
      {previewReport}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">{t("form.nameLabel")}</label>
          <input
            type="text"
            className="form-input w-full px-3 py-3 border border-gray-300 rounded text-base"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">{t("form.emailLabel")}</label>
          <input
            type="email"
            className="form-input w-full px-3 py-3 border border-gray-300 rounded text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="btn btn-primary text-lg px-8 py-3" disabled={loading}>
            {loading ? t("form.sending") : t("form.submit")}
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { useQuiz } from "@/context/QuizContext";
import { useLocale } from "next-intl";
import { getUTMParams } from "@/utils/getUTMParams";
import { formatAnswers } from "@/utils/formatAnswers";
import { trackEvent } from "@/utils/analytics";
import { sendEventToServer } from "@/utils/sendEvent";

export function LeadCaptureForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string; email: string }) => void;
}) {
  const { answers, setStep, role, level, reportPromise, reportHtml, setReportHtml } = useQuiz();
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

  let emailSendError = "";
  let bitrixSendError = "";
  let reportError = "";

  try {
    setLoading(true);

    let finalHtml = reportHtml;

    // ждём формирования отчёта, если ещё нет
    if (!finalHtml && reportPromise) {
      for (const delay of [0, 2000, 4000, 8000]) {
        if (delay) await new Promise((r) => setTimeout(r, delay));
        finalHtml = await Promise.race([
          reportPromise,
          new Promise<string | null>((resolve) =>
            setTimeout(() => resolve(null), 5000)
          ),
        ]);
        if (finalHtml) {
          setReportHtml(finalHtml);
          break;
        }
      }
    }

    if (!finalHtml) {
      reportError = "Report generation error, the email was not sent.";
      trackEvent("generate_report_error", { error_message: reportError });
      sendEventToServer({ step: "generate_report_error", error_message: reportError } as any);
    }

    const tasks: Promise<any>[] = [];

    // отправка email
    if (finalHtml) {
      tasks.push(
        fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            html: finalHtml,
            subject: t("subject"),
          }),
        })
          .then(async (res) => {
            if (res.ok) {
              trackEvent("email_sent", { step: "email_sent", type: "report" });
            } else {
              emailSendError = "Email send returned non-OK status.";
              trackEvent("email_sent", { step: "email_sent", type: "fallback", error_message: emailSendError });
              sendEventToServer({ step: "email_sent", error_message: emailSendError } as any);
            }
            return res.json();
          })
          .catch((err) => {
            emailSendError = (err as Error).message || "Unknown email send error";
            trackEvent("email_sent", { step: "email_sent", type: "fallback", error_message: emailSendError });
            sendEventToServer({ step: "email_send_error", error_message: emailSendError } as any);
            console.error("❌ Email send error:", err);
          })
      );
    }

    // отправка Bitrix
    tasks.push(
      fetch("/api/bitrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Quiz Lead",
          name,
          email,
          source_id: "Proforientation quiz",
          answers:
            reportError + emailSendError + formatAnswers(answers, locale as "en" | "uk" | "ru"),
          utm: getUTMParams(),
        }),
      })
        .catch((err) => {
          bitrixSendError = (err as Error).message || "Unknown Bitrix send error";
          trackEvent("bitrix_send_error", { error_message: bitrixSendError });
          sendEventToServer({ step: "bitrix_send_error", error_message: bitrixSendError } as any);
          console.error("❌ Bitrix send error:", err);
        })
    );

    await Promise.allSettled(tasks);


    const leadPayload = {
      step: "Lead_submit",
      user_role: role,
      education_level: level,
      top_direction: answers[0]?.answer || "",
      name,
      email,
    };
    trackEvent("Lead_submit", leadPayload);
    sendEventToServer(leadPayload);

    setStep("thankyou");
    onSubmit({ name, email });
  } catch (err) {
    trackEvent("contact_form_submit", {
      step: "contact_form_submit",
      status: "error",
      error_message: (err as Error).message,
    });
    sendEventToServer({ step: "contact_form_submit", error_message: (err as Error).message } as any);
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

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

  const previewReport = (
    <div className="preview-content mb-2 text-left text-gray-700 p-4 border rounded-lg bg-gray-50 blur-sm select-none text-sm">
      <h3 className="font-semibold mb-2 text-base">{t("preview.title")}</h3>
      <p className="mb-2 text-sm">{t("preview.description")}</p>
      <h4 className="font-semibold mb-2 text-sm">{t("preview.schoolsTitle")}</h4>
      <ul className="list-disc list-inside mb-2 text-xs">
        <li>{t("preview.schools1")}</li>
        <li>{t("preview.schools2")}</li>
        <li>{t("preview.schools3")}</li>
      </ul>
      <small className="text-gray-500 text-xs">{t("preview.note")}</small>
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

      //  email
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

      //  Bitrix
      tasks.push(
        fetch("/api/bitrix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Quiz Lead",
            name,
            email,
            source_id: "23",
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
    <div className="quiz-container mt-5 mb-5 text-[#153060] text-left">
      <h2 className="text-center text-2xl sm:text-2xl font-bold mb-4">{t("title")}</h2>
      <p className="mb-2">{t("subtitle")}</p>
      {previewReport}
      <h3 className="mb-2">{t("previewLabel")}</h3>
      <ul className="list-none mb-2 font-semibold space-y-1">
        <li className="flex items-center">
          <img src="/checkCircle.svg" alt="check" className="w-4 h-4 mr-2" />
          {t("listItem1")}
        </li>
        <li className="flex items-center">
          <img src="/checkCircle.svg" alt="check" className="w-4 h-4 mr-2" />
          {t("listItem2")}
        </li>
        <li className="flex items-center">
          <img src="/checkCircle.svg" alt="check" className="w-4 h-4 mr-2" />
          {t("listItem3")}
        </li>
      </ul>
      <small className="text-[14px]">{t("privacyNote")}</small>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-4">
          <input
            type="text"
            className="w-full p-3 border-2 border-[#C3E5F7] rounded-[16px] text-base font-semibold bg-gray-50 
               placeholder-[#153060]/80 
               focus:outline-none focus:ring-[#00C0FD] focus:border-[#00C0FD] 
               hover:border-[#00C0FD]"
            required
            placeholder={t("form.nameLabel")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="email"
            className="w-full p-3 border-2 border-[#C3E5F7] rounded-[16px] text-base font-semibold bg-gray-50 
               placeholder-[#153060]/80 
               focus:outline-none focus:ring-[#00C0FD] focus:border-[#00C0FD] 
               hover:border-[#00C0FD]"
            required
            placeholder={t("form.emailLabel")}
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

"use client";
import React, { useState, useEffect } from "react";
import { AnswerButton } from "../ui/AnswerButton";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";
import { useQuiz } from "@/context/QuizContext";
import { useLocale, useTranslations } from "next-intl";
import type { Option } from "@/dictionaries/quizDictionary";
import { trackEvent } from "@/utils/analytics";
import { sendEventToServer } from "@/utils/sendEvent";
import { buildPrompt } from "@/utils/buildPrompt";

export function QuizScreen() {
  const { questions, role, level, currentIndex, setCurrentIndex, setAnswers, answers, setStep, setReportPromise } = useQuiz();
  const [inputValue, setInputValue] = useState("");
  const t = useTranslations("QuizScreen");
  const locale = useLocale() || "uk";

  const roleQuestions = questions?.[role as keyof typeof questions] || {};
  let questionList: any[] = [];

  if (level && (roleQuestions as Record<string, any>)[level]) {
    questionList = (roleQuestions as Record<string, any>)[level];
  } else if ((roleQuestions as Record<string, any>)["all"]) {
    questionList = (roleQuestions as Record<string, any>)["all"];
  }

  const current = questionList[currentIndex];

  useEffect(() => {
    if (!current && questionList.length > 0) {
      setStep("form");
    }
  }, [current, questionList.length, setStep]);

  const handleAnswer = async (opt: any) => {
    if (!current) return;

    const answerValue = typeof opt === "string" ? opt : opt.answers[0];
    const questionId = `q${currentIndex}`;

    setAnswers([...answers, { question: questionId, answer: answerValue }]);

    const payload = {
      step: "Question_answered",
      question: questionId,
      question_text: current.question,
      answer: answerValue,
    };

    trackEvent("Question_answered", payload);
    await sendEventToServer(payload);

    if (currentIndex + 1 < questionList.length) {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
    } else {
      // 📌 генерим промис отчета
      const finalPrompt = buildPrompt({ role: role!, level: level!, answers: [...answers, { question: `q${currentIndex}`, answer: opt }], locale: locale as "en" | "uk" | "ru" });

      const reportPromise = (async () => {
        try {
          const res = await fetch("/api/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ promptText: finalPrompt }),
          });
          const data = await res.json();
          if (res.ok && data?.report?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.report.candidates[0].content.parts[0].text
              .replace(/```html\s*/, "")
              .replace(/```/, "")
              .replace(/<head[\s\S]*?<\/head>/gi, "")
              .replace(/<body[^>]*>/gi, "")
              .replace(/<\/body>/gi, "")
              .replace(/<\/?html[^>]*>/gi, "")
              .trim();
          }
        } catch (e) {
          console.error("❌ Gemini report error:", e);
        }
        return null;
      })();

      setReportPromise(reportPromise);

      const quizCompletePayload = {
        step: "Quiz_complete",
        completion_time: Math.round(performance.now() / 1000), 
        user_role: role,
        education_level: level,
      };

      trackEvent("Quiz_complete", quizCompletePayload);
      sendEventToServer(quizCompletePayload);


      setStep("form"); 
    }
  };

  if (!current) return null;

  return (
    <div className="quiz-container">
      <ProgressBar current={currentIndex + 1} total={questionList.length} />
      <p className="text-sm text-gray-500 mb-4">
        {t("progress", { current: currentIndex + 1, total: questionList.length })}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
        {current.question}
      </h2>

      {current.type === "multiple-choice" && current.options && (
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((opt: Option, i: number) => (
            <AnswerButton
              key={i}
              className="quiz-option"
              onClick={() => handleAnswer(opt)}
            >
              {opt.answers[0]}
            </AnswerButton>
          ))}
        </div>
      )}

      {current.type === "open-ended" && (
        <div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg text-base resize-y focus:outline-none focus:ring-2 focus:ring-[#00C0FD] focus:border-[#00C0FD] bg-gray-50"
            rows={4}
            placeholder={t("placeholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            className="btn btn-primary w-full sm:w-auto mt-3"
            disabled={inputValue.trim().length < 1}
            onClick={() => handleAnswer(inputValue.trim())}
          >
            {t("buttonNext")}
          </Button>
        </div>
      )}
    </div>
  );
}

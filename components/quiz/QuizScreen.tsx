"use client";
import React, { useState, useEffect } from "react";
import { AnswerButton } from "../ui/AnswerButton";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";
import { useQuiz } from "@/context/QuizContext";
import { useTranslations } from "next-intl";

export function QuizScreen() {
  const { questions, role, level, currentIndex, setCurrentIndex, setAnswers, answers, setStep } = useQuiz();
  const [inputValue, setInputValue] = useState("");
  const t = useTranslations("QuizScreen");

  let questionList: any[] = [];
  const current = questionList[currentIndex];

  useEffect(() => {
    if (!current && questionList.length > 0) {
      setStep("form");
    }
  }, [current, questionList.length, setStep]);

  if (!role) return <p>Role not selected</p>;

  const roleQuestions = questions?.[role as keyof typeof questions] || {};

  if (level && (roleQuestions as Record<string, any>)[level]) {
    questionList = (roleQuestions as Record<string, any>)[level];
  } else if ((roleQuestions as Record<string, any>)["all"]) {
    questionList = (roleQuestions as Record<string, any>)["all"];
  } else {
    questionList = [];
  }

  const handleAnswer = (opt: any) => {
    if (!current) return;

    const record =
      typeof opt === "string"
        ? { question: current.question, answer: opt }
        : { question: current.question, answer: opt.answers[0], tags: opt.tags };

    setAnswers([...answers, record]);

    if (currentIndex + 1 < questionList.length) {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
    } else {
      setStep("form");
    }
  };

  if (!current) return null;

  return (
    <div className="quiz-container">
      <ProgressBar current={currentIndex + 1} total={questionList.length} />
      <p className="text-sm text-gray-500 mb-4">
        {t("progress", {
          current: currentIndex + 1,
          total: questionList.length
        })}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
        {current.question}
      </h2>

      {current.type === "multiple-choice" && current.options && (
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((opt, i) => (
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

"use client";
import React from "react";
import { AnswerButton } from "../ui/AnswerButton";
import { useTranslations } from "next-intl";
import { useQuiz } from "@/context/QuizContext";

export function EducationLevelSelection() {
  const t = useTranslations("EducationLevelSelection");
  const { questions, role, setLevel, setStep, loading, error } = useQuiz();

  if (loading) return <p>Loading...</p>;
  if (error || !questions || !role) return <p>Error loading questions</p>;

  /*   const levels = Object.keys(questions [role] || {}) as string[]; */
  const levels = Object.keys((questions as Record<string, any>)?.[role] || {});


  const handleSelect = (level: string) => {
    setLevel(level);
    setStep("personalization");
  };

  return (
    <div className="quiz-container">
      <h2 className="mb-6">{t(`${role}.title`)}</h2>
      <div className="grid grid-cols-1 gap-4">
        {levels.map((level) => (
          <AnswerButton
            key={level}
            onClick={() => handleSelect(level)}
            className="quiz-option"
          >
            {t(`${role}.options.${level}`)}
          </AnswerButton>
        ))}
      </div>
    </div>
  );
}

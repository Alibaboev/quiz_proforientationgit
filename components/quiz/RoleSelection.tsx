"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { useQuiz } from "@/context/QuizContext";

export function RoleSelection() {
  const t = useTranslations("RoleSelection");
  const { questions, setRole, setStep, loading, error } = useQuiz();

  if (loading) return <p>Loading...</p>;
  if (error || !questions) return <p>Error loading questions</p>;

  const roles = Object.keys(questions) as (keyof typeof questions)[];

  const handleSelect = (role: string) => {
    setRole(role);
    setStep("education");
  };

  return (
    <div className="quiz-container">
      <h2 className="mb-6">{t("title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelect(role)}
            className="quiz-option text-center p-6 border-2 border-gray-200 rounded-lg bg-gray-50 transition-colors hover:border-[#00C0FD] hover:bg-gray-100"
          >
            <span className="text-3xl">{t(`${role}Icon`)}</span>
            <span className="block mt-2 font-bold">{t(role)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

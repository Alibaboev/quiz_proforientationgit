"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getQuestions, type QuizSource } from "@/services/quizService";
import type { QuestionBank } from "@/dictionaries/quizDictionary";
import { useLocale } from "next-intl";


export type Answer = {
  question: string;
  answer: string;
  tags?: string[];
};


export type Step = "start" | "role" | "education" | "personalization" | "quiz" | "form" | "thankyou";

type QuizContextType = {
  step: Step;
  setStep: (step: Step) => void;
  role: string | null;
  setRole: (role: string | null) => void;
  level: string | null;
  setLevel: (level: string | null) => void;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  currentQuestion: any | null;
  questions: QuestionBank | null;
  loading: boolean;
  error: string | null;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>("start");
  const [role, setRole] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionBank | null>(null);


  // 👇 указываем источник "local" | "api" 

  const source: QuizSource = "local";
  const locale = useLocale() || "uk";

  useEffect(() => {
    setLoading(true);
    getQuestions(source, locale)
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [source, locale]);


  const currentQuestion =
    role && level && questions?.[role] && questions[role][level as keyof typeof questions[typeof role]]
      ? questions[role][level as keyof typeof questions[typeof role]][currentIndex]
      : null;

  return (
    <QuizContext.Provider
      value={{
        step,
        setStep,
        role,
        setRole,
        level,
        setLevel,
        answers,
        setAnswers,
        currentIndex,
        setCurrentIndex,
        currentQuestion,
        questions,
        loading,
        error,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
}

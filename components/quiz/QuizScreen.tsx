"use client";
import React, { useState } from "react";
import { questions, type Question, type Option } from "@/dictionaries/quizDictionary";
import { AnswerButton } from "../ui/AnswerButton";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";

export function QuizScreen({
  role,
  educationLevel,
  onComplete,
}: {
  role: string;
  educationLevel: string;
  onComplete: (answers: { question: string; answer: string; tags?: string[] }[]) => void;
}) {
  const questionList: Question[] =
    role === "student"
      ? questions.student[educationLevel as keyof typeof questions.student] || []
      : role === "parent"
        ? questions.parent.all
        : [];

  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<{ question: string; answer: string; tags?: string[] }[]>([]);
  const current = questionList[index];

  console.log("QUIZ", { role, educationLevel, questionList });

  if (!current) {
    onComplete(answers);
    return null;
  }

  const handleAnswer = (opt: Option | string) => {
    let record;
    if (typeof opt === "string") {
      record = { question: current.question, answer: opt };
    } else {
      record = { question: current.question, answer: opt.answers[0], tags: opt.tags };
    }

    const updated = [...answers, record];
    setAnswers(updated);

    if (index + 1 < questionList.length) {
      setIndex(index + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <div className="quiz-container">

      <ProgressBar current={index + 1} total={questionList.length} />

      <p className="text-sm text-gray-500 mb-4">
        Питання {index + 1} з {questionList.length}
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
            placeholder="Ваша відповідь..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            className="btn btn-primary w-full sm:w-auto"
            disabled={inputValue.trim().length < 8}
            onClick={() => handleAnswer(inputValue.trim())}
          >
            Далі
          </Button>
        </div>
      )}
    </div>
  );
}

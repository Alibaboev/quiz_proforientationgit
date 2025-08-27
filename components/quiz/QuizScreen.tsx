"use client";
import React, { useState } from "react";
import { questions as allQuestions } from "@/dictionaries/quizDictionary";

export function QuizScreen({
  role,
  educationLevel,
  onComplete,
}: {
  role: string;
  educationLevel: string;
  onComplete: (answers: any[]) => void;
}) {
  const questionList = allQuestions[role][educationLevel] || [];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const current = questionList[index];

  const handleAnswer = (answer: string) => {
    const updated = [...answers, { question: current.question, answer }];
    setAnswers(updated);
    if (index + 1 < questionList.length) {
      setIndex(index + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <div className="quiz-container">
      <div className="progress-bar-container">
        <div
          className="progress-bar-inner"
          style={{ width: `${((index + 1) / questionList.length) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Питання {index + 1} з {questionList.length}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
        {current.question}
      </h2>

      {current.type === "multiple-choice" && (
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((opt: string, i: number) => (
            <button
              key={i}
              className="quiz-option"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {current.type === "open-ended" && (
        <div>
          <textarea
            className="open-question-textarea mb-4"
            rows={4}
            placeholder="Ваша відповідь..."
            onChange={(e) => {
              const val = e.target.value.trim();
              (document.getElementById("next-btn") as HTMLButtonElement).disabled =
                val.length < 8;
            }}
          />
          <button
            id="next-btn"
            disabled
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => {
              const val = (
                document.querySelector("textarea") as HTMLTextAreaElement
              ).value.trim();
              handleAnswer(val);
            }}
          >
            Далі
          </button>
        </div>
      )}
    </div>
  );
}

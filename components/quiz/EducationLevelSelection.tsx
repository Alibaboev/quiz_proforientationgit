"use client";
import React from "react";
import { AnswerButton } from "../ui/AnswerButton";

export function EducationLevelSelection({
    role,
    onSelect,
}: {
    role: string;
    onSelect: (level: string) => void;
}) {
    if (role === "parent") {
        return (
            <div className="quiz-container">
                <h2 className="mb-6">Для кого ви проходите тест?</h2>
                <button
                    className="quiz-option"
                    onClick={() => onSelect("parent_view")}
                >
                    Учень / студент
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <h2 className="mb-6">Вас цікавить вступ після:</h2>
            <div className="grid grid-cols-1 gap-4">
                <AnswerButton onClick={() => onSelect("grade_9")}>9 класу</AnswerButton>
                <AnswerButton onClick={() => onSelect("grade_11")}>11 класу</AnswerButton>
                <AnswerButton onClick={() => onSelect("bachelor")}>бакалавріату</AnswerButton>
                <AnswerButton onClick={() => onSelect("undecided")}>ще не визначився</AnswerButton>
            </div>

        </div>
    );
}

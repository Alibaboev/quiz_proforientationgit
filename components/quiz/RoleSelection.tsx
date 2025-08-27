"use client";
import React from "react";

export function RoleSelection({
    onSelect,
}: {
    onSelect: (role: string) => void;
}) {
    return (
        <div className="quiz-container">
            <h2 className="mb-6">Хто зараз проходить тест?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect("student")}
                    className="quiz-option text-center p-6 border-2 border-gray-200 rounded-lg bg-gray-50 transition-colors hover:border-[#00C0FD] hover:bg-gray-100"
                >
                    <span className="text-3xl">🎓</span>
                    <span className="block mt-2 font-bold">Я — учень/студент</span>
                </button>
                <button
                    onClick={() => onSelect("parent")}
                    className="quiz-option text-center p-6 border-2 border-gray-200 rounded-lg bg-gray-50 transition-colors hover:border-[#00C0FD] hover:bg-gray-100"
                >
                    <span className="text-3xl">👨‍👩‍👧‍👦</span>
                    <span className="block mt-2 font-bold">Я — батько/мати</span>
                </button>
            </div>


        </div>
    );
}

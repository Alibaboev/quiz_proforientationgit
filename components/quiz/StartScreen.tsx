"use client";
import React from "react";
import { Button } from "../ui/Button";

export function StartScreen({ onStart }: { onStart: () => void }) {
    return (
        <div className="quiz-container">
            <h1 className="mb-4">
                🎯 Обери професію та університет мрії в Чехії — за 5 хвилин
            </h1>
            <p className="mb-8 text-[#7A8899]">
                Відповідай на 7 простих запитань — і отримай підбірку спеціальностей та університетів, які підійдуть саме тобі. Більше 1000 абітурієнтів вже знайшли свій шлях з нашим AI-тестом.
            </p>

            <Button onClick={onStart}
            >
                Розпочати тест
            </Button>
            <div className="mt-6 text-xs text-gray-500">
                <p>
                    AI та наші консультанти вже допомогли сотням студентів вступити на бюджет
                    у Чехії.
                </p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <span className="text-sm font-semibold">✅ Безкоштовно</span>
                <span className="text-sm font-semibold">⏱ Лише 5 хвилин</span>
                <span className="text-sm font-semibold">🎓 Рекомендації від експертів</span>
            </div>
        </div>
    );
}

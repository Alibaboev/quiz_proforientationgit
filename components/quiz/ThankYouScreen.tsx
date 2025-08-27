"use client";
import React from "react";

export function ThankYouScreen() {
  return (
    <div className="quiz-container text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="mb-4">Дякуємо!</h2>
      <p>
        Ваші персональні рекомендації вже в дорозі! Перевірте пошту, яку ви вказали.
        <br />
        <br />
        А поки ви чекаєте, можете ознайомитись з нашими програмами на{" "}
        <a
          href="https://medstudy.cz"
          className="font-bold underline"
          style={{ color: "#00C0FD" }}
        >
          основному сайті
        </a>.
      </p>
    </div>
  );
}

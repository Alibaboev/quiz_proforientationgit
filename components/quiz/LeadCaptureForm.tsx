"use client";
import React, { useState } from "react";

export function LeadCaptureForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string; email: string }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="quiz-container text-left">
      <h2 className="mb-4">Тест пройдено!</h2>
      <p className="mb-4">
        Ваш AI-звіт майже готовий. Отримайте підбірку спеціальностей і факультетів.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ name, email });
        }}
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Ваше ім'я</label>
          <input
            type="text"
            className="form-input w-full"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Email для отримання результатів
          </label>
          <input
            type="email"
            className="form-input w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full text-lg"
        >
          Отримати звіт на пошту
        </button>
      </form>
    </div>
  );
}

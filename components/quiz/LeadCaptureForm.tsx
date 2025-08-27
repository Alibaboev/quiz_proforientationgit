"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";

export function LeadCaptureForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string; email: string }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Пока захардкоженный отчёт (будем формировать динамически позже)
  const previewReport = (
    <div className="preview-content text-left text-gray-700 p-4 border rounded-lg bg-gray-50 blur-sm select-none">
      <h3 className="font-semibold mb-2">Ваш напрям</h3>
      <p className="mb-2">
        За відповідями вам підходить <b>Гуманітарний</b> напрям. Це допоможе
        обрати профіль навчання після 9 класу.
      </p>
      <h4 className="font-semibold mb-2">Рекомендовані типи шкіл</h4>
      <ul className="list-disc list-inside mb-2">
        <li>Гуманітарна гімназія</li>
        <li>Педагогічна школа</li>
        <li>Ліцей суспільних наук</li>
      </ul>
      <small className="text-gray-500">
        Порада: на консультації підберемо конкретні школи та пояснимо терміни подачі документів.
      </small>
    </div>
  );

  return (
    <div className="quiz-container text-left">
      <h2 className="text-center text-lg sm:text-xl font-semibold mb-2">
        Тест пройдено!
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Ваш AI-звіт майже готовий. Отримайте підбірку спеціальностей і факультетів саме для вас.
      </p>

      {/* Превью отчет */}
      <div className="preview-wrap mb-4">
        {previewReport}
        <span className="preview-label text-sm text-gray-500 block mt-1 text-center">
          Повний звіт надішлемо на пошту
        </span>
      </div>

      {/* Пункти */}
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>Що й де вчитись у Чехії</li>
        <li>3 університети + 6 факультетів</li>
        <li>Кроки на найближчі 2 тижні</li>
      </ul>

      <p className="text-xs text-gray-500 mb-6 text-center">
        Дані захищено. Без спаму. Можна відписатися в 1 клік.
      </p>

      {/* Форма */}
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
            className="form-input w-full px-3 py-3 border border-gray-300 rounded text-base"
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
            className="form-input w-full px-3 py-3 border border-gray-300 rounded text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="btn btn-primary text-lg px-8 py-3"
          >
            Отримати звіт на пошту
          </Button>
        </div>
      </form>
    </div>
  );
}

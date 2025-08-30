/* // /app/api/lead/route.ts

import { NextRequest, NextResponse } from "next/server";
import parsePhoneNumber from "libphonenumber-js";
import validator from "email-validator";
import { LeadInfo, sendToBitrix, UTMArguments } from "@/integrations/bitrix"; // Ваша существующая интеграция
import { getDictionary } from "@/dictionaries/dictionaries"; // Ваша функция для загрузки словарей

// --- ИМПОРТЫ ДЛЯ НОВЫХ ИНТЕГРАЦИЙ ---
// Программисту нужно будет создать эти файлы в папке /integrations/
// import { sendEmail } from "@/integrations/email"; 
// import { generateReport } from "@/integrations/gemini";

// --- НОВАЯ ЛОГИКА ФОРМИРОВАНИЯ КОММЕНТАРИЯ ДЛЯ CRM ---
const getComment = (answers: { question: string; answer: string; type: string }[], aiReportHtml: string) => {
  if (!answers || answers.length === 0) {
    return aiReportHtml || "";
  }
  
  const openAnswersText = answers
    .filter(a => a.type === 'open-ended')
    .map(a => `${a.question}:\n${a.answer}`)
    .join('\n\n');

  return `--- AI-ЗВІТ ---\n${aiReportHtml}\n\n--- ВІДПОВІДІ НА ВІДКРИТІ ПИТАННЯ ---\n${openAnswersText}`;
};


// --- ОСНОВНОЙ ОБРАБОТЧИК ---
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, country, answers, lang, utm, userRole, educationLevel, scores, languagePreference } = body;

    // --- Валидация данных ---
    if (!email || !validator.validate(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
    if (phone) {
      const phoneNumber = parsePhoneNumber(phone, country);
      if (!phoneNumber?.isValid()) {
        return NextResponse.json({ message: "Invalid phone number" }, { status: 400 });
      }
    }

    // --- ИНТЕГРАЦИЯ С GEMINI (МОК) ---
    // В реальном приложении здесь будет вызов функции generateReport
    const dict = await getDictionary(lang);
    const topDir = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const topDirLabel = dict.proforientation.prompts.DIR_LABELS[topDir] || 'Технічний';
    const aiReportHtml = `<h2>Ваш персональний звіт</h2><p>На основі ваших відповідей, ми визначили, що вам найбільше підходить <b>${topDirLabel} напрям</b>.</p><p>Детальні рекомендації вже чекають на вашій пошті!</p>`;
    // const aiReportHtml = await generateReport({ answers, lang, userRole, educationLevel, scores, languagePreference });
    
    if (!aiReportHtml) {
        return NextResponse.json({ message: "Failed to generate AI report." }, { status: 500 });
    }

    // --- ИНТЕГРАЦИЯ С BITRIX24 ---
    const title = answers ? `AI Квіз - ${name}` : `Лендинг - ${name}`;
    const comment = getComment(answers, aiReportHtml);

    const bitrixInfo: LeadInfo = {
      email: email,
      name: name,
      phone: phone || "",
      comment: comment,
    };
    const utmInfo: UTMArguments = utm;

    await sendToBitrix(title, bitrixInfo, utmInfo);
    
    // --- ИНТЕГРАЦИЯ С СЕРВИСОМ РАССЫЛОК (МОК) ---
    console.log(`MOCK EMAIL: Sending report to ${email}`);
    // await sendEmail({
    //     to: email,
    //     subject: "Ваші персональні результати тесту з профорієнтації",
    //     html: aiReportHtml,
    // });

    return NextResponse.json({ message: "DONE" });

  } catch (error) {
    console.error("API Lead Error:", error);
    return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
  }
}
 */
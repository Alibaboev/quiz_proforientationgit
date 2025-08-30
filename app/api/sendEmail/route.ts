import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/integrations/email";
import { useQuiz } from "@/context/QuizContext";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, answers } = body;

    if (!name || !email || !answers) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const subject = "Ваши ответы с квиза";
    const html = `
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <h3>Ответы:</h3>
      <ul>
        ${answers.map((a: any) => `<li><strong>${a.question}:</strong> ${a.answer}</li>`).join("")}
      </ul>
    `;
    const text = `Имя: ${name}\nEmail: ${email}\nОтветы:\n${answers.map((a: any) => `${a.question}: ${a.answer}`).join("\n")}`;

    const success = await sendEmail({ to: email, subject, html, text });
    return success ? NextResponse.json({ success: true }) : NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  } catch (error: any) {
    console.error("SendGrid error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

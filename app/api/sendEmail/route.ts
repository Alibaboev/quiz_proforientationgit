// app/api/sendEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/integrations/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, html } = body;

    if (!name || !email || !html || !subject) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Отправка письма через интеграцию SendGrid
    const success = await sendEmail({
      to: email,
      subject,
      html,
      // текстовое поле можно не передавать, если html уже готов
      text: html.replace(/<\/?[^>]+(>|$)/g, ""), // простая очистка HTML для текстовой версии
    });

    if (!success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("SendEmail API error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}

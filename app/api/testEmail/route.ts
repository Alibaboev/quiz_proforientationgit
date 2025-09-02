// app/api/testEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

const API_KEY = process.env.SENDGRID_API_KEY;
if (!API_KEY) throw new Error("SENDGRID_API_KEY is not set");
sgMail.setApiKey(API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@example.com";
const FROM_NAME = process.env.EMAIL_FROM_NAME || "Quiz Service";
const DEFAULT_REPLY_TO = process.env.EMAIL_REPLY_TO || "support@example.com";

export async function GET(req: NextRequest) {
  try {
    const msg: MailDataRequired = {
      to: "jura.tokhtar@gmail.com", // твой тестовый email
      from: { email: FROM_EMAIL, name: FROM_NAME },
      replyTo: DEFAULT_REPLY_TO,
      subject: "Тестовая отправка SendGrid",
      html: `<h1>Привет!</h1><p>Это тестовая проверка отправки письма через SendGrid с Next.js 13.</p>`,
      text: "Привет! Это тестовая проверка отправки письма через SendGrid с Next.js 13.",
      mailSettings: { sandboxMode: { enable: false } }, // реально отправляем
      trackingSettings: {
        clickTracking: { enable: true, enableText: true },
        openTracking: { enable: true },
      },
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("SendGrid test email error:", err?.response?.body || err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

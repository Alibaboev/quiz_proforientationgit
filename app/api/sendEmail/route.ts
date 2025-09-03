import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/integrations/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, html } = body;

    if (!name || !email || !html || !subject) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const success = await sendEmail({
      to: email,
      subject,
      html,
      text: html.replace(/<\/?[^>]+(>|$)/g, ""), 
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

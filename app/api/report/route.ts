/* import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptText } = body; // теперь принимаем готовый текст

    if (!promptText) {
      return NextResponse.json({ error: "Prompt text is required" }, { status: 400 });
    }

    // --- Отправляем готовый промт в Gemini ---
    console.log("Sending prompt to Gemini:", promptText);
console.log("Gemini URL:", `${process.env.GEMINI_API_URL}/models/${process.env.GEMINI_API_MODEL}:generateText?key=${process.env.GEMINI_API_KEY}`);
    const geminiRes = await fetch(
      `${process.env.GEMINI_API_URL}/models/${process.env.GEMINI_API_MODEL}:generateText?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          maxOutputTokens: 500,
        }),
      }
    );

    const geminiData = await geminiRes.json();

    return NextResponse.json({ report: geminiData });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptText } = body;

    if (!promptText) {
      return NextResponse.json({ error: "Prompt text is required" }, { status: 400 });
    }

    console.log("=== /api/report POST ===");
    console.log("Received promptText:", promptText);

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    console.log("Gemini URL:", geminiUrl);

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      }),
    });

    const rawText = await geminiRes.text(); // читаем как текст
    console.log("Gemini raw response:", rawText);

    let geminiData;
    try {
      geminiData = JSON.parse(rawText);
    } catch (e) {
      return NextResponse.json(
        { error: "Gemini returned non-JSON response", details: rawText },
        { status: 500 }
      );
    }

    if (!geminiRes.ok) {
      return NextResponse.json(
        { error: geminiData.error?.message || "Gemini API error", details: geminiData },
        { status: geminiRes.status }
      );
    }

    return NextResponse.json({ report: geminiData });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

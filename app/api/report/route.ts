// app/api/report/route.ts
import { NextRequest, NextResponse } from "next/server";

async function fetchWithRetry(url: string, options: any, retries = 2, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);

    if (res.status !== 503) return res;

    console.warn(`⚠️ Gemini вернул 503. Попытка ${i + 1} из ${retries}`);

    if (i < retries - 1) {
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
  throw new Error("Gemini API overloaded (503) after retries");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptText } = body;

    if (!promptText) {
      return NextResponse.json({ error: "Prompt text is required" }, { status: 400 });
    }

    // Використовуємо налаштування з .env
    const apiVersion = process.env.GEMINI_API_VERSION || 'v1';
    const model = process.env.GEMINI_API_MODEL || 'gemini-1.5-flash';
    const geminiUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    console.log('🤖 Calling Gemini API:', { apiVersion, model });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      }),
    };

    const geminiRes = await fetchWithRetry(geminiUrl, options, 3, 2000);

    const rawText = await geminiRes.text();

    let geminiData;
    try {
      geminiData = JSON.parse(rawText);
    } catch (e) {
      console.error('❌ Gemini returned non-JSON:', rawText);
      return NextResponse.json(
        { error: "Gemini returned non-JSON response", details: rawText },
        { status: 500 }
      );
    }

    if (!geminiRes.ok) {
      console.error('❌ Gemini API error:', geminiData);
      return NextResponse.json(
        { error: geminiData.error?.message || "Gemini API error", details: geminiData },
        { status: geminiRes.status }
      );
    }

    console.log('✅ Gemini API success');
    return NextResponse.json({ report: geminiData });
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

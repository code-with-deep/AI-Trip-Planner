import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Invalid messages format" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    const aiMessage = completion.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { message: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: aiMessage });
  } catch (err: any) {
    console.error("AI API ERROR:", err);
    return NextResponse.json(
      { message: "Server Error: " + err.message },
      { status: 500 }
    );
  }
}

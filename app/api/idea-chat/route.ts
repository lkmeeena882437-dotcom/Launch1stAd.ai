import { NextResponse } from "next/server";
import { answerMarketingQuestion } from "@/lib/ai/chatIdeas";

export async function POST(request: Request) {
  const body = (await request.json()) as { question?: string };
  const answer = await answerMarketingQuestion(body.question || "");
  return NextResponse.json({ ok: true, answer });
}

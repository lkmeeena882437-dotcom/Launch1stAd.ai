import { NextResponse } from "next/server";
import { answerMarketingQuestion } from "@/lib/ai/chatIdeas";
import { validateUserPrompt } from "@/lib/security/inputGuard";

export async function POST(request: Request) {
  const body = (await request.json()) as { question?: string };
  const question = body.question || "";
  const check = validateUserPrompt(question);
  if (!check.ok) return NextResponse.json({ ok: false, answer: check.message }, { status: 200 });
  const answer = await answerMarketingQuestion(question);
  return NextResponse.json({ ok: true, answer });
}

import { NextResponse } from "next/server";
import { answerMarketingQuestion } from "@/lib/ai/chatIdeas";
import { checkRateLimit, rateLimitResponse } from "@/lib/server/rateLimit";
import { validateUserPrompt } from "@/lib/security/inputGuard";

export async function POST(request: Request) {
  const limit = checkRateLimit(request, { key: "idea-chat", limit: 12, windowMs: 60_000 });
  if (!limit.ok) return rateLimitResponse(limit);

  const body = (await request.json().catch(() => ({}))) as { question?: string };
  const question = body.question || "";
  const check = validateUserPrompt(question);
  if (!check.ok) return NextResponse.json({ ok: false, answer: check.message }, { status: 200 });
  const answer = await answerMarketingQuestion(question);
  return NextResponse.json({ ok: true, answer });
}

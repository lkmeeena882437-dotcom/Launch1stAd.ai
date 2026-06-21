import { NextResponse } from "next/server";
import type { CampaignInput } from "@/lib/campaign";
import { generateCampaignWithAI } from "@/lib/ai/provider";

export async function POST(request: Request) {
  const body = (await request.json()) as CampaignInput;
  const result = await generateCampaignWithAI(body);
  return NextResponse.json({ ok: true, ...result });
}

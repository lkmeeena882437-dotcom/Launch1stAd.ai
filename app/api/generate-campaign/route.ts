import { NextResponse } from "next/server";
import { buildCampaign, type CampaignInput } from "@/lib/campaign";

export async function POST(request: Request) {
  const body = (await request.json()) as CampaignInput;
  const campaign = buildCampaign(body);
  return NextResponse.json({ ok: true, campaign });
}

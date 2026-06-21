import type { CampaignInput } from "@/lib/campaign";
import { buildCampaign } from "@/lib/campaign";

type CampaignOutput = ReturnType<typeof buildCampaign>;

export async function requestCampaign(input: CampaignInput): Promise<{ campaign: CampaignOutput; source: "ai" | "fallback" }> {
  const response = await fetch("/api/generate-campaign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    return { campaign: buildCampaign(input), source: "fallback" };
  }

  return response.json();
}

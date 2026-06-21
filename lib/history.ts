import type { CampaignInput } from "./campaign";

export const campaignHistoryKey = "launch1stad.campaignHistory";
export const campaignReuseKey = "launch1stad.reuseCampaign";

export type SavedCampaign = {
  id: string;
  title: string;
  createdAt: string;
  input: CampaignInput;
  summary: string;
  clientId?: string;
  clientName?: string;
};

export function makeCampaignTitle(input: CampaignInput) {
  const name = input.businessName || "Business";
  const product = input.product || input.category || "campaign";
  return `${name} - ${product}`;
}

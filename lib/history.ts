import type { CampaignInput } from "./campaign";

export const campaignHistoryKey = "launch1stad.campaignHistory";

export type SavedCampaign = {
  id: string;
  title: string;
  createdAt: string;
  input: CampaignInput;
  summary: string;
};

export function makeCampaignTitle(input: CampaignInput) {
  const name = input.businessName || "Business";
  const product = input.product || input.category || "campaign";
  return `${name} - ${product}`;
}

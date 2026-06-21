import type { CampaignInput } from "./campaign";

export const campaignHistoryKey = "launch1stad.campaignHistory";
export const campaignReuseKey = "launch1stad.reuseCampaign";

export type CampaignStatus = "Draft" | "In Review" | "Approved" | "Running" | "Completed";

export type SavedCampaign = {
  id: string;
  title: string;
  createdAt: string;
  input: CampaignInput;
  summary: string;
  clientId?: string;
  clientName?: string;
  status?: CampaignStatus;
  reviewNote?: string;
};

export function makeCampaignTitle(input: CampaignInput) {
  const name = input.businessName || "Business";
  const product = input.product || input.category || "campaign";
  return `${name} - ${product}`;
}

export function statusLabel(status?: CampaignStatus) {
  return status || "Draft";
}

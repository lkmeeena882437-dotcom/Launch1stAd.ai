import { campaignHistoryKey, type SavedCampaign } from "./history";

export function readLocalCampaignHistory() {
  try {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    return raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
  } catch {
    return [];
  }
}

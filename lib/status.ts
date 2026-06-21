import { campaignHistoryKey, type CampaignStatus, type SavedCampaign } from "./history";

function readCampaigns() {
  try {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    return raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
  } catch {
    return [];
  }
}

export function updateCampaignStatus(id: string, status: CampaignStatus, reviewNote = "") {
  const items = readCampaigns();
  const next = items.map((item) => item.id === id ? { ...item, status, reviewNote } : item);
  window.localStorage.setItem(campaignHistoryKey, JSON.stringify(next));
  return next.find((item) => item.id === id) || null;
}

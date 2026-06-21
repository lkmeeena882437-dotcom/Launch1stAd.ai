import { getCampaignDraftsFromCloud } from "./db/campaignDrafts";
import { campaignHistoryKey, type SavedCampaign } from "./history";

export async function findSharedReport(id: string | null) {
  if (!id) return null;

  const raw = window.localStorage.getItem(campaignHistoryKey);
  const localItems = raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
  const localItem = localItems.find((draft) => draft.id === id);
  if (localItem) return localItem;

  const cloudItems = await getCampaignDraftsFromCloud();
  return cloudItems.find((draft) => draft.id === id) ?? null;
}

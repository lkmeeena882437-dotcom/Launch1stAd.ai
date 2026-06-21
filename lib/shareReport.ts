import { getCampaignDraftsFromCloud } from "./db/campaignDrafts";
import { campaignHistoryKey, type SavedCampaign } from "./history";

function readLocalReports() {
  try {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    return raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
  } catch {
    return [];
  }
}

export async function findSharedReport(id: string | null) {
  if (!id) return null;

  const localItems = readLocalReports();
  const localItem = localItems.find((draft) => draft.id === id);
  if (localItem) return localItem;

  const cloudItems = await getCampaignDraftsFromCloud();
  return cloudItems.find((draft) => draft.id === id) ?? null;
}

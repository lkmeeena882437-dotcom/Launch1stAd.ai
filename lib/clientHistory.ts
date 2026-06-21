import type { SavedCampaign } from "./history";
import type { ClientProfile } from "./workspace";

export function filterCampaignsByClient(items: SavedCampaign[], client: ClientProfile | null) {
  if (!client) return items;
  return items.filter((item) => item.clientId === client.id);
}

export function clientHistoryLabel(client: ClientProfile | null) {
  return client?.businessName || "All clients";
}

import type { CampaignInput } from "./campaign";

export const launchRequestsKey = "launch1stad.launchRequests";

export type LaunchRequest = {
  id: string;
  campaignId: string;
  provider: string;
  status: "draft" | "connected_required" | "under_review" | "active" | "paused";
  payload: {
    input: CampaignInput;
    output: unknown;
  };
  createdAt: string;
  reviewWindow: string;
};

function readAll() {
  try {
    const raw = window.localStorage.getItem(launchRequestsKey);
    return raw ? (JSON.parse(raw) as LaunchRequest[]) : [];
  } catch {
    return [];
  }
}

export function createLaunchRequest(campaignId: string, input: CampaignInput, output: unknown, provider = "selected") {
  const item: LaunchRequest = {
    id: crypto.randomUUID(),
    campaignId,
    provider,
    status: "under_review",
    payload: { input, output },
    createdAt: new Date().toISOString(),
    reviewWindow: "2–24 hours"
  };

  const next = [item, ...readAll()];
  window.localStorage.setItem(launchRequestsKey, JSON.stringify(next));
  return item;
}

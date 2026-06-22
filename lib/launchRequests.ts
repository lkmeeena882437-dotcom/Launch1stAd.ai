import type { CampaignInput } from "./campaign";

export const launchRequestsKey = "launch1stad.launchRequests";

export type LaunchRequest = {
  id: string;
  campaignId: string;
  provider: string;
  status: "draft" | "ready" | "submitted" | "connected_required";
  payload: {
    input: CampaignInput;
    output: unknown;
  };
  createdAt: string;
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
    status: "connected_required",
    payload: { input, output },
    createdAt: new Date().toISOString()
  };

  const next = [item, ...readAll()];
  window.localStorage.setItem(launchRequestsKey, JSON.stringify(next));
  return item;
}

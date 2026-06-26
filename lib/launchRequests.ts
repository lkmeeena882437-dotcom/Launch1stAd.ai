import type { CampaignInput } from "./campaign";
import { getAuthSession } from "./auth/session";

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

export async function syncLaunchRequestToCloud(item: LaunchRequest) {
  const session = getAuthSession();
  if (!session?.accessToken) {
    return { ok: false, message: "Sign in to sync review request." };
  }

  const response = await fetch("/api/campaigns/submit-review", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      campaignId: item.campaignId,
      provider: item.provider,
      payload: item.payload
    })
  });

  const data = await response.json().catch(() => null);
  return { ok: response.ok && data?.ok, message: data?.message || "Review sync finished." };
}

export async function createLaunchRequest(campaignId: string, input: CampaignInput, output: unknown, provider = "selected") {
  const item: LaunchRequest = {
    id: crypto.randomUUID(),
    campaignId,
    provider,
    status: "under_review",
    payload: { input, output },
    createdAt: new Date().toISOString(),
    reviewWindow: "2-24 hours"
  };

  const next = [item, ...readAll()];
  window.localStorage.setItem(launchRequestsKey, JSON.stringify(next));
  const cloud = await syncLaunchRequestToCloud(item);
  return { item, cloud };
}

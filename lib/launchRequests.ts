import type { CampaignInput } from "./campaign";
import { getAuthSession } from "./auth/session";
import { getSupabaseConfig } from "./supabase/config";

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
  const { url, anonKey } = getSupabaseConfig();
  const session = getAuthSession();
  if (!url || !anonKey || !session?.accessToken) {
    return { ok: false, message: "Sign in to sync review request." };
  }

  const userResponse = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${session.accessToken}`
    }
  });
  const user = await userResponse.json().catch(() => null);
  if (!user?.id) return { ok: false, message: "Login session expired." };

  const response = await fetch(`${url}/rest/v1/campaign_launches`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: user.id,
      campaign_id: item.campaignId,
      provider: item.provider,
      status: item.status,
      review_window: item.reviewWindow,
      destination: item.payload.input.promotionType,
      payload: item.payload
    })
  });

  return { ok: response.ok, message: response.ok ? "Review request synced." : "Review sync failed." };
}

export async function createLaunchRequest(campaignId: string, input: CampaignInput, output: unknown, provider = "selected") {
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
  const cloud = await syncLaunchRequestToCloud(item);
  return { item, cloud };
}

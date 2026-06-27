import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ ok: false, status: "unauthorized", message: "Connector secret mismatch." }, { status: 401 });
}

function campaignName(payload: Record<string, unknown>) {
  const inner = payload?.payload as { input?: { businessName?: string; goal?: string } } | undefined;
  const business = inner?.input?.businessName || "Launch1stAd campaign";
  const goal = inner?.input?.goal || "Leads";
  return `${business} - ${goal} - ${new Date().toISOString().slice(0, 10)}`;
}

async function createMetaCampaign(payload: Record<string, unknown>) {
  const access = process.env.META_ACCESS_TOKEN;
  const adAccount = process.env.META_AD_ACCOUNT_ID;
  const version = process.env.META_GRAPH_VERSION || "v19.0";
  if (!access || !adAccount) return { ok: false, status: "provider_setup_required", message: "Meta delivery settings are missing." };

  const accountId = adAccount.startsWith("act_") ? adAccount : `act_${adAccount}`;
  const endpoint = `https://graph.facebook.com/${version}/${accountId}/campaigns`;
  const body = new URLSearchParams({
    access_token: access,
    name: campaignName(payload),
    objective: process.env.META_DEFAULT_OBJECTIVE || "OUTCOME_LEADS",
    status: "PAUSED",
    special_ad_categories: "[]"
  });

  const response = await fetch(endpoint, { method: "POST", body, cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  return {
    ok: response.ok,
    status: response.ok ? "queued" : "provider_error",
    message: response.ok ? "Meta paused campaign created for review." : data?.error?.message || "Meta campaign creation failed.",
    response: data
  };
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-connector-secret");
  if (!process.env.CONNECTOR_SHARED_SECRET || secret !== process.env.CONNECTOR_SHARED_SECRET) return unauthorized();

  const payload = await request.json().catch(() => ({}));
  const result = await createMetaCampaign(payload as Record<string, unknown>);

  return NextResponse.json({
    ok: result.ok,
    status: result.status,
    provider: "meta",
    message: result.message,
    response: result.response
  }, { status: result.ok ? 200 : 202 });
}

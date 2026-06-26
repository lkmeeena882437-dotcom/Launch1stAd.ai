import { NextResponse } from "next/server";

async function getUser(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`
    }
  });
  const user = await response.json().catch(() => null);
  return response.ok ? user : null;
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.replace("Bearer ", "").trim();

  if (!url || !anonKey) {
    return NextResponse.json({ ok: false, message: "Review service is not configured." }, { status: 202 });
  }
  if (!accessToken) {
    return NextResponse.json({ ok: false, message: "Sign in before submitting a review request." }, { status: 401 });
  }

  const user = await getUser(accessToken);
  if (!user?.id) {
    return NextResponse.json({ ok: false, message: "Login session expired." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const campaignId = body.campaignId || crypto.randomUUID();
  const provider = body.provider || "selected";
  const payload = body.payload || { input: body.input || {}, output: body.output || {} };

  const response = await fetch(`${url}/rest/v1/campaign_launches`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      user_id: user.id,
      campaign_id: campaignId,
      provider,
      status: "under_review",
      review_window: "2-24 hours",
      destination: payload?.input?.promotionType || "Campaign",
      payload
    })
  });

  const data = await response.json().catch(() => null);
  return NextResponse.json({
    ok: response.ok,
    message: response.ok ? "Review request submitted." : "Review request could not be saved.",
    request: Array.isArray(data) ? data[0] : data
  }, { status: response.ok ? 200 : 202 });
}

import { NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse } from "@/lib/server/rateLimit";

const allowedStatuses = new Set(["under_review", "approved", "rejected", "paused"]);

async function getUser(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` }
  });
  const user = await response.json().catch(() => null);
  return response.ok ? user : null;
}

async function isOwner(user: { id?: string; email?: string } | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!user?.id || !url || !serviceKey) return false;

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (adminEmail && user.email?.toLowerCase() === adminEmail) return true;

  const response = await fetch(`${url}/rest/v1/admin_users?user_id=eq.${user.id}&select=user_id&limit=1`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
  });
  const rows = await response.json().catch(() => []);
  return response.ok && Array.isArray(rows) && Boolean(rows[0]?.user_id);
}

function authToken(request: Request) {
  return (request.headers.get("authorization") || "").replace("Bearer ", "").trim();
}

export async function GET(request: Request) {
  const limit = checkRateLimit(request, { key: "admin-reviews-read", limit: 30, windowMs: 60_000 });
  if (!limit.ok) return rateLimitResponse(limit);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const accessToken = authToken(request);

  if (!url || !serviceKey) return NextResponse.json({ ok: false, message: "Owner review service is not configured." }, { status: 202 });
  if (!accessToken) return NextResponse.json({ ok: false, message: "Sign in as owner to view all reviews." }, { status: 401 });

  const user = await getUser(accessToken);
  if (!(await isOwner(user))) return NextResponse.json({ ok: false, message: "Owner access required." }, { status: 403 });

  const response = await fetch(`${url}/rest/v1/launch_requests?select=*&order=created_at.desc&limit=100`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    cache: "no-store"
  });
  const reviews = await response.json().catch(() => []);
  return NextResponse.json({ ok: response.ok, reviews: Array.isArray(reviews) ? reviews : [] }, { status: response.ok ? 200 : 202 });
}

export async function PATCH(request: Request) {
  const limit = checkRateLimit(request, { key: "admin-reviews-update", limit: 30, windowMs: 60_000 });
  if (!limit.ok) return rateLimitResponse(limit);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const accessToken = authToken(request);

  if (!url || !serviceKey) return NextResponse.json({ ok: false, message: "Owner review service is not configured." }, { status: 202 });
  if (!accessToken) return NextResponse.json({ ok: false, message: "Sign in as owner before updating reviews." }, { status: 401 });

  const user = await getUser(accessToken);
  if (!(await isOwner(user))) return NextResponse.json({ ok: false, message: "Owner access required." }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  const status = String(body.status || "");
  if (!id || !allowedStatuses.has(status)) return NextResponse.json({ ok: false, message: "Invalid owner review update." }, { status: 200 });

  const response = await fetch(`${url}/rest/v1/launch_requests?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() })
  });
  const data = await response.json().catch(() => []);
  return NextResponse.json({ ok: response.ok, review: Array.isArray(data) ? data[0] : data }, { status: response.ok ? 200 : 202 });
}

import { NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse } from "@/lib/server/rateLimit";

const allowedStatuses = new Set(["under_review", "approved", "rejected", "paused"]);

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

export async function PATCH(request: Request) {
  const limit = checkRateLimit(request, { key: "review-status", limit: 20, windowMs: 60_000 });
  if (!limit.ok) return rateLimitResponse(limit);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.replace("Bearer ", "").trim();

  if (!url || !anonKey) return NextResponse.json({ ok: false, message: "Review status service is not configured." }, { status: 202 });
  if (!accessToken) return NextResponse.json({ ok: false, message: "Sign in before updating review status." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  const status = String(body.status || "");
  if (!id || !allowedStatuses.has(status)) {
    return NextResponse.json({ ok: false, message: "Invalid review status request." }, { status: 200 });
  }

  const user = await getUser(accessToken);
  if (!user?.id) return NextResponse.json({ ok: false, message: "Login session expired." }, { status: 401 });

  const response = await fetch(`${url}/rest/v1/launch_requests?id=eq.${id}&user_id=eq.${user.id}`, {
    method: "PATCH",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() })
  });
  const data = await response.json().catch(() => []);

  return NextResponse.json({
    ok: response.ok,
    message: response.ok ? "Review status updated." : "Review status could not be updated.",
    review: Array.isArray(data) ? data[0] : data
  }, { status: response.ok ? 200 : 202 });
}

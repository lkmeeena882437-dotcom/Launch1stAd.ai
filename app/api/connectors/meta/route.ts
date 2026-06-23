import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ ok: false, status: "unauthorized", message: "Connector secret mismatch." }, { status: 401 });
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-connector-secret");
  if (!process.env.CONNECTOR_SHARED_SECRET || secret !== process.env.CONNECTOR_SHARED_SECRET) return unauthorized();

  const payload = await request.json().catch(() => ({}));
  const ready = Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET && process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID);

  if (!ready) {
    return NextResponse.json({
      ok: false,
      status: "provider_setup_required",
      provider: "meta",
      message: "Meta provider keys are missing. Add app, token and ad account configuration in deployment settings.",
      received: payload
    }, { status: 202 });
  }

  return NextResponse.json({
    ok: true,
    status: "queued",
    provider: "meta",
    message: "Meta campaign payload accepted by connector skeleton.",
    campaignRef: `meta_${Date.now()}`
  });
}

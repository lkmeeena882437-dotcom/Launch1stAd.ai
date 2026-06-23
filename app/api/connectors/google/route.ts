import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ ok: false, status: "unauthorized", message: "Connector secret mismatch." }, { status: 401 });
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-connector-secret");
  if (!process.env.CONNECTOR_SHARED_SECRET || secret !== process.env.CONNECTOR_SHARED_SECRET) return unauthorized();

  const payload = await request.json().catch(() => ({}));
  const ready = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_ADS_DEVELOPER_TOKEN && process.env.GOOGLE_ADS_CUSTOMER_ID);

  if (!ready) {
    return NextResponse.json({
      ok: false,
      status: "provider_setup_required",
      provider: "google",
      message: "Google Ads provider keys are missing. Add OAuth, developer token and customer configuration in deployment settings.",
      received: payload
    }, { status: 202 });
  }

  return NextResponse.json({
    ok: true,
    status: "queued",
    provider: "google",
    message: "Google Ads campaign payload accepted by connector skeleton.",
    campaignRef: `google_${Date.now()}`
  });
}

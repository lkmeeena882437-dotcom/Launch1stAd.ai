import { NextResponse } from "next/server";

function appBaseUrl(request: Request) {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

export async function GET(request: Request) {
  const appId = process.env.META_APP_ID;
  const baseUrl = appBaseUrl(request);
  if (!appId) {
    return NextResponse.redirect(`${baseUrl}/connections?provider=meta&status=error`);
  }

  const redirectUri = `${baseUrl}/api/oauth/meta/callback`;
  const url = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "ads_read,ads_management,business_management");
  url.searchParams.set("state", "meta");
  return NextResponse.redirect(url.toString());
}

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const appId = process.env.META_APP_ID;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
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

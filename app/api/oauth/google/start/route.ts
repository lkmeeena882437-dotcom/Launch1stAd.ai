import { NextResponse } from "next/server";

function appBaseUrl(request: Request) {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const baseUrl = appBaseUrl(request);
  if (!clientId) return NextResponse.redirect(`${baseUrl}/connections?provider=google&status=error`);

  const redirectUri = `${baseUrl}/api/oauth/google/callback`;
  const target = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("https://www.googleapis.com/auth/adwords")}&access_type=offline&prompt=consent&state=google`;
  return NextResponse.redirect(target);
}

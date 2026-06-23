import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || url.origin;
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect(`${baseUrl}/connections?provider=google&status=error`);
  return NextResponse.redirect(`${baseUrl}/connections?provider=google&status=connected`);
}

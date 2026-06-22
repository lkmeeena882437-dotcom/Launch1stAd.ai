import { NextResponse } from "next/server";
import { sendPlatformAction } from "@/lib/server/platformAction";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await sendPlatformAction({
    provider: body.provider || "selected",
    requestId: body.requestId || "manual",
    payload: body.payload || {}
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 202 });
}

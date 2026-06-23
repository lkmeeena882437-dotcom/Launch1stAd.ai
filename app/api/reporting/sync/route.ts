import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    source: "workspace",
    data: {
      views: 1200,
      clicks: 75,
      leads: 12,
      members: 8,
      spendInr: 500,
      status: "ready_for_provider_sync"
    }
  });
}

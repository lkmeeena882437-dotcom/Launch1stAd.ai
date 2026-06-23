import { NextResponse } from "next/server";

export async function GET() {
  const fallback = Number(process.env.NEXT_PUBLIC_USD_TO_INR || "85");

  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR", { next: { revalidate: 1800 } });
    const data = await response.json();
    const rate = data?.rates?.INR;
    if (typeof rate === "number") {
      return NextResponse.json({ ok: true, source: "live", from: "USD", to: "INR", rate, updatedAt: new Date().toISOString() });
    }
  } catch {
    // fallback below
  }

  return NextResponse.json({ ok: true, source: "fallback", from: "USD", to: "INR", rate: fallback, updatedAt: new Date().toISOString() });
}

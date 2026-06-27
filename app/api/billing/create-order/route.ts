import { NextResponse } from "next/server";

function encodeBasicAuth(keyId: string, keySecret: string) {
  return Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { amountUsd?: number; packName?: string };
  const minUsd = Number(process.env.NEXT_PUBLIC_MIN_DEPOSIT_USD || "10");
  const usdToInr = Number(process.env.NEXT_PUBLIC_USD_TO_INR || "85");
  const amountUsd = Number(body.amountUsd || 0);

  if (!Number.isFinite(amountUsd) || amountUsd < minUsd) {
    return NextResponse.json({ ok: false, status: "invalid_amount", message: `Minimum deposit is $${minUsd}.` }, { status: 200 });
  }

  const amountInr = Math.round(amountUsd * usdToInr);
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({
      ok: false,
      checkoutReady: false,
      status: "setup_required",
      message: "Secure checkout is not active yet. Add payment gateway settings before accepting deposits.",
      amountUsd,
      amountInr
    }, { status: 202 });
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encodeBasicAuth(keyId, keySecret)}`
    },
    body: JSON.stringify({
      amount: amountInr * 100,
      currency: "INR",
      receipt: `wallet_${Date.now()}`,
      notes: {
        pack: body.packName || "Wallet deposit",
        amount_usd: String(amountUsd)
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  const detail = data?.error?.description || data?.error?.reason || data?.message;

  return NextResponse.json({
    ok: response.ok,
    checkoutReady: response.ok,
    status: response.ok ? "order_created" : "gateway_error",
    message: response.ok ? "Secure payment order created." : detail || "Payment order could not be created. Please try again or contact support.",
    amountUsd,
    amountInr,
    order: data,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId
  }, { status: response.ok ? 200 : 202 });
}

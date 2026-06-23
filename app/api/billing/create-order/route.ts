import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { amountUsd?: number; packName?: string };
  const minUsd = Number(process.env.NEXT_PUBLIC_MIN_DEPOSIT_USD || "10");
  const usdToInr = Number(process.env.NEXT_PUBLIC_USD_TO_INR || "85");
  const amountUsd = Number(body.amountUsd || 0);

  if (!Number.isFinite(amountUsd) || amountUsd < minUsd) {
    return NextResponse.json({ ok: false, message: `Minimum deposit is $${minUsd}.` }, { status: 200 });
  }

  const amountInr = Math.round(amountUsd * usdToInr);
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({
      ok: false,
      checkoutReady: false,
      status: "missing_setup",
      message: "Razorpay keys missing. Review credits can be added; live checkout needs deployment variables.",
      amountUsd,
      amountInr
    });
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    },
    body: JSON.stringify({
      amount: amountInr * 100,
      currency: "INR",
      receipt: `wallet_${Date.now()}`,
      notes: {
        pack: body.packName || "Wallet credits",
        amount_usd: String(amountUsd)
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  return NextResponse.json({
    ok: response.ok,
    checkoutReady: response.ok,
    status: response.ok ? "order_created" : "gateway_error",
    message: response.ok ? "Razorpay order created." : "Razorpay order failed.",
    amountUsd,
    amountInr,
    order: data,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId
  });
}

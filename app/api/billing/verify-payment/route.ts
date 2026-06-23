import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    amountInr?: number;
  };

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, status: "missing_setup", message: "Payment verification secret missing." }, { status: 202 });
  }

  const orderId = body.razorpay_order_id || "";
  const paymentId = body.razorpay_payment_id || "";
  const signature = body.razorpay_signature || "";

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const verified = Boolean(signature && expected === signature);
  if (!verified) {
    return NextResponse.json({ ok: false, status: "blocked", message: "Payment verification failed. Credits were not approved." }, { status: 200 });
  }

  return NextResponse.json({
    ok: true,
    status: "verified",
    message: "Payment verified. Wallet credit approval is ready for database posting.",
    amountInr: Number(body.amountInr || 0)
  });
}

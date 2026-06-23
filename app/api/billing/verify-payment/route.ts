import crypto from "crypto";
import { NextResponse } from "next/server";

async function getUserId(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`
    }
  });

  const user = await response.json().catch(() => null);
  return response.ok ? user?.id as string : null;
}

async function creditWallet(accessToken: string, userId: string, amountInr: number, paymentId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { ok: false, message: "Supabase configuration missing." };

  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };

  const read = await fetch(`${url}/rest/v1/wallet_accounts?user_id=eq.${userId}&select=*`, { headers });
  const rows = await read.json().catch(() => []);
  const account = Array.isArray(rows) ? rows[0] : null;

  if (account?.id) {
    const nextBalance = Number(account.balance_inr || 0) + amountInr;
    const update = await fetch(`${url}/rest/v1/wallet_accounts?id=eq.${account.id}`, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({ balance_inr: nextBalance, updated_at: new Date().toISOString() })
    });
    if (!update.ok) return { ok: false, message: "Wallet balance update failed." };
  } else {
    const create = await fetch(`${url}/rest/v1/wallet_accounts`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({ user_id: userId, balance_inr: amountInr, reserved_inr: 0 })
    });
    if (!create.ok) return { ok: false, message: "Wallet account create failed." };
  }

  await fetch(`${url}/rest/v1/wallet_transactions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      user_id: userId,
      transaction_type: "credit",
      amount_inr: amountInr,
      note: "Verified ad spend deposit",
      reference_id: paymentId,
      status: "completed"
    })
  });

  return { ok: true, message: "Wallet credited." };
}

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
  const amountInr = Number(body.amountInr || 0);

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const verified = Boolean(signature && expected === signature);
  if (!verified) {
    return NextResponse.json({ ok: false, status: "blocked", message: "Payment verification failed. Credits were not approved." }, { status: 200 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.replace("Bearer ", "").trim();
  if (!accessToken) {
    return NextResponse.json({ ok: false, status: "auth_required", message: "Sign in before adding wallet credits." }, { status: 401 });
  }

  const userId = await getUserId(accessToken);
  if (!userId) {
    return NextResponse.json({ ok: false, status: "auth_required", message: "Login session expired. Sign in again." }, { status: 401 });
  }

  const wallet = await creditWallet(accessToken, userId, amountInr, paymentId);
  if (!wallet.ok) {
    return NextResponse.json({ ok: false, status: "wallet_error", message: wallet.message }, { status: 200 });
  }

  return NextResponse.json({
    ok: true,
    status: "verified",
    message: "Payment verified. Wallet credited.",
    amountInr
  });
}

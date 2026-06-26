import { NextResponse } from "next/server";

async function getUser(accessToken: string) {
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
  return response.ok ? user : null;
}

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.replace("Bearer ", "").trim();

  if (!url || !anonKey) {
    return NextResponse.json({ ok: false, message: "Wallet service is not configured." }, { status: 202 });
  }
  if (!accessToken) {
    return NextResponse.json({ ok: false, message: "Sign in to load wallet." }, { status: 401 });
  }

  const user = await getUser(accessToken);
  if (!user?.id) {
    return NextResponse.json({ ok: false, message: "Login session expired." }, { status: 401 });
  }

  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken}`
  };

  const accountResponse = await fetch(`${url}/rest/v1/wallet_accounts?user_id=eq.${user.id}&select=balance_inr,reserved_inr&limit=1`, { headers });
  const accounts = await accountResponse.json().catch(() => []);
  const account = Array.isArray(accounts) ? accounts[0] : null;

  const transactionResponse = await fetch(`${url}/rest/v1/wallet_transactions?user_id=eq.${user.id}&select=id,transaction_type,amount_inr,note,created_at&order=created_at.desc&limit=20`, { headers });
  const transactions = await transactionResponse.json().catch(() => []);

  return NextResponse.json({
    ok: true,
    wallet: {
      balance: Number(account?.balance_inr || 0),
      reserved: Number(account?.reserved_inr || 0),
      transactions: Array.isArray(transactions)
        ? transactions.map((item) => ({
            id: item.id,
            type: item.transaction_type,
            amount: Number(item.amount_inr || 0),
            note: item.note || "Wallet transaction",
            createdAt: item.created_at
          }))
        : []
    }
  });
}

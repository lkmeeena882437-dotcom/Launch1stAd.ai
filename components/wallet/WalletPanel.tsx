"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth/session";
import { saveWallet, type WalletState } from "@/lib/wallet";
import { SupportedMethods } from "./SupportedMethods";

const packs = [
  { name: "Starter ad fund", usd: 10, amount: 890 },
  { name: "Growth ad fund", usd: 25, amount: 2225 },
  { name: "Scale ad fund", usd: 60, amount: 5340 }
];

type CheckoutResponse = {
  ok: boolean;
  status?: string;
  message?: string;
  amountInr?: number;
  keyId?: string;
  order?: { id?: string; amount?: number; currency?: string };
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadCheckoutScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function WalletPanel() {
  const [wallet, setWallet] = useState<WalletState>({ balance: 0, reserved: 0, transactions: [] });
  const [customUsd, setCustomUsd] = useState("100");
  const [message, setMessage] = useState("");
  const [busyPack, setBusyPack] = useState("");

  async function refreshWallet(showMessage = false) {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setWallet({ balance: 0, reserved: 0, transactions: [] });
      if (showMessage) setMessage("Sign in to view verified wallet balance.");
      return null;
    }

    const response = await fetch("/api/wallet/me", { headers: { Authorization: `Bearer ${session.accessToken}` } });
    const data = await response.json().catch(() => null);
    if (response.ok && data?.ok && data.wallet) {
      const synced = saveWallet(data.wallet as WalletState);
      setWallet(synced);
      if (showMessage) setMessage("Wallet synced with verified records.");
      return synced;
    }

    setWallet({ balance: 0, reserved: 0, transactions: [] });
    if (showMessage) setMessage(data?.message || "Wallet sync unavailable.");
    return null;
  }

  useEffect(() => { refreshWallet(); }, []);

  async function verifyAndCredit(payload: Record<string, unknown>, amountInr: number) {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setMessage("Sign in before adding wallet credits.");
      return;
    }

    const response = await fetch("/api/billing/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.accessToken}` },
      body: JSON.stringify({ ...payload, amountInr })
    });
    const data = await response.json();
    if (data.ok) {
      await refreshWallet();
      setMessage("Payment verified. Wallet balance updated.");
    } else {
      setMessage(data.message || "Payment verification failed. Credits were not added.");
    }
  }

  async function topUp(pack: { name: string; usd: number; amount: number }) {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setMessage("Sign in before making a deposit.");
      return;
    }
    if (pack.usd < 10) {
      setMessage("Minimum deposit is $10.");
      return;
    }

    setBusyPack(pack.name);
    setMessage("Opening secure Razorpay checkout...");
    try {
      const response = await fetch("/api/billing/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: pack.usd, packName: pack.name })
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!data.ok && data.status === "missing_setup") {
        setMessage("Checkout is not configured yet. Add Razorpay keys and redeploy before deposits.");
        return;
      }
      if (!data.ok || !data.keyId || !data.order?.id) {
        setMessage(data.message || "Checkout could not start. Check Vercel function logs for the Razorpay error.");
        return;
      }

      const loaded = await loadCheckoutScript();
      if (!loaded || !window.Razorpay) {
        setMessage("Checkout script failed to load.");
        return;
      }

      const checkout = new window.Razorpay({
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency || "INR",
        name: "Launch1stAd.ai",
        description: pack.name,
        order_id: data.order.id,
        handler: (payment: Record<string, unknown>) => verifyAndCredit(payment, data.amountInr || pack.amount),
        theme: { color: "#8b5cf6" }
      });
      checkout.open();
    } catch {
      setMessage("Checkout service unavailable. Please try again after deployment setup.");
    } finally {
      setBusyPack("");
    }
  }

  function addCustomDeposit() {
    const usd = Number(customUsd);
    topUp({ name: `Custom ad fund $${usd}`, usd, amount: Math.round(usd * 89) });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
      <div className="neon-shell rounded-[2rem] p-5 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Ad spend wallet</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">Add verified ad funds.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-white/65">Use Razorpay checkout for UPI, cards, net banking and wallets. Credits appear only after payment verification.</p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/70">
          <span>Razorpay is the primary payment gateway. Manual transfer is shown only as a support fallback.</span>
          <button onClick={() => refreshWallet(true)} className="rounded-xl border border-white/15 bg-white px-4 py-2 text-xs font-black text-black">Sync wallet</button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-white">
            <p className="text-sm text-white/50">Verified balance</p>
            <h2 className="mt-3 text-5xl font-black">₹{wallet.balance.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
            <p className="text-sm text-white/50">Payment records</p>
            <h2 className="mt-3 text-5xl font-black">{wallet.transactions.length}</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
            <p className="text-sm text-white/50">Minimum review fund</p>
            <h2 className="mt-3 text-5xl font-black">₹200</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-white/95 p-6 text-slate-950">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black">Deposit through Razorpay</h2>
                <p className="mt-2 text-sm text-slate-600">Select a pack or enter a custom ad budget.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">Min $10</span>
            </div>
            <SupportedMethods />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {packs.map((pack) => (
                <button key={pack.name} onClick={() => topUp(pack)} disabled={busyPack === pack.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:border-violet-300 disabled:opacity-60">
                  <span className="text-sm font-bold text-slate-500">{pack.name}</span>
                  <strong className="mt-2 block text-3xl text-slate-950">${pack.usd}</strong>
                  <span className="mt-2 block text-xs text-slate-500">Secure checkout</span>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-100 p-4">
              <label className="text-sm font-black text-slate-950">Custom deposit in USD</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input value={customUsd} onChange={(event) => setCustomUsd(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" />
                <button onClick={addCustomDeposit} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Deposit</button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-white">
            <h2 className="text-2xl font-black">Manual payment support</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">For UPI QR, bank transfer or receipt support, contact support. Manual credits are added only after verification.</p>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><strong>UPI / QR:</strong><br />Available through support desk</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><strong>Bank transfer:</strong><br />Receipt verification required</div>
              <Link href="/privacy" className="rounded-2xl border border-white/10 bg-white/10 p-4 font-bold">Payment privacy policy</Link>
              <Link href="/terms" className="rounded-2xl border border-white/10 bg-white/10 p-4 font-bold">Payment terms</Link>
            </div>
          </div>
        </div>

        {message && <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-bold text-[#fda4af]">{message}</div>}
      </div>
    </section>
  );
}

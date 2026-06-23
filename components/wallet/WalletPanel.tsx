"use client";

import { useEffect, useState } from "react";
import { addCredits, readWallet, reserveSpend, type WalletState } from "@/lib/wallet";
import { SupportedMethods } from "./SupportedMethods";
import { FxRateCard } from "./FxRateCard";

const packs = [
  { name: "Ad Spend $10", usd: 10, amount: 850, note: "Ad spend credits" },
  { name: "Ad Spend $25", usd: 25, amount: 2125, note: "Ad spend credits" },
  { name: "Ad Spend $60", usd: 60, amount: 5100, note: "Ad spend credits" }
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
  const [reserveAmount, setReserveAmount] = useState("500");
  const [customUsd, setCustomUsd] = useState("100");
  const [message, setMessage] = useState("");
  const [busyPack, setBusyPack] = useState("");

  useEffect(() => {
    setWallet(readWallet());
  }, []);

  async function verifyAndCredit(payload: Record<string, unknown>, amountInr: number) {
    const response = await fetch("/api/billing/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, amountInr })
    });
    const data = await response.json();
    if (data.ok) {
      setWallet(addCredits(amountInr, "Verified ad spend deposit"));
      setMessage("Payment verified. Ad credits added to wallet.");
    } else {
      setMessage(data.message || "Payment verification failed. Credits were not added.");
    }
  }

  async function topUp(pack: { name: string; usd: number; amount: number }) {
    if (pack.usd < 10) {
      setMessage("Minimum deposit is $10.");
      return;
    }

    setBusyPack(pack.name);
    setMessage("Preparing checkout...");
    try {
      const response = await fetch("/api/billing/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: pack.usd, packName: pack.name })
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!data.ok && data.status === "missing_setup") {
        setWallet(addCredits(pack.amount, `${pack.name} review credits`));
        setMessage(`${data.message} Review credits added for testing.`);
        return;
      }
      if (!data.ok || !data.keyId || !data.order?.id) {
        setMessage(data.message || "Checkout could not start.");
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
        theme: { color: "#2563eb" }
      });
      checkout.open();
    } catch {
      setMessage("Checkout service unavailable. Try again after deployment setup.");
    } finally {
      setBusyPack("");
    }
  }

  function reserve() {
    const result = reserveSpend(Number(reserveAmount), "Ad spend reserve");
    setWallet(result.wallet);
    setMessage(result.message);
  }

  function addCustomDeposit() {
    const usd = Number(customUsd);
    topUp({ name: `Ad Spend $${usd}`, usd, amount: Math.round(usd * 85) });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
      <div className="rounded-3xl bg-card p-5 md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Ad spend wallet</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-6xl">Deposit credits for active campaigns.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Minimum deposit is $10. Deposit ad spend credits, reserve campaign budget and monitor delivery activity.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-dark p-6 text-canvas">
            <p className="text-sm text-white/50">Available balance</p>
            <h2 className="mt-3 text-5xl font-black">₹{wallet.balance.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <p className="text-sm text-muted">Reserved ad spend</p>
            <h2 className="mt-3 text-5xl font-black text-ink">₹{wallet.reserved.toLocaleString("en-IN")}</h2>
          </div>
          <FxRateCard />
          <div className="rounded-3xl bg-white p-6">
            <p className="text-sm text-muted">Transactions</p>
            <h2 className="mt-3 text-5xl font-black text-ink">{wallet.transactions.length}</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">Deposit ad credits</h2>
                <p className="mt-2 text-sm text-muted">Select a deposit amount or enter a custom ad budget.</p>
              </div>
              <span className="rounded-full bg-card px-3 py-2 text-xs font-bold text-muted">Min $10</span>
            </div>
            <SupportedMethods />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {packs.map((pack) => (
                <button key={pack.name} onClick={() => topUp(pack)} disabled={busyPack === pack.name} className="rounded-2xl border border-hairline bg-card p-5 text-left disabled:opacity-60">
                  <span className="text-sm font-semibold text-muted">{pack.name}</span>
                  <strong className="mt-2 block text-3xl text-ink">${pack.usd}</strong>
                  <span className="mt-2 block text-xs text-muted">≈ ₹{pack.amount.toLocaleString("en-IN")} ad credits</span>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-card p-4">
              <label className="text-sm font-bold text-ink">Custom deposit in USD</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input value={customUsd} onChange={(event) => setCustomUsd(event.target.value)} className="rounded-xl border border-hairline bg-white px-4 py-3 outline-none" />
                <button onClick={addCustomDeposit} className="rounded-xl bg-dark px-5 py-3 text-sm font-bold text-canvas">Deposit</button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-bold">Reserve for ads</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Move wallet credits into campaign spend reserve before launch review.</p>
            <input value={reserveAmount} onChange={(event) => setReserveAmount(event.target.value)} className="mt-5 w-full rounded-xl border border-hairline bg-card px-4 py-3 outline-none" />
            <button onClick={reserve} className="mt-4 w-full rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Reserve spend</button>
          </div>
        </div>

        {message && <div className="mt-6 rounded-2xl bg-white p-4 text-sm font-semibold text-coral">{message}</div>}
      </div>
    </section>
  );
}

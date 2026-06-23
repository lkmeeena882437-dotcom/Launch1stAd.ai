"use client";

import { useEffect, useState } from "react";
import { addCredits, readWallet, reserveSpend, type WalletState } from "@/lib/wallet";
import { SupportedMethods } from "./SupportedMethods";

const packs = [
  { name: "Starter", usd: 10, amount: 850, note: "Starter wallet credits" },
  { name: "Growth", usd: 25, amount: 2125, note: "Growth wallet credits" },
  { name: "Pro", usd: 60, amount: 5100, note: "Pro wallet credits" }
];

export function WalletPanel() {
  const [wallet, setWallet] = useState<WalletState>({ balance: 0, reserved: 0, transactions: [] });
  const [reserveAmount, setReserveAmount] = useState("500");
  const [message, setMessage] = useState("");
  const [busyPack, setBusyPack] = useState("");

  useEffect(() => {
    setWallet(readWallet());
  }, []);

  async function topUp(pack: typeof packs[number]) {
    setBusyPack(pack.name);
    setMessage("Preparing checkout...");
    try {
      const response = await fetch("/api/billing/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: pack.usd, packName: pack.name })
      });
      const data = await response.json();
      if (!data.ok && data.status === "missing_setup") {
        setWallet(addCredits(pack.amount, `${pack.name} review credits`));
        setMessage(`${data.message} Review credits added for testing.`);
        return;
      }
      if (!data.ok) {
        setMessage(data.message || "Checkout could not start.");
        return;
      }
      setMessage("Order created. Checkout script can be enabled with live keys.");
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

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Wallet</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-6xl">Credits for campaign spend.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Minimum deposit is $10. Add credits, reserve campaign budget and track wallet activity.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-dark p-6 text-canvas">
            <p className="text-sm text-white/50">Available balance</p>
            <h2 className="mt-3 text-5xl font-black">₹{wallet.balance.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <p className="text-sm text-muted">Reserved ad spend</p>
            <h2 className="mt-3 text-5xl font-black text-ink">₹{wallet.reserved.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <p className="text-sm text-muted">Transactions</p>
            <h2 className="mt-3 text-5xl font-black text-ink">{wallet.transactions.length}</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">Add credits</h2>
                <p className="mt-2 text-sm text-muted">USD-based packs with INR wallet credit estimate.</p>
              </div>
              <span className="rounded-full bg-card px-3 py-2 text-xs font-bold text-muted">Min $10</span>
            </div>
            <SupportedMethods />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {packs.map((pack) => (
                <button key={pack.name} onClick={() => topUp(pack)} disabled={busyPack === pack.name} className="rounded-2xl border border-hairline bg-card p-5 text-left disabled:opacity-60">
                  <span className="text-sm font-semibold text-muted">{pack.name}</span>
                  <strong className="mt-2 block text-3xl text-ink">${pack.usd}</strong>
                  <span className="mt-2 block text-xs text-muted">≈ ₹{pack.amount.toLocaleString("en-IN")} credits</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-bold">Reserve for ads</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Move wallet credits into reserved ad spend before campaign submission.</p>
            <input value={reserveAmount} onChange={(event) => setReserveAmount(event.target.value)} className="mt-5 w-full rounded-xl border border-hairline bg-card px-4 py-3 outline-none" />
            <button onClick={reserve} className="mt-4 w-full rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Reserve spend</button>
          </div>
        </div>

        {message && <div className="mt-6 rounded-2xl bg-white p-4 text-sm font-semibold text-coral">{message}</div>}
      </div>
    </section>
  );
}

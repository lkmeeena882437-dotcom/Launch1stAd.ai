"use client";

import { useEffect, useState } from "react";
import { addCredits, readWallet, reserveSpend, type WalletState } from "@/lib/wallet";

const packs = [
  { name: "Starter", amount: 500, note: "Starter wallet credits" },
  { name: "Growth", amount: 1500, note: "Growth wallet credits" },
  { name: "Pro", amount: 5000, note: "Pro wallet credits" }
];

export function WalletPanel() {
  const [wallet, setWallet] = useState<WalletState>({ balance: 0, reserved: 0, transactions: [] });
  const [reserveAmount, setReserveAmount] = useState("500");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setWallet(readWallet());
  }, []);

  function topUp(amount: number, note: string) {
    setWallet(addCredits(amount, note));
    setMessage("Credits added for review. Connect payment gateway to enable live checkout.");
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
        <p className="mt-4 max-w-3xl leading-7 text-muted">Add credits, reserve budget for campaigns and track wallet activity from one place.</p>

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
            <h2 className="text-2xl font-bold">Add credits</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {packs.map((pack) => (
                <button key={pack.name} onClick={() => topUp(pack.amount, pack.note)} className="rounded-2xl border border-hairline bg-card p-5 text-left">
                  <span className="text-sm font-semibold text-muted">{pack.name}</span>
                  <strong className="mt-2 block text-3xl text-ink">₹{pack.amount.toLocaleString("en-IN")}</strong>
                  <span className="mt-2 block text-xs text-muted">Checkout-ready pack</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-bold">Reserve for ads</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Move wallet credits into reserved ad spend before submitting campaign requests.</p>
            <input value={reserveAmount} onChange={(event) => setReserveAmount(event.target.value)} className="mt-5 w-full rounded-xl border border-hairline bg-card px-4 py-3 outline-none" />
            <button onClick={reserve} className="mt-4 w-full rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Reserve spend</button>
          </div>
        </div>

        {message && <div className="mt-6 rounded-2xl bg-white p-4 text-sm font-semibold text-coral">{message}</div>}

        <div className="mt-8 rounded-3xl bg-white p-6">
          <h2 className="text-2xl font-bold">Activity</h2>
          <div className="mt-5 grid gap-3">
            {wallet.transactions.length === 0 ? <p className="text-sm text-muted">No wallet activity yet.</p> : wallet.transactions.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-card p-4 text-sm">
                <div>
                  <p className="font-bold text-ink">{item.note}</p>
                  <p className="text-muted">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <span className="font-black text-ink">{item.type === "credit" ? "+" : "-"}₹{item.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

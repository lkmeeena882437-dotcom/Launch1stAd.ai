"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth/session";
import type { CampaignInput } from "@/lib/campaign";
import { BusinessFields } from "./BusinessFields";
import { PromotionFields } from "./PromotionFields";
import { TargetFields } from "./TargetFields";

const steps = ["Business", "Destination", "Audience", "Review"];
const minimumReviewBalance = 200;

export function CampaignForm({ form, update, onSubmit }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [walletReady, setWalletReady] = useState(false);
  const [walletStatus, setWalletStatus] = useState("Checking verified wallet balance...");

  async function checkWallet() {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setWalletReady(false);
      setWalletStatus("Sign in and add verified funds before campaign review.");
      return false;
    }

    const response = await fetch("/api/wallet/me", {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    });
    const data = await response.json().catch(() => null);
    const balance = Number(data?.wallet?.balance || 0);
    const ready = response.ok && data?.ok && balance >= minimumReviewBalance;
    setWalletReady(ready);
    setWalletStatus(ready ? `Verified balance ready: ₹${balance.toLocaleString("en-IN")}` : `Minimum ₹${minimumReviewBalance} verified balance required before review.`);
    return ready;
  }

  useEffect(() => { checkWallet(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ready = await checkWallet();
    if (!ready) {
      setMessage(`Add at least ₹${minimumReviewBalance} verified ad funds before generating a campaign for review.`);
      return;
    }
    setMessage("");
    onSubmit(event);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Campaign setup</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Build a launch-ready campaign.</h1>
      <p className="mt-4 leading-7 text-white/60">Add business details, destination, audience, budget and billing model.</p>
      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs font-black sm:grid-cols-4">
        {steps.map((label, index) => (
          <button key={label} type="button" onClick={() => setStep(index + 1)} className={step === index + 1 ? "rounded-full bg-[#2dd4ff] px-3 py-2 text-black" : "rounded-full bg-white/10 px-3 py-2 text-white/70"}>{label}</button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-[#fda4af]">
        <span>Wallet funding: {walletReady ? "Ready" : "Required before review"}</span>
        <button type="button" onClick={checkWallet} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-black">Refresh</button>
        <span className="w-full text-xs text-white/60">{walletStatus}</span>
      </div>
      <form onSubmit={submit} className="mt-8 space-y-5">
        {step === 1 && <BusinessFields form={form} update={update} />}
        {step === 2 && <PromotionFields form={form} update={update} />}
        {step === 3 && <TargetFields form={form} update={update} />}
        {step === 4 && (
          <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
            <h2 className="text-xl font-black">Ready for review</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">A review request is created only after verified wallet funding.</p>
            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <p><span className="font-black">Business:</span> {form.businessName || "Not added"}</p>
              <p><span className="font-black">Destination:</span> {form.promotionType}</p>
              <p><span className="font-black">Platforms:</span> {(form.targetPlatforms || []).join(", ")}</p>
              <p><span className="font-black">Budget:</span> {form.budget}</p>
              <p><span className="font-black">Goal:</span> {form.goal}</p>
              <p><span className="font-black">Billing:</span> {form.paymentModel}</p>
            </div>
          </div>
        )}
        {message && <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-[#fda4af]">{message}</p>}
        <div className="sticky bottom-0 -mx-5 flex gap-3 bg-[#05070f]/90 px-5 py-4 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:py-0">
          {step > 1 && <button type="button" onClick={() => setStep((current) => current - 1)} className="w-full rounded-2xl border border-white/15 px-5 py-3 text-sm font-black text-white">Back</button>}
          {step < 4 ? (
            <button type="button" onClick={() => setStep((current) => current + 1)} className="w-full rounded-2xl px-5 py-3 text-sm font-black text-white neon-button">Next</button>
          ) : (
            <button className="w-full rounded-2xl px-5 py-3 text-sm font-black text-white neon-button">Generate for review</button>
          )}
        </div>
      </form>
    </section>
  );
}

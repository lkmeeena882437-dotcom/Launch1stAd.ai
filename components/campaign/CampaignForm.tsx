"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { CampaignInput } from "@/lib/campaign";
import { readWallet } from "@/lib/wallet";
import { BusinessFields } from "./BusinessFields";
import { PromotionFields } from "./PromotionFields";
import { TargetFields } from "./TargetFields";

const steps = ["Business", "Destination", "Audience", "Review"];

export function CampaignForm({ form, update, onSubmit }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [walletReady, setWalletReady] = useState(false);

  useEffect(() => {
    const wallet = readWallet();
    setWalletReady(wallet.balance > 0 || wallet.reserved > 0);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    if (!walletReady) {
      event.preventDefault();
      setMessage("Add verified ad funds before generating a campaign for review.");
      return;
    }
    setMessage("");
    onSubmit(event);
  }

  return (
    <section className="rounded-2xl bg-card p-5 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Campaign setup</p>
      <h1 className="serif-display mt-3 text-4xl md:text-5xl">Build a launch-ready campaign.</h1>
      <p className="mt-4 leading-7 text-muted">Add business details, destination, audience, budget and billing model.</p>
      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs font-semibold sm:grid-cols-4">
        {steps.map((label, index) => (
          <button key={label} type="button" onClick={() => setStep(index + 1)} className={step === index + 1 ? "rounded-full bg-coral px-3 py-2 text-white" : "rounded-full bg-canvas px-3 py-2 text-muted"}>{label}</button>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm font-semibold text-coral">Wallet funding: {walletReady ? "Ready" : "Required before review"}</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        {step === 1 && <BusinessFields form={form} update={update} />}
        {step === 2 && <PromotionFields form={form} update={update} />}
        {step === 3 && <TargetFields form={form} update={update} />}
        {step === 4 && (
          <div className="rounded-2xl bg-canvas p-5">
            <h2 className="text-xl font-semibold">Ready for review</h2>
            <p className="mt-2 text-sm leading-6 text-muted">The campaign report is created after verified wallet funding. Reserve spend before submitting for review.</p>
            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <p><span className="font-semibold">Business:</span> {form.businessName || "Not added"}</p>
              <p><span className="font-semibold">Destination:</span> {form.promotionType}</p>
              <p><span className="font-semibold">Platforms:</span> {(form.targetPlatforms || []).join(", ")}</p>
              <p><span className="font-semibold">Budget:</span> {form.budget}</p>
              <p><span className="font-semibold">Goal:</span> {form.goal}</p>
              <p><span className="font-semibold">Billing:</span> {form.paymentModel}</p>
            </div>
          </div>
        )}
        {message && <p className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-coral">{message}</p>}
        <div className="sticky bottom-0 -mx-5 flex gap-3 bg-card/95 px-5 py-4 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:py-0">
          {step > 1 && <button type="button" onClick={() => setStep((current) => current - 1)} className="w-full rounded-lg border border-hairline px-5 py-3 text-sm font-semibold">Back</button>}
          {step < 4 ? (
            <button type="button" onClick={() => setStep((current) => current + 1)} className="w-full rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-coralDark">Next</button>
          ) : (
            <button className="w-full rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-coralDark">Generate for review</button>
          )}
        </div>
      </form>
    </section>
  );
}

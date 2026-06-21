"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { CampaignInput } from "@/lib/campaign";
import { canGenerateCampaign, getUsedCampaigns, recordCampaignUsage } from "@/lib/quota";
import { BusinessFields } from "./BusinessFields";
import { TargetFields } from "./TargetFields";

export function CampaignForm({ form, update, onSubmit }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [used, setUsed] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUsed(getUsedCampaigns());
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    if (!canGenerateCampaign()) {
      event.preventDefault();
      setMessage("Monthly generation count complete. Open Account page for more access.");
      return;
    }
    recordCampaignUsage();
    setUsed(getUsedCampaigns());
    setMessage("");
    onSubmit(event);
  }

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Campaign Builder</p>
      <h1 className="serif-display mt-3 text-4xl md:text-5xl">Business details do, AI launch pack banayega.</h1>
      <p className="mt-4 leading-7 text-muted">MVP me campaign engine hai. Baad me Gemini/GPT API connect karke aur advanced outputs add kar sakte hain.</p>
      <p className="mt-4 rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm font-semibold text-coral">Monthly generations: {used}/3</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <BusinessFields form={form} update={update} />
        <TargetFields form={form} update={update} />
        {message && <p className="text-sm font-semibold text-coral">{message}</p>}
        <button className="w-full rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-coralDark">Generate Launch Pack</button>
      </form>
    </section>
  );
}

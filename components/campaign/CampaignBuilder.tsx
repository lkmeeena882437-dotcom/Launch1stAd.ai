"use client";

import { FormEvent, useMemo, useState } from "react";
import { buildCampaign, type CampaignInput } from "@/lib/campaign";
import { CampaignForm } from "./CampaignForm";
import { ResultPanel } from "./ResultPanel";

export function CampaignBuilder() {
  const [form, setForm] = useState<CampaignInput>({
    businessName: "",
    category: "Clothing",
    product: "",
    priceRange: "",
    location: "India",
    budget: "₹500/day",
    goal: "WhatsApp",
    language: "Hinglish"
  });
  const [generated, setGenerated] = useState(false);
  const campaign = useMemo(() => buildCampaign(form), [form]);

  function update<K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGenerated(true);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <CampaignForm form={form} update={update} onSubmit={onSubmit} />
      <ResultPanel campaign={campaign} generated={generated} />
    </div>
  );
}

"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { buildCampaign, type CampaignInput } from "@/lib/campaign";
import { campaignHistoryKey, makeCampaignTitle, type SavedCampaign } from "@/lib/history";
import { savedBusinessKey, savedBusinessToCampaign, type SavedBusiness } from "@/lib/saved";
import { CampaignForm } from "./CampaignForm";
import { ResultPanel } from "./ResultPanel";

const starterForm: CampaignInput = {
  businessName: "",
  category: "Clothing",
  product: "",
  priceRange: "",
  location: "India",
  budget: "₹500/day",
  goal: "WhatsApp",
  language: "Hinglish"
};

export function CampaignBuilder() {
  const [form, setForm] = useState<CampaignInput>(starterForm);
  const [generated, setGenerated] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const campaign = useMemo(() => buildCampaign(form), [form]);

  useEffect(() => {
    const raw = window.localStorage.getItem(savedBusinessKey);
    if (raw) {
      const saved = JSON.parse(raw) as SavedBusiness;
      setForm((current) => ({ ...current, ...savedBusinessToCampaign(saved) }));
      setProfileLoaded(true);
    }
  }, []);

  function update<K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function saveDraft() {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    const existing = raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
    const record: SavedCampaign = {
      id: crypto.randomUUID(),
      title: makeCampaignTitle(form),
      createdAt: new Date().toISOString(),
      input: form,
      summary: campaign.summary
    };
    window.localStorage.setItem(campaignHistoryKey, JSON.stringify([record, ...existing].slice(0, 20)));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveDraft();
    setGenerated(true);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        {profileLoaded && <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Saved business profile auto-loaded.</p>}
        {generated && <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Campaign draft saved to dashboard.</p>}
        <CampaignForm form={form} update={update} onSubmit={onSubmit} />
      </div>
      <ResultPanel campaign={campaign} generated={generated} />
    </div>
  );
}

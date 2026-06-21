"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { requestCampaign } from "@/lib/ai/client";
import { buildCampaign, type CampaignInput } from "@/lib/campaign";
import { campaignHistoryKey, campaignReuseKey, makeCampaignTitle, type SavedCampaign } from "@/lib/history";
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
  const [reuseLoaded, setReuseLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [source, setSource] = useState<"preview" | "ai" | "fallback">("preview");
  const previewCampaign = useMemo(() => buildCampaign(form), [form]);
  const [campaign, setCampaign] = useState(previewCampaign);

  useEffect(() => {
    setCampaign(previewCampaign);
    setGenerated(false);
    setSource("preview");
  }, [previewCampaign]);

  useEffect(() => {
    const reuseRaw = window.localStorage.getItem(campaignReuseKey);
    if (reuseRaw) {
      setForm(JSON.parse(reuseRaw) as CampaignInput);
      window.localStorage.removeItem(campaignReuseKey);
      setReuseLoaded(true);
      return;
    }

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

  function saveDraft(activeSummary: string) {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    const existing = raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
    const record: SavedCampaign = {
      id: crypto.randomUUID(),
      title: makeCampaignTitle(form),
      createdAt: new Date().toISOString(),
      input: form,
      summary: activeSummary
    };
    window.localStorage.setItem(campaignHistoryKey, JSON.stringify([record, ...existing].slice(0, 20)));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    const result = await requestCampaign(form);
    setCampaign(result.campaign);
    setSource(result.source);
    saveDraft(result.campaign.summary);
    setGenerated(true);
    setIsGenerating(false);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        {reuseLoaded && <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Saved campaign loaded. Edit and generate a new draft.</p>}
        {profileLoaded && <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Saved business profile auto-loaded.</p>}
        {isGenerating && <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Generating campaign with AI...</p>}
        {generated && <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Campaign draft saved to dashboard. Source: {source}.</p>}
        <CampaignForm form={form} update={update} onSubmit={onSubmit} />
      </div>
      <ResultPanel campaign={campaign} generated={generated} />
    </div>
  );
}

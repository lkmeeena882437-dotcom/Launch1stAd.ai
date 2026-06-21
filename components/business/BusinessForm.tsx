"use client";

import { FormEvent, useEffect, useState } from "react";
import { getLatestBusinessProfileFromCloud, saveBusinessProfileToCloud } from "@/lib/db/businessProfiles";
import { defaultSavedBusiness, savedBusinessKey, type SavedBusiness } from "@/lib/saved";
import { BusinessInput } from "./BusinessInput";
import { ToneSelect } from "./ToneSelect";

export function BusinessForm() {
  const [business, setBusiness] = useState<SavedBusiness>(defaultSavedBusiness);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(savedBusinessKey);
    if (raw) setBusiness(JSON.parse(raw));

    getLatestBusinessProfileFromCloud().then((cloudProfile) => {
      if (!cloudProfile) return;
      setBusiness(cloudProfile);
      window.localStorage.setItem(savedBusinessKey, JSON.stringify(cloudProfile));
      setMessage("Cloud profile loaded.");
    });
  }, []);

  function update<K extends keyof SavedBusiness>(key: K, value: SavedBusiness[K]) {
    setBusiness((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(savedBusinessKey, JSON.stringify(business));
    const cloud = await saveBusinessProfileToCloud(business);
    setMessage(cloud.ok ? "Saved locally and synced to Supabase." : "Saved locally. Login/Supabase setup ke baad cloud sync hoga.");
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-2xl bg-card p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <BusinessInput label="Business name" value={business.businessName} onChange={(value) => update("businessName", value)} placeholder="Lucky Fashion Store" />
        <BusinessInput label="Category" value={business.category} onChange={(value) => update("category", value)} placeholder="Clothing" />
        <BusinessInput label="Product / offer" value={business.product} onChange={(value) => update("product", value)} placeholder="Women ethnic wear" />
        <BusinessInput label="Price range" value={business.priceRange} onChange={(value) => update("priceRange", value)} placeholder="₹499–₹1499" />
        <BusinessInput label="Location" value={business.location} onChange={(value) => update("location", value)} placeholder="Kota, Rajasthan" />
        <BusinessInput label="Target customer" value={business.targetCustomer} onChange={(value) => update("targetCustomer", value)} placeholder="Women 18-35" />
        <BusinessInput label="WhatsApp number" value={business.whatsapp} onChange={(value) => update("whatsapp", value)} placeholder="91XXXXXXXXXX" />
        <BusinessInput label="Website" value={business.website} onChange={(value) => update("website", value)} placeholder="https://example.com" />
        <ToneSelect value={business.tone} onChange={(value) => update("tone", value)} />
      </div>
      <button className="mt-6 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white">Save business profile</button>
      {message && <p className="mt-4 text-sm font-semibold text-coral">{message}</p>}
    </form>
  );
}

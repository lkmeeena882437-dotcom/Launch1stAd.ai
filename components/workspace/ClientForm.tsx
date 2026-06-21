"use client";

import { FormEvent, useState } from "react";
import { defaultSavedBusiness, type SavedBusiness } from "@/lib/saved";
import { BusinessInput } from "@/components/business/BusinessInput";

export function ClientForm({ onAdd }: { onAdd: (profile: SavedBusiness) => void }) {
  const [profile, setProfile] = useState<SavedBusiness>(defaultSavedBusiness);

  function update<K extends keyof SavedBusiness>(key: K, value: SavedBusiness[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd(profile);
    setProfile(defaultSavedBusiness);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-card p-6 md:p-8">
      <h2 className="text-2xl font-semibold">Add business / client</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <BusinessInput label="Business name" value={profile.businessName} onChange={(value) => update("businessName", value)} placeholder="Client business" />
        <BusinessInput label="Category" value={profile.category} onChange={(value) => update("category", value)} placeholder="Clothing" />
        <BusinessInput label="Product / offer" value={profile.product} onChange={(value) => update("product", value)} placeholder="Main offer" />
        <BusinessInput label="Price range" value={profile.priceRange} onChange={(value) => update("priceRange", value)} placeholder="₹499–₹1499" />
        <BusinessInput label="Location" value={profile.location} onChange={(value) => update("location", value)} placeholder="India" />
        <BusinessInput label="Target customer" value={profile.targetCustomer} onChange={(value) => update("targetCustomer", value)} placeholder="Audience" />
      </div>
      <button className="mt-6 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white">Add client</button>
    </form>
  );
}

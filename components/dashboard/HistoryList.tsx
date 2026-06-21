"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCampaignDraftsFromCloud } from "@/lib/db/campaignDrafts";
import { campaignHistoryKey, type SavedCampaign } from "@/lib/history";

export function HistoryList() {
  const [items, setItems] = useState<SavedCampaign[]>([]);
  const [source, setSource] = useState("local");

  useEffect(() => {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    if (raw) setItems(JSON.parse(raw));

    getCampaignDraftsFromCloud().then((cloudItems) => {
      if (cloudItems.length === 0) return;
      setItems(cloudItems);
      setSource("cloud");
    });
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-dark p-6 text-canvas md:p-8">
        <h2 className="text-2xl font-semibold">Saved campaign drafts</h2>
        <p className="mt-3 text-white/60">Abhi koi draft saved nahi hai. Campaign Builder se ek campaign generate karo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-dark p-6 text-canvas md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Saved campaign drafts</h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{source}</span>
      </div>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <Link key={item.id} href={`/campaign-report?id=${item.id}`} className="block rounded-xl bg-darkElevated p-5 transition hover:opacity-90">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <span className="text-xs text-white/40">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{item.summary}</p>
            <p className="mt-3 text-xs font-semibold text-coral">Open full report →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

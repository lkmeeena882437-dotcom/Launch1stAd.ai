"use client";

import { useEffect, useMemo, useState } from "react";
import { clientHistoryLabel, filterCampaignsByClient } from "@/lib/clientHistory";
import { getCampaignDraftsFromCloud } from "@/lib/db/campaignDrafts";
import type { SavedCampaign } from "@/lib/history";
import { readLocalCampaignHistory } from "@/lib/localHistory";
import { getActiveClient, type ClientProfile } from "@/lib/workspace";
import { HistoryCard } from "./HistoryCard";

export function HistoryList() {
  const [items, setItems] = useState<SavedCampaign[]>([]);
  const [source, setSource] = useState("local");
  const [client, setClient] = useState<ClientProfile | null>(null);

  useEffect(() => {
    setClient(getActiveClient());
    setItems(readLocalCampaignHistory());

    getCampaignDraftsFromCloud().then((cloudItems) => {
      if (cloudItems.length === 0) return;
      setItems(cloudItems);
      setSource("cloud");
    });
  }, []);

  const visibleItems = useMemo(() => filterCampaignsByClient(items, client), [items, client]);

  if (visibleItems.length === 0) {
    return (
      <div className="rounded-2xl bg-dark p-6 text-canvas md:p-8">
        <h2 className="text-2xl font-semibold">Saved campaign drafts</h2>
        <p className="mt-3 text-white/60">No saved drafts for {clientHistoryLabel(client)}.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-dark p-6 text-canvas md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Saved campaign drafts</h2>
          <p className="mt-1 text-sm text-white/50">Showing: {clientHistoryLabel(client)}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{source}</span>
      </div>
      <div className="mt-5 grid gap-4">
        {visibleItems.map((item) => <HistoryCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

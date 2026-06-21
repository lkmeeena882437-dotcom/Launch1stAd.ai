"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buildCampaign } from "@/lib/campaign";
import { campaignHistoryKey, type SavedCampaign } from "@/lib/history";
import { EmptyReport } from "./EmptyReport";
import { ReportHero } from "./ReportHero";
import { ReportSections } from "./ReportSections";
import { UseAgainButton } from "./UseAgainButton";

export function CampaignDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [item, setItem] = useState<SavedCampaign | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    const list = raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
    setItem(list.find((draft) => draft.id === id) ?? null);
    setLoaded(true);
  }, [id]);

  const campaign = useMemo(() => item ? buildCampaign(item.input) : null, [item]);

  if (!loaded) return <p className="text-muted">Loading campaign report...</p>;
  if (!item || !campaign) return <EmptyReport />;

  return (
    <article className="space-y-5">
      <ReportHero item={item} />
      <div className="rounded-2xl bg-card p-5 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Use this campaign again</h2>
            <p className="mt-1 text-sm text-muted">Same campaign details ko Campaign Builder me load karke edit karo.</p>
          </div>
          <UseAgainButton input={item.input} />
        </div>
      </div>
      <ReportSections campaign={campaign} />
    </article>
  );
}

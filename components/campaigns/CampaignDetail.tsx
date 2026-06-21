"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { buildCampaign } from "@/lib/campaign";
import { campaignHistoryKey, type SavedCampaign } from "@/lib/history";
import { EmptyReport } from "./EmptyReport";
import { ReportHero } from "./ReportHero";
import { ReportSections } from "./ReportSections";

export function CampaignDetail() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<SavedCampaign | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(campaignHistoryKey);
    const list = raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
    setItem(list.find((draft) => draft.id === params.id) ?? null);
    setLoaded(true);
  }, [params.id]);

  const campaign = useMemo(() => item ? buildCampaign(item.input) : null, [item]);

  if (!loaded) return <p className="text-muted">Loading campaign report...</p>;
  if (!item || !campaign) return <EmptyReport />;

  return (
    <article className="space-y-5">
      <ReportHero item={item} />
      <ReportSections campaign={campaign} />
    </article>
  );
}

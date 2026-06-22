"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buildCampaign } from "@/lib/campaign";
import { getCampaignDraftsFromCloud } from "@/lib/db/campaignDrafts";
import { campaignHistoryKey, type SavedCampaign } from "@/lib/history";
import { ShareReportButton } from "@/components/share/ShareReportButton";
import { CreateLaunchRequestButton } from "./CreateLaunchRequestButton";
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
    async function loadDraft() {
      const raw = window.localStorage.getItem(campaignHistoryKey);
      const localList = raw ? (JSON.parse(raw) as SavedCampaign[]) : [];
      const localItem = localList.find((draft) => draft.id === id);
      if (localItem) {
        setItem(localItem);
        setLoaded(true);
        return;
      }

      const cloudList = await getCampaignDraftsFromCloud();
      setItem(cloudList.find((draft) => draft.id === id) ?? null);
      setLoaded(true);
    }

    loadDraft();
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
            <h2 className="font-semibold">Report actions</h2>
            <p className="mt-1 text-sm text-muted">Edit, share, or prepare this campaign for connected platform creation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CreateLaunchRequestButton campaignId={item.id} input={item.input} output={campaign} />
            <ShareReportButton id={item.id} />
            <UseAgainButton input={item.input} />
          </div>
        </div>
      </div>
      <ReportSections campaign={campaign} />
    </article>
  );
}

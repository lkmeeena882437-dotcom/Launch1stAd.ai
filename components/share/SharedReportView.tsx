"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buildCampaign } from "@/lib/campaign";
import type { SavedCampaign } from "@/lib/history";
import { findSharedReport } from "@/lib/shareReport";
import { EmptyReport } from "@/components/campaigns/EmptyReport";
import { ReportHero } from "@/components/campaigns/ReportHero";
import { ReportSections } from "@/components/campaigns/ReportSections";
import { ClientReportBlock } from "./ClientReportBlock";

export function SharedReportView() {
  const id = useSearchParams().get("id");
  const [item, setItem] = useState<SavedCampaign | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    findSharedReport(id).then((report) => {
      setItem(report);
      setLoaded(true);
    });
  }, [id]);

  const campaign = useMemo(() => item ? buildCampaign(item.input) : null, [item]);

  if (!loaded) return <p className="text-muted">Loading shared report...</p>;
  if (!item || !campaign) return <EmptyReport />;

  return (
    <article className="space-y-5">
      <ClientReportBlock name={item.clientName} />
      <ReportHero item={item} />
      <ReportSections campaign={campaign} />
    </article>
  );
}

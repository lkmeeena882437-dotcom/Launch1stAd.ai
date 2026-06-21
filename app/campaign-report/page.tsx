import { Suspense } from "react";
import { CampaignDetail } from "@/components/campaigns/CampaignDetail";
import { DetailHeader } from "@/components/campaigns/DetailHeader";

export default function SavedCampaignPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <DetailHeader />
      <section className="mx-auto max-w-5xl px-5 py-10">
        <Suspense fallback={<p className="text-muted">Loading campaign report...</p>}>
          <CampaignDetail />
        </Suspense>
      </section>
    </main>
  );
}

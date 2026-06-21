import { CampaignDetail } from "@/components/campaigns/CampaignDetail";
import { DetailHeader } from "@/components/campaigns/DetailHeader";

export default function SavedCampaignPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <DetailHeader />
      <section className="mx-auto max-w-5xl px-5 py-10">
        <CampaignDetail />
      </section>
    </main>
  );
}

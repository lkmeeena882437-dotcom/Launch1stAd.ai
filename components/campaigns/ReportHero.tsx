import type { SavedCampaign } from "@/lib/history";

export function ReportHero({ item }: { item: SavedCampaign }) {
  return (
    <div className="rounded-3xl bg-dark p-8 text-canvas">
      <p className="text-sm text-white/50">Campaign Report</p>
      <h1 className="serif-display mt-3 text-5xl">{item.title}</h1>
      <p className="mt-4 max-w-2xl text-white/65">Created on {new Date(item.createdAt).toLocaleString()}</p>
    </div>
  );
}

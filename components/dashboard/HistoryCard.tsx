import Link from "next/link";
import type { SavedCampaign } from "@/lib/history";

export function HistoryCard({ item }: { item: SavedCampaign }) {
  return (
    <Link href={`/campaign-report?id=${item.id}`} className="block rounded-xl bg-darkElevated p-5 transition hover:opacity-90">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold text-white">{item.title}</h3>
        <span className="text-xs text-white/40">{new Date(item.createdAt).toLocaleDateString()}</span>
      </div>
      {item.clientName && <p className="mt-2 text-xs font-semibold text-coral">Client: {item.clientName}</p>}
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{item.summary}</p>
      <p className="mt-3 text-xs font-semibold text-coral">Open full report →</p>
    </Link>
  );
}

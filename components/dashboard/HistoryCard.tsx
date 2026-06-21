import Link from "next/link";
import { statusLabel, type SavedCampaign } from "@/lib/history";
import { StatusButtons } from "./StatusButtons";

export function HistoryCard({ item }: { item: SavedCampaign }) {
  return (
    <div className="rounded-xl bg-darkElevated p-5 transition hover:opacity-90">
      <Link href={`/campaign-report?id=${item.id}`} className="block">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold text-white">{item.title}</h3>
          <span className="text-xs text-white/40">{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/10 px-3 py-1 text-white/60">{statusLabel(item.status)}</span>
          {item.clientName && <span className="rounded-full bg-coral/20 px-3 py-1 text-coral">Client: {item.clientName}</span>}
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{item.summary}</p>
      </Link>
      <StatusButtons item={item} />
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-coral">
        <Link href={`/campaign-report?id=${item.id}`}>Open full report →</Link>
        <Link href={`/share?id=${item.id}`}>Share view →</Link>
      </div>
    </div>
  );
}

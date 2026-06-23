import Link from "next/link";
import { Brand } from "@/components/Brand";
import { CampaignBuilder } from "@/components/campaign/CampaignBuilder";

export default function CampaignPage() {
  return (
    <main className="min-h-screen bg-canvas pb-24 text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-5">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-xl border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 pt-8 md:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Campaign builder</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Create campaign</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">Add your offer, audience, budget and destination. Generate a campaign package for review.</p>
      </section>
      <CampaignBuilder />
    </main>
  );
}

import Link from "next/link";
import { Brand } from "@/components/Brand";
import { getAppConfig } from "@/lib/appConfig";

function StatusRow({ label, ready }: { label: string; ready: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-hairline py-3 last:border-0">
      <span className="font-medium">{label}</span>
      <span className={ready ? "text-coral" : "text-muted"}>{ready ? "Ready" : "Missing"}</span>
    </div>
  );
}

export default function SetupPage() {
  const config = getAppConfig();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Setup</p>
        <h1 className="serif-display mt-3 text-5xl">Environment readiness</h1>
        <p className="mt-4 text-muted">Vercel deploy ke time env values add karte hi features active ho jayenge.</p>
        <div className="mt-8 rounded-2xl bg-card p-6">
          <StatusRow label="Gemini AI key" ready={config.aiReady} />
          <StatusRow label="Supabase URL + anon key" ready={config.supabaseReady} />
          <StatusRow label="Growth access link" ready={config.growthLinkReady} />
          <StatusRow label="Team access link" ready={config.teamLinkReady} />
          <StatusRow label="WhatsApp contact" ready={config.whatsappReady} />
          <StatusRow label="Support email" ready={config.supportEmailReady} />
        </div>
        <div className="mt-6 rounded-2xl bg-dark p-6 text-canvas">
          <h2 className="text-2xl font-semibold">Deploy note</h2>
          <p className="mt-3 text-white/60">Run `supabase/schema.sql` in Supabase SQL Editor. Then add env values in Vercel Project Settings.</p>
        </div>
      </section>
    </main>
  );
}

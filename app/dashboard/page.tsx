import Link from "next/link";
import { Brand } from "@/components/Brand";
import { HistoryList } from "@/components/dashboard/HistoryList";

const stats = [
  ["Campaign packs", "12"],
  ["Avg. CTR target", "2.5%+"],
  ["Platforms", "Meta · Google · WhatsApp"],
  ["Language modes", "Hindi · English · Hinglish"]
];

const tools = [
  ["Business Profile", "/business", "Save business details and brand tone."],
  ["Campaign Builder", "/campaign", "Create Meta, Google and WhatsApp launch packs."],
  ["Landing Builder", "/landing-builder", "Generate sales page copy."],
  ["Growth Tools", "/tools", "Score, policy and PDF export tools."],
  ["Setup", "/setup", "Supabase env and database status."]
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">New Campaign</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Dashboard MVP</p>
        <h1 className="serif-display mt-3 text-5xl">Growth command center.</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">Yahan saved campaigns, business profiles, exports aur optimization reports connect honge.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {stats.map(([label, value]) => <div key={label} className="rounded-xl bg-card p-6"><p className="text-sm text-muted">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>)}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-5">
          {tools.map(([title, href, text]) => <Link key={title} href={href} className="rounded-2xl bg-card p-6"><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm text-muted">{text}</p></Link>)}
        </div>
        <div className="mt-10"><HistoryList /></div>
      </section>
    </main>
  );
}

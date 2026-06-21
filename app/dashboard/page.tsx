import Link from "next/link";
import { Brand } from "@/components/Brand";

const stats = [
  ["Campaign packs", "12"],
  ["Avg. CTR target", "2.5%+"],
  ["Platforms", "Meta · Google · WhatsApp"],
  ["Language modes", "Hindi · English · Hinglish"]
];

const recent = [
  "Women ethnic wear WhatsApp campaign",
  "Coaching demo class lead campaign",
  "Clinic appointment Google Search campaign"
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
        <p className="mt-4 max-w-2xl leading-7 text-muted">Yahan saved campaigns, business profiles, subscription plan, exports aur optimization reports connect honge.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-card p-6">
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-3 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-dark p-6 text-canvas md:p-8">
          <h2 className="text-2xl font-semibold">Recent campaign drafts</h2>
          <div className="mt-5 grid gap-4">
            {recent.map((item) => <div key={item} className="rounded-xl bg-darkElevated p-5 text-white/75">{item}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}

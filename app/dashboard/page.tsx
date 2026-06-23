import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SessionBadge } from "@/components/auth/SessionBadge";
import { HistoryList } from "@/components/dashboard/HistoryList";

const metrics = [
  ["Total spent", "$0"],
  ["Total views", "0"],
  ["Total clicks", "0"],
  ["Avg. CTR", "0%"],
  ["Avg. CPC", "$0"],
  ["Avg. CPM", "$0"]
];

const quickActions = [
  ["Create campaign", "/campaign"],
  ["Add funds", "/wallet"],
  ["Review queue", "/launch-requests"],
  ["Connect accounts", "/connections"]
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-canvas pb-24 text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-5">
          <Link href="/"><Brand /></Link>
          <div className="flex items-center gap-3">
            <SessionBadge />
            <Link href="/campaign" className="hidden rounded-xl bg-coral px-4 py-2 text-sm font-semibold text-white sm:inline-flex">New Campaign</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Workspace</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-ink md:text-6xl">Dashboard</h1>
          </div>
          <Link href="/campaign" className="rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white">Add campaign</Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {quickActions.map(([label, href]) => (
            <Link key={label} href={href} className="rounded-2xl border border-hairline bg-white p-4 text-sm font-bold text-ink shadow-soft">{label}</Link>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3">
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-hairline bg-white p-5 shadow-soft">
              <p className="text-sm font-semibold text-muted">{label}</p>
              <p className="mt-4 text-3xl font-black text-ink">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-hairline bg-white p-5 shadow-soft md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Trends</h2>
            <Link href="/analytics" className="text-sm font-bold text-coral">Open report</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-hairline bg-card p-5"><p className="text-sm text-muted">Total clicks</p><p className="mt-2 text-3xl font-black">0</p></div>
            <div className="rounded-2xl border border-hairline bg-card p-5"><p className="text-sm text-muted">Total views</p><p className="mt-2 text-3xl font-black">0</p></div>
          </div>
        </div>

        <section id="reports" className="mt-8">
          <HistoryList />
        </section>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white md:hidden">
        <div className="grid grid-cols-4 text-center text-xs font-bold">
          <Link href="/dashboard" className="border-t-2 border-coral bg-orange-50 px-2 py-4 text-coral">Dashboard</Link>
          <Link href="/campaigns" className="px-2 py-4 text-muted">Campaigns</Link>
          <Link href="/wallet" className="px-2 py-4 text-muted">Wallet</Link>
          <Link href="/settings" className="px-2 py-4 text-muted">Settings</Link>
        </div>
      </nav>
    </main>
  );
}

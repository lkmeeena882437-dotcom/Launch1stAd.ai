import Link from "next/link";
import { Brand } from "@/components/Brand";
import { HistoryList } from "@/components/dashboard/HistoryList";

export default function CampaignsPage() {
  return (
    <main className="min-h-screen bg-canvas pb-24 text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-5">
          <Link href="/"><Brand /></Link>
          <Link href="/campaign" className="rounded-xl bg-coral px-4 py-2 text-sm font-bold text-white">Add campaign</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-5xl font-black tracking-tight">Campaigns</h1>
          <Link href="/campaign" className="rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white">Add campaign</Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-hairline bg-white px-5 py-4 text-muted">Search campaigns</div>
          <Link href="/launch-requests" className="rounded-2xl border border-hairline bg-white px-5 py-4 text-center font-bold">All statuses</Link>
        </div>
        <div className="mt-8">
          <HistoryList />
        </div>
      </section>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white md:hidden">
        <div className="grid grid-cols-4 text-center text-xs font-bold">
          <Link href="/dashboard" className="px-2 py-4 text-muted">Dashboard</Link>
          <Link href="/campaigns" className="border-t-2 border-coral bg-orange-50 px-2 py-4 text-coral">Campaigns</Link>
          <Link href="/wallet" className="px-2 py-4 text-muted">Wallet</Link>
          <Link href="/settings" className="px-2 py-4 text-muted">Settings</Link>
        </div>
      </nav>
    </main>
  );
}

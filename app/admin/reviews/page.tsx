import Link from "next/link";
import { Brand } from "@/components/Brand";
import { AdminReviewQueue } from "@/components/admin/AdminReviewQueue";

export default function AdminReviewsPage() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <header className="border-b border-white/10 bg-[#05070f]/75 px-4 py-4 backdrop-blur-2xl md:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <div className="flex gap-2">
            <Link href="/dashboard" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">Dashboard</Link>
            <Link href="/settings" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">Settings</Link>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 pt-8 md:px-5">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Review workspace</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Campaign review operations.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/60">Review submitted campaigns, approve policy-safe work, reject weak requests and send only approved campaigns to provider connectors.</p>
        </div>
      </section>
      <AdminReviewQueue />
    </main>
  );
}

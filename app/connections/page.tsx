import Link from "next/link";
import { Brand } from "@/components/Brand";

export default function ConnectionsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl bg-card p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Connections</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-6xl">Connect accounts.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-muted">Connect approved Meta and Google accounts for campaign delivery.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-canvas p-5">
              <h2 className="text-xl font-semibold">Meta / Facebook / Instagram</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Use an approved business account.</p>
              <Link href="/api/oauth/meta/start" className="mt-5 inline-flex rounded-xl bg-coral px-4 py-3 text-sm font-bold text-white">Start connection</Link>
            </div>
            <div className="rounded-2xl bg-canvas p-5">
              <h2 className="text-xl font-semibold">Google Ads</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Use an approved customer account.</p>
              <Link href="/api/oauth/google/start" className="mt-5 inline-flex rounded-xl bg-coral px-4 py-3 text-sm font-bold text-white">Start connection</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

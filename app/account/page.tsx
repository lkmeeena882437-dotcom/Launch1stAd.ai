import Link from "next/link";
import { Brand } from "@/components/Brand";
import { getAppConfig } from "@/lib/appConfig";

function AccessCard({ title, text, href }: { title: string; text: string; href?: string }) {
  return (
    <div className="rounded-2xl bg-card p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted">{text}</p>
      {href ? <a href={href} className="mt-5 inline-flex rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">Open link</a> : <span className="mt-5 inline-flex rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Not connected</span>}
    </div>
  );
}

export default function AccountPage() {
  const config = getAppConfig();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Account</p>
        <h1 className="serif-display mt-3 text-5xl">Workspace access</h1>
        <p className="mt-4 max-w-2xl text-muted">Starter mode allows 3 campaign generations per month. Growth and Team links can be connected from env variables.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <AccessCard title="Starter" text="3 campaign generations per month." />
          <AccessCard title="Growth" text="Higher usage for one business workspace." href={config.growthLink || undefined} />
          <AccessCard title="Team" text="Multiple client workspace." href={config.teamLink || undefined} />
        </div>
      </section>
    </main>
  );
}

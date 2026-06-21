import Link from "next/link";
import { Brand } from "@/components/Brand";

export default function AccountPage() {
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
        <p className="mt-4 max-w-2xl text-muted">Starter mode allows 3 campaign generations per month. Add payment links later to unlock higher usage.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-card p-6"><h2 className="text-xl font-semibold">Starter</h2><p className="mt-2 text-muted">3 campaigns per month.</p></div>
          <div className="rounded-2xl bg-card p-6"><h2 className="text-xl font-semibold">Growth</h2><p className="mt-2 text-muted">Higher usage for active businesses.</p></div>
          <div className="rounded-2xl bg-card p-6"><h2 className="text-xl font-semibold">Team</h2><p className="mt-2 text-muted">Multiple client workspace.</p></div>
        </div>
      </section>
    </main>
  );
}

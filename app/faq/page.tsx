import Link from "next/link";
import { Brand } from "@/components/Brand";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <Link href="/settings" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Settings</Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-5 py-10">
        <h1 className="text-5xl font-black tracking-tight">FAQ</h1>
        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl bg-card p-5"><h2 className="text-xl font-bold">How do I launch an ad?</h2><p className="mt-3 text-muted">Sign in, add wallet funds, create a campaign and submit it for review.</p></div>
          <div className="rounded-2xl bg-card p-5"><h2 className="text-xl font-bold">When are credits added?</h2><p className="mt-3 text-muted">Credits are added after checkout confirmation.</p></div>
          <div className="rounded-2xl bg-card p-5"><h2 className="text-xl font-bold">How long is review?</h2><p className="mt-3 text-muted">Review usually takes 2-24 hours.</p></div>
        </div>
      </section>
    </main>
  );
}

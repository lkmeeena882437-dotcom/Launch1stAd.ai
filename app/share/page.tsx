import Link from "next/link";
import { Brand } from "@/components/Brand";
import { ShareNotice } from "@/components/share/ShareNotice";

export default function SharePage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Share</p>
        <h1 className="serif-display mt-3 text-5xl">Client-friendly report view.</h1>
        <p className="mt-4 max-w-2xl text-muted">Yahan shareable campaign report flow connect hoga. Current version foundation page hai.</p>
        <div className="mt-8"><ShareNotice /></div>
      </section>
    </main>
  );
}

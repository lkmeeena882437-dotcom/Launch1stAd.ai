import Link from "next/link";
import { Suspense } from "react";
import { Brand } from "@/components/Brand";
import { SharedReportView } from "@/components/share/SharedReportView";

export default function SharePage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Share</p>
        <h1 className="serif-display mt-3 text-5xl">Client-friendly report view.</h1>
        <p className="mt-4 max-w-2xl text-muted">Clean report preview for client sharing.</p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-muted">Loading shared report...</p>}>
            <SharedReportView />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

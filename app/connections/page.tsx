import Link from "next/link";
import { Suspense } from "react";
import { Brand } from "@/components/Brand";
import { ConnectionsPanel } from "@/components/connections/ConnectionsPanel";

export const dynamic = "force-dynamic";

export default function ConnectionsPage() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <header className="border-b border-white/10 bg-[#05070f]/75 px-4 py-4 backdrop-blur-2xl md:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">Dashboard</Link>
        </div>
      </header>
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10 text-white">Loading connections...</div>}>
        <ConnectionsPanel />
      </Suspense>
    </main>
  );
}

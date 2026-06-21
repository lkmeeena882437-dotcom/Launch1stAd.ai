import Link from "next/link";
import { Brand } from "@/components/Brand";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Tiers } from "@/components/home/Tiers";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Brand />
          <div className="flex gap-3">
            <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">Create Campaign</Link>
            <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
          </div>
        </div>
      </header>
      <Hero />
      <Features />
      <Tiers />
    </main>
  );
}

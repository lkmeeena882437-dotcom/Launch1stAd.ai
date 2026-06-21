import Link from "next/link";
import { Brand } from "@/components/Brand";
import { Hero } from "@/components/home/Hero";
import { IdeaBox } from "@/components/home/IdeaBox";
import { TrustSection } from "@/components/home/TrustSection";
import { Features } from "@/components/home/Features";
import { Tiers } from "@/components/home/Tiers";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Brand />
          <div className="flex flex-wrap gap-3">
            <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">Create Campaign</Link>
            <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
          </div>
        </div>
      </header>
      <Hero />
      <IdeaBox />
      <TrustSection />
      <Features />
      <Tiers />
    </main>
  );
}

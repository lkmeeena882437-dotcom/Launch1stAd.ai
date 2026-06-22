import Link from "next/link";
import { Brand } from "@/components/Brand";
import { Hero } from "@/components/home/Hero";
import { IdeaBox } from "@/components/home/IdeaBox";
import { AppHub } from "@/components/home/AppHub";
import { TrustSection } from "@/components/home/TrustSection";
import { Features } from "@/components/home/Features";
import { Tiers } from "@/components/home/Tiers";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-30 border-b border-hairline bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/"><Brand /></Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-semibold">Home</Link>
            <Link href="#ai-chat" className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-semibold">AI Chat</Link>
            <Link href="/launch" className="rounded-lg bg-dark px-4 py-2 text-sm font-semibold text-canvas">Final Setup</Link>
            <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">Create Campaign</Link>
            <Link href="/dashboard" className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-semibold">Dashboard</Link>
          </div>
        </div>
      </header>
      <Hero />
      <IdeaBox />
      <AppHub />
      <TrustSection />
      <Features />
      <Tiers />
    </main>
  );
}

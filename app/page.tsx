import Link from "next/link";
import { Brand } from "@/components/Brand";
import { Hero } from "@/components/home/Hero";
import { IdeaBox } from "@/components/home/IdeaBox";
import { AppHub } from "@/components/home/AppHub";
import { Features } from "@/components/home/Features";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-30 border-b border-hairline bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <Link href="/"><Brand /></Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-muted md:flex">
            <Link href="#ai-chat" className="hover:text-ink">AI Chat</Link>
            <Link href="/campaign" className="hover:text-ink">Campaigns</Link>
            <Link href="/connections" className="hover:text-ink">Channels</Link>
            <Link href="/analytics" className="hover:text-ink">Analytics</Link>
          </nav>
          <div className="flex shrink-0 gap-2">
            <Link href="/login" className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-semibold">Login</Link>
            <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">Start</Link>
          </div>
        </div>
      </header>
      <Hero />
      <div id="ai-chat"><IdeaBox /></div>
      <AppHub />
      <Features />
    </main>
  );
}

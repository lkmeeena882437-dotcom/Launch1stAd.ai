import Link from "next/link";
import { AuthActions } from "@/components/auth/AuthActions";
import { Brand } from "@/components/Brand";
import { Hero } from "@/components/home/Hero";
import { IdeaBox } from "@/components/home/IdeaBox";
import { AppHub } from "@/components/home/AppHub";
import { Features } from "@/components/home/Features";
import { SecurityMonetization } from "@/components/home/SecurityMonetization";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05070f]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
          <Link href="/"><Brand /></Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-white/70 md:flex">
            <Link href="#ai-chat" className="hover:text-white">AI Assistant</Link>
            <Link href="/campaign" className="hover:text-white">Campaigns</Link>
            <Link href="/connections" className="hover:text-white">Connections</Link>
            <Link href="/wallet" className="hover:text-white">Wallet</Link>
          </nav>
          <AuthActions />
        </div>
      </header>
      <Hero />
      <div id="ai-chat"><IdeaBox /></div>
      <AppHub />
      <SecurityMonetization />
      <Features />
    </main>
  );
}

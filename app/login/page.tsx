import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SignInBox } from "@/components/auth/SignInBox";

const trustItems = ["Secure workspace access", "Verified wallet required", "Privacy-first campaign records", "Provider permissions remain under your control"];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <header className="border-b border-white/10 bg-[#05070f]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-5">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:px-5 md:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="neon-shell rounded-[2rem] p-6 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#7dd3fc]">Secure access</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">Access your advertising workspace.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">Sign in to manage wallet funds, campaign reviews, provider connections, client records and launch reports from one protected workspace.</p>
          <div className="mt-7 grid gap-3">
            {trustItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-sm font-bold text-white/78">✓ {item}</div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-white/58">
            <Link href="/privacy" className="rounded-full border border-white/10 px-4 py-2">Privacy Policy</Link>
            <Link href="/terms" className="rounded-full border border-white/10 px-4 py-2">Terms & Conditions</Link>
            <Link href="/faq" className="rounded-full border border-white/10 px-4 py-2">FAQ</Link>
          </div>
        </div>
        <SignInBox />
      </section>
    </main>
  );
}

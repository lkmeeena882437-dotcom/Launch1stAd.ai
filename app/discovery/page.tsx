import Link from "next/link";
import { Brand } from "@/components/Brand";

const sections = [
  ["SEO", "Create pages that match buyer search intent and explain the offer clearly."],
  ["GEO", "Keep brand facts consistent so AI answer tools can understand the business."],
  ["AEO", "Write direct answers and helpful FAQs for snippet-style discovery."]
];

export default function DiscoveryPage() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <header className="border-b border-white/10 bg-[#05070f]/75 px-4 py-4 backdrop-blur-2xl md:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <Link href="/campaign" className="rounded-xl px-4 py-2 text-sm font-black text-white neon-button">Create campaign</Link>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-5 md:py-16">
        <div className="neon-shell rounded-[2rem] p-6 text-white md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Discovery engine</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.95] md:text-7xl">Be easier to find, read and trust.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">Build useful pages and direct answers that support search discovery, AI answer visibility and buyer confidence.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sections.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
              <h2 className="text-4xl font-black neon-text">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

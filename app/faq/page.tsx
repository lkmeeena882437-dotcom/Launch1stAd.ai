import Link from "next/link";
import { Brand } from "@/components/Brand";

const faqs = [
  ["How do I launch an ad?", "Sign in, add verified wallet funds, create a campaign and submit it for review."],
  ["When are credits added?", "Credits are added only after checkout confirmation and payment verification."],
  ["How long is review?", "Review usually takes 2-24 hours depending on campaign details and provider readiness."],
  ["What is SEO?", "SEO helps website pages appear in search results by matching user intent with useful content."],
  ["What is GEO?", "GEO helps AI answer tools understand the brand, product and use cases clearly."],
  ["What is AEO?", "AEO creates short answer-style content for FAQs, snippets and direct search answers."],
  ["Why connect Meta or Google accounts?", "Connected accounts help reviewed campaigns move toward provider delivery after account approval."],
  ["Can I disconnect accounts?", "Yes. Provider connection status can be reset from the connections page."
  ]
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <header className="border-b border-white/10 bg-[#05070f]/75 px-5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <Link href="/settings" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">Settings</Link>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="neon-shell rounded-[2rem] p-6 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Help center</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">FAQ and discovery guide.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/60">Clear answers help users, search engines and AI tools understand how Launch1stAd.ai works.</p>
        </div>
        <div className="mt-8 grid gap-4">
          {faqs.map(([question, answer]) => (
            <div key={question} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl">
              <h2 className="text-xl font-black">{question}</h2>
              <p className="mt-3 leading-7 text-white/60">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

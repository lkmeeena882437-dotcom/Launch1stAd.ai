import Link from "next/link";
import { Brand } from "@/components/Brand";

export function LegalPage({ title, intro, sections }: {
  title: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
}) {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Legal</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-4 leading-7 text-muted">{intro}</p>
        <div className="mt-8 grid gap-4">
          {sections.map((section) => (
            <div key={section.heading} className="rounded-2xl bg-card p-5">
              <h2 className="text-xl font-bold">{section.heading}</h2>
              <p className="mt-3 leading-7 text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

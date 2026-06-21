import Link from "next/link";

export function Tiers() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <div className="rounded-3xl bg-coral p-6 text-white md:p-12">
        <h2 className="serif-display text-4xl md:text-5xl">Start with one campaign. Upgrade when your workflow grows.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-white/80">Generate reports, manage clients, and improve campaigns from one simple workspace.</p>
        <Link href="/campaign" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-coral">Create campaign</Link>
      </div>
    </section>
  );
}

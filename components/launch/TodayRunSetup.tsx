import Link from "next/link";

const steps = [
  "Add destination",
  "Define business and offer",
  "Select audience",
  "Choose channel mix",
  "Set test budget",
  "Review campaign package",
  "Track early metrics",
  "Refine creative set"
];

export function TodayRunSetup() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Launch checklist</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">Setup, review and optimize.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted">A concise workflow for preparing the campaign package and reviewing performance signals.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step} className="rounded-xl bg-canvas px-4 py-3 text-sm font-semibold">{index + 1}. {step}</div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/platforms" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Destinations</Link>
          <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Create campaign</Link>
          <Link href="/analytics" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Analytics</Link>
        </div>
      </div>
    </section>
  );
}

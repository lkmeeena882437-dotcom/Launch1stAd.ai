import Link from "next/link";

const steps = [
  "Promotion link save karo",
  "Campaign Builder me business and offer add karo",
  "India location choose karo",
  "Customer segment choose karo",
  "Platform choose karo",
  "Small daily budget se test start karo",
  "72 hours baad Analytics page me numbers check karo",
  "Best creative keep karo, weak creative stop karo"
];

export function TodayRunSetup() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Today setup</p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">Aaj ka launch flow.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted">App setup ready karega. Platform par publish karne ke baad response budget, offer, creative and page quality par depend karega.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step} className="rounded-xl bg-canvas px-4 py-3 text-sm font-semibold">{index + 1}. {step}</div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/platforms" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Save links</Link>
          <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Create campaign</Link>
          <Link href="/analytics" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Track numbers</Link>
        </div>
      </div>
    </section>
  );
}

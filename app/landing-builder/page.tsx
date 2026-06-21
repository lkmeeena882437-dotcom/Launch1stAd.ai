import { buildLandingCopy } from "@/lib/landing";

export default function LandingBuilderPage() {
  const copy = buildLandingCopy("Launch1stAd Demo", "ready campaign pack", "India");
  return (
    <main className="min-h-screen bg-canvas p-8 text-ink">
      <h1 className="serif-display text-5xl">Landing Builder</h1>
      <section className="mt-8 rounded-2xl bg-card p-6">
        <h2 className="text-2xl font-semibold">{copy.hero}</h2>
        <p className="mt-3 text-muted">{copy.subhero}</p>
      </section>
    </main>
  );
}

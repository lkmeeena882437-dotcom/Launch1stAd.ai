import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1fr_0.85fr] lg:items-center md:py-24">
      <div className="rounded-[2rem] bg-white/70 p-6 backdrop-blur md:p-10">
        <p className="inline-flex rounded-full border border-hairline bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-coral">AI Assistant + Ad Launch System</p>
        <h1 className="serif-display mt-5 max-w-4xl text-5xl leading-[0.95] md:text-7xl">Your business, your audience, your ad campaign — built in minutes.</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">Business batao, goal choose karo, link add karo. Launch1stAd.ai campaign copy, targeting, placement, budget guide, final setup and publish request ready karta hai.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white shadow-soft">Start free campaign</Link>
          <Link href="/launch" className="rounded-xl bg-dark px-5 py-3 text-sm font-bold text-canvas shadow-soft">Final setup</Link>
          <Link href="/dashboard" className="rounded-xl border border-hairline bg-white px-5 py-3 text-sm font-bold text-ink">Open dashboard</Link>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-3">
          <div className="rounded-2xl border border-hairline bg-white p-4">✓ India-first setup</div>
          <div className="rounded-2xl border border-hairline bg-white p-4">✓ WhatsApp + web leads</div>
          <div className="rounded-2xl border border-hairline bg-white p-4">✓ Platform-ready payload</div>
        </div>
      </div>
      <div className="premium-ring rounded-[2rem] bg-dark p-6 text-canvas">
        <p className="text-sm text-white/50">Personal AI launch workspace</p>
        <h2 className="mt-2 text-3xl font-semibold">Campaign pack preview</h2>
        <pre className="dark-panel-code mt-5 whitespace-pre-wrap rounded-2xl bg-darkElevated p-5 text-sm leading-7 text-white/75">Goal: WhatsApp leads
Platform: Meta + Google Search
Audience: India, interested buyers
Placement: Reels + Feed + Search
Next: Final request ready</pre>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">Built for owners, creators, agencies and local businesses who want a clean campaign system without confusion.</div>
      </div>
    </section>
  );
}

import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_0.85fr] lg:items-center md:py-16">
      <div className="rounded-[2rem] bg-white/80 p-6 backdrop-blur md:p-10">
        <p className="inline-flex rounded-full border border-hairline bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-coral">AI Ad Workspace</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-ink md:text-6xl">Create better ads in minutes.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">Plan campaigns, write ad copy, choose targeting, track spend and prepare Meta/Google launch requests from one clean workspace.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white shadow-soft">Create campaign</Link>
          <Link href="#ai-chat" className="rounded-xl bg-dark px-5 py-3 text-sm font-bold text-canvas shadow-soft">Ask AI</Link>
          <Link href="/dashboard" className="rounded-xl border border-hairline bg-white px-5 py-3 text-sm font-bold text-ink">Dashboard</Link>
        </div>
        <div className="mt-7 grid gap-3 text-sm text-muted sm:grid-cols-3">
          <div className="rounded-2xl border border-hairline bg-white p-4">✓ Campaign plan</div>
          <div className="rounded-2xl border border-hairline bg-white p-4">✓ Ad copy + targeting</div>
          <div className="rounded-2xl border border-hairline bg-white p-4">✓ Spend tracking</div>
        </div>
      </div>
      <div className="premium-ring rounded-[2rem] bg-dark p-6 text-canvas">
        <p className="text-sm text-white/50">Workspace preview</p>
        <h2 className="mt-2 text-2xl font-semibold">Campaign ready</h2>
        <pre className="dark-panel-code mt-5 whitespace-pre-wrap rounded-2xl bg-darkElevated p-5 text-sm leading-7 text-white/75">Platform: Meta + Google
Goal: Leads / Sales
Targeting: India buyers
Status: Ready for review</pre>
      </div>
    </section>
  );
}

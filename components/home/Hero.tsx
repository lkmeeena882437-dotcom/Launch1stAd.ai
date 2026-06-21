import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">AI Assistant + Ad Launch System</p>
        <h1 className="serif-display mt-4 text-5xl leading-[0.95] md:text-7xl">Launch your first professional ad campaign with AI.</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">Business batao, budget batao — Launch1stAd.ai tumhare liye Meta, Google, WhatsApp aur landing page ka ready campaign pack banayega.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Start free campaign</Link>
          <Link href="/dashboard" className="rounded-xl border border-hairline bg-canvas px-5 py-3 text-sm font-bold text-ink">Open dashboard</Link>
        </div>
      </div>
      <div className="rounded-3xl bg-dark p-6 text-canvas shadow-soft">
        <p className="text-sm text-white/50">Sample AI Launch Pack</p>
        <h2 className="mt-2 text-2xl font-semibold">Clothing store campaign</h2>
        <pre className="dark-panel-code mt-5 whitespace-pre-wrap rounded-2xl bg-darkElevated p-5 text-sm leading-7 text-white/75">Goal: WhatsApp sales
Platform: Meta + Google Search
Audience: Women 18-35, fashion buyers
Hook: Trendy outfits under budget
CTA: Send WhatsApp</pre>
      </div>
    </section>
  );
}

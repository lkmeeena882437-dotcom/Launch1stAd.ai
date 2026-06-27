import Link from "next/link";

const stats = [
  ["Verified wallet", "Spend only after payment confirmation"],
  ["Review queue", "Campaigns move through approval"],
  ["Provider ready", "Meta and Google connection paths"]
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-5 md:py-16 lg:grid-cols-[1fr_0.82fr] lg:items-center">
      <div className="neon-shell rounded-[2rem] p-5 md:p-10">
        <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#7dd3fc]">AI advertising command center</p>
        <h1 className="serif-display mt-6 max-w-4xl text-5xl leading-[0.94] text-white md:text-7xl">
          Launch sharper ads with <span className="neon-text">AI, wallet control and review flow.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">Build campaign briefs, prepare audience targeting, connect approved ad accounts, fund verified spend and move every campaign into a clean review workflow.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/campaign" className="rounded-2xl px-6 py-4 text-sm font-black text-white neon-button">Create campaign</Link>
          <Link href="/wallet" className="rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur">Add ad funds</Link>
          <Link href="/connections" className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white/80">Connect accounts</Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <h3 className="text-sm font-black text-white">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl neon-ring md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#22e6a8]">Workspace preview</p>
        <h2 className="mt-3 text-3xl font-black text-white">From idea to review in one flow.</h2>
        <div className="mt-6 grid gap-3">
          {[
            ["01", "Offer and audience captured"],
            ["02", "Verified wallet checked"],
            ["03", "Campaign generated"],
            ["04", "Review request saved"]
          ].map(([step, label]) => (
            <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#2dd4ff]/15 text-sm font-black text-[#7dd3fc]">{step}</span>
              <span className="text-sm font-bold text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

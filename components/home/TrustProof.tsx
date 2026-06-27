function numberEnv(name: string) {
  const value = Number(process.env[name] || "0");
  return Number.isFinite(value) ? value : 0;
}

const proofCards = [
  {
    title: "Local business launch",
    text: "Create a campaign brief, ad copy and review-ready launch pack for WhatsApp, Meta and Google channels."
  },
  {
    title: "Wallet-first workflow",
    text: "Campaign review starts only after verified wallet funding, so ad spend and launch status stay controlled."
  },
  {
    title: "Review before delivery",
    text: "Submitted campaigns move through approval before any provider connector receives the campaign payload."
  }
];

export function TrustProof() {
  const workspaces = numberEnv("PUBLIC_WORKSPACES_COUNT");
  const campaigns = numberEnv("PUBLIC_CAMPAIGNS_COUNT");
  const active = numberEnv("PUBLIC_ACTIVE_30D_COUNT");

  const stats = [
    ["Verified workspaces", workspaces ? `${workspaces}+` : "Launching"],
    ["Campaign packs", campaigns ? `${campaigns}+` : "Ready"],
    ["Active this month", active ? `${active}+` : "Early access"]
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-5 md:py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 text-white shadow-[0_0_90px_rgba(45,212,255,0.18)] backdrop-blur-2xl md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#22e6a8]">Trust layer</p>
            <h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-tight md:text-6xl">Built for real businesses and verified records.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">Platform activity appears from configured or verified records. Client reviews should be added only after real approval, so the brand stays clean and reliable.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-black/25 p-4">
                  <div className="text-3xl font-black text-white">{value}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/45">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {proofCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <h3 className="text-2xl font-black">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{card.text}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-[#22e6a8]/30 bg-[#22e6a8]/10 p-5">
              <h3 className="text-2xl font-black">Approved client reviews</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">Real testimonials will appear here after client approval and review.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

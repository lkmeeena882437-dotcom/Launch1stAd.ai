import { FeatureCard } from "./FeatureCard";

function numberEnv(name: string) {
  const value = Number(process.env[name] || "0");
  return Number.isFinite(value) ? value : 0;
}

const features = [
  ["Campaign Strategy", "Turn business goals into a clear media plan with budget, audience and channel guidance."],
  ["Creative Direction", "Generate ad angles, hooks, CTAs and message variations for faster testing."],
  ["Audience Planning", "Map customer intent by location, interest, age group and campaign objective."],
  ["Channel Setup", "Prepare launch-ready structures for Meta, Google, WhatsApp and web traffic."],
  ["Lead Workflow", "Create WhatsApp replies, follow-ups and sales conversation scripts."],
  ["Performance Review", "Track spend, CPC, CTR, leads and ROAS to decide what to scale or stop."]
];

export function Features() {
  const workspaces = numberEnv("PUBLIC_WORKSPACES_COUNT");
  const campaigns = numberEnv("PUBLIC_CAMPAIGNS_COUNT");
  const active = numberEnv("PUBLIC_ACTIVE_30D_COUNT");

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">Capabilities</p>
      <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl">Built for serious campaign execution.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {features.map(([title, text]) => <FeatureCard key={title} title={title} text={text} />)}
      </div>
      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 text-white backdrop-blur-xl md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#22e6a8]">Platform trust</p>
        <h3 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Clear numbers. Clean workflow.</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5"><strong className="text-4xl">{workspaces ? `${workspaces}+` : "0"}</strong><span className="mt-2 block text-sm text-white/55">Verified workspaces</span></div>
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5"><strong className="text-4xl">{campaigns ? `${campaigns}+` : "0"}</strong><span className="mt-2 block text-sm text-white/55">Campaign packs</span></div>
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5"><strong className="text-4xl">{active ? `${active}+` : "0"}</strong><span className="mt-2 block text-sm text-white/55">Active this month</span></div>
        </div>
        <p className="mt-5 text-sm leading-7 text-white/60">Client reviews can be added after approval. The launch flow keeps wallet funding, campaign review and provider delivery separate.</p>
      </div>
    </section>
  );
}

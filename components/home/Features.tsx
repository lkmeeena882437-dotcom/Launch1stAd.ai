import { FeatureCard } from "./FeatureCard";

const features = [
  ["Campaign Strategy", "Turn business goals into a clear media plan with budget, audience and channel guidance."],
  ["Creative Direction", "Generate ad angles, hooks, CTAs and message variations for faster testing."],
  ["Audience Planning", "Map customer intent by location, interest, age group and campaign objective."],
  ["Channel Setup", "Prepare launch-ready structures for Meta, Google, WhatsApp and web traffic."],
  ["Lead Workflow", "Create WhatsApp replies, follow-ups and sales conversation scripts."],
  ["Performance Review", "Track spend, CPC, CTR, leads and ROAS to decide what to scale or stop."]
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Capabilities</p>
      <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight text-ink md:text-5xl">Built for serious campaign execution.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {features.map(([title, text]) => <FeatureCard key={title} title={title} text={text} />)}
      </div>
    </section>
  );
}

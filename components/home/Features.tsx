import { FeatureCard } from "./FeatureCard";

const features = [
  ["Business Brain", "Category, product, price, location, audience and goal ko samajhkar right strategy banata hai."],
  ["Campaign Builder", "Meta, Google, WhatsApp and landing page ke ready-to-launch campaign packs deta hai."],
  ["Creative Studio", "Hindi, English and Hinglish ad copy, hooks, CTAs, scripts and creative ideas ready karta hai."],
  ["Audience Finder", "Category-wise buyer intent, location, interest stack and retargeting audience suggest karta hai."],
  ["WhatsApp Converter", "Lead reply, price handling, objection reply and follow-up sequence banata hai."],
  ["Growth Optimizer", "CTR, CPC, CPL and ROAS ke hisaab se next improvement plan deta hai."]
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="serif-display max-w-3xl text-5xl">Everything needed before launching an ad.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {features.map(([title, text]) => <FeatureCard key={title} title={title} text={text} />)}
      </div>
    </section>
  );
}

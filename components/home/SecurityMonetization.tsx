const blocks = [
  {
    title: "Legal pages",
    items: ["Privacy Policy", "Terms & Conditions", "Refund & Cancellation", "Contact Us"]
  },
  {
    title: "AI safety",
    items: ["Input filtering", "Prompt-injection guard", "Rate limiting", "Opt-in checks"]
  },
  {
    title: "Platform security",
    items: ["Secure webhooks", "OAuth readiness", "Spam protection", "Repo security"]
  },
  {
    title: "Monetization",
    items: ["Razorpay-ready", "Credits", "Subscriptions", "Premium AI tools"]
  }
];

export function SecurityMonetization() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="rounded-[2rem] border border-hairline bg-white p-6 shadow-soft md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Trust, billing & safety</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-ink md:text-5xl">Built for secure campaign operations.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">Core trust modules are structured for policy pages, payment security, AI safeguards and account-based campaign workflows.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {blocks.map((block) => (
            <div key={block.title} className="rounded-3xl bg-card p-5">
              <h3 className="text-lg font-bold text-ink">{block.title}</h3>
              <div className="mt-4 grid gap-2">
                {block.items.map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-muted">✓ {item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

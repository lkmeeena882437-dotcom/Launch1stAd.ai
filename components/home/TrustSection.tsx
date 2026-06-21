const cards = [
  {
    title: "Clear launch plan",
    text: "User ko ad campaign ka structure, copy, audience aur next steps ek report me milta hai."
  },
  {
    title: "Built for local businesses",
    text: "WhatsApp leads, Hindi/Hinglish copy aur small-budget launch ke liye simple workflow."
  },
  {
    title: "No confusing dashboard",
    text: "Client select karo, campaign banao, report share karo. Bas kaam ki cheeze dikhengi."
  }
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Trust</p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">Simple enough for owners. Useful enough for marketers.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-canvas p-5">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

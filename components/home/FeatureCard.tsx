export function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="group rounded-3xl border border-hairline bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
      <div className="mb-5 h-10 w-10 rounded-2xl bg-card p-2 text-center text-sm font-bold text-coral">✓</div>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-muted">{text}</p>
    </div>
  );
}

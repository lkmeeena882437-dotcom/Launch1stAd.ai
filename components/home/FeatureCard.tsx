export function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-soft">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-muted">{text}</p>
    </div>
  );
}

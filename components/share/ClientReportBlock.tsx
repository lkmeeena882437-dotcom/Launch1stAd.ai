export function ClientReportBlock({ name }: { name?: string }) {
  if (!name) return null;

  return (
    <div className="rounded-2xl bg-card p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Client</p>
      <h2 className="mt-2 text-2xl font-semibold">{name}</h2>
    </div>
  );
}

const envItems = [
  "CONNECTOR_A_ENDPOINT",
  "CONNECTOR_B_ENDPOINT",
  "CONNECTOR_SHARED_SECRET",
  "META_APP_ID",
  "META_APP_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET"
];

const approvalItems = [
  "Business Manager / Ads account access",
  "Provider developer app created",
  "OAuth redirect URL approved",
  "Ad account permissions granted",
  "Policy pages connected",
  "Billing method active"
];

export function ProviderReadiness() {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-hairline bg-canvas p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">Vercel configuration</p>
        <h2 className="mt-3 text-2xl font-bold text-ink">Connector environment keys</h2>
        <div className="mt-5 grid gap-2">
          {envItems.map((item) => (
            <div key={item} className="rounded-xl bg-white px-4 py-3 font-mono text-xs text-muted">{item}</div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-hairline bg-canvas p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">Provider approval</p>
        <h2 className="mt-3 text-2xl font-bold text-ink">Meta / Google launch checklist</h2>
        <div className="mt-5 grid gap-2">
          {approvalItems.map((item) => (
            <div key={item} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-muted">✓ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

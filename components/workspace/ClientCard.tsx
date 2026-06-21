import type { ClientProfile } from "@/lib/workspace";

export function ClientCard({ client, active, onSelect }: {
  client: ClientProfile;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={active ? "rounded-2xl bg-dark p-5 text-left text-canvas" : "rounded-2xl bg-card p-5 text-left text-ink"}
    >
      <p className="text-xs uppercase tracking-[0.18em] opacity-60">{active ? "Active client" : "Client"}</p>
      <h2 className="mt-2 text-xl font-semibold">{client.businessName || "Unnamed business"}</h2>
      <p className="mt-2 text-sm opacity-70">{client.category} · {client.location}</p>
      <p className="mt-1 text-sm opacity-70">{client.product || "No offer added"}</p>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { defaultConnections, readConnections, saveConnectionStatus, type PlatformConnection } from "@/lib/connections";

export function ConnectionsPanel() {
  const searchParams = useSearchParams();
  const [connections, setConnections] = useState<PlatformConnection[]>(defaultConnections);

  useEffect(() => {
    const saved = readConnections();
    const provider = searchParams.get("provider");
    const status = searchParams.get("status");
    if ((provider === "meta" || provider === "google") && status === "connected") {
      setConnections(saveConnectionStatus(provider, "connected", "Connection verified. Server-side token storage is ready for configuration."));
      return;
    }
    if ((provider === "meta" || provider === "google") && status === "started") {
      setConnections(saveConnectionStatus(provider, "started", "Connection initiated. Complete provider login to continue."));
      return;
    }
    if ((provider === "meta" || provider === "google") && status === "error") {
      setConnections(saveConnectionStatus(provider, "error", "Connection unavailable. Review provider setup."));
      return;
    }
    setConnections(saved);
  }, [searchParams]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Channel connections</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-6xl">Connect advertising accounts.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Link owned ad accounts and prepare approved campaign requests for channel activation.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {connections.map((connection) => (
            <div key={connection.provider} className="rounded-2xl bg-canvas p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{connection.label}</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">{connection.status.replace("_", " ")}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{connection.note}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`/connections?provider=${connection.provider}&status=started`} className="rounded-xl bg-coral px-4 py-3 text-sm font-bold text-white">Connect</a>
                <button type="button" onClick={() => setConnections(saveConnectionStatus(connection.provider, "not_connected"))} className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Reset</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-hairline bg-canvas p-5 text-sm leading-7 text-muted">
          Provider login, token storage and connector endpoints are configured from deployment environment settings.
        </div>
      </div>
    </section>
  );
}

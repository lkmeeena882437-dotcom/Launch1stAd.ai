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
      setConnections(saveConnectionStatus(provider, "connected", "Login callback received. Token exchange/storage needs server approval setup."));
      return;
    }
    if ((provider === "meta" || provider === "google") && status === "error") {
      setConnections(saveConnectionStatus(provider, "error", "Connection could not start. Check environment variables and platform app setup."));
      return;
    }
    setConnections(saved);
  }, [searchParams]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Platform connections</p>
        <h1 className="serif-display mt-3 text-4xl md:text-6xl">Connect user ad accounts.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">User login karega, platform permission dega, phir webapp campaign payload ko connected account ke liye ready rakhegi. Final publish action server-side token setup ke baad active hoga.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {connections.map((connection) => (
            <div key={connection.provider} className="rounded-2xl bg-canvas p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{connection.label}</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">{connection.status.replace("_", " ")}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{connection.note}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`/api/connect/${connection.provider}/start`} className="rounded-xl bg-coral px-4 py-3 text-sm font-bold text-white">Connect</a>
                <button type="button" onClick={() => setConnections(saveConnectionStatus(connection.provider, "not_connected"))} className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Reset</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-hairline bg-canvas p-5 text-sm leading-7 text-muted">
          Required setup: platform developer app, redirect URL, user permission, billing-ready ad account, secure token storage, then campaign create API.
        </div>
      </div>
    </section>
  );
}

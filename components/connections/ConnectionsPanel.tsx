"use client";

import Link from "next/link";
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
      setConnections(saveConnectionStatus(provider, "started", "Connection started. Account record storage is pending."));
      return;
    }
    if ((provider === "meta" || provider === "google") && status === "started") {
      setConnections(saveConnectionStatus(provider, "started", "Connection started. Complete account approval before delivery."));
      return;
    }
    if ((provider === "meta" || provider === "google") && status === "error") {
      setConnections(saveConnectionStatus(provider, "error", "Connection could not be completed."));
      return;
    }
    setConnections(saved);
  }, [searchParams]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-5 md:py-10">
      <div className="neon-shell rounded-[2rem] p-5 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#22e6a8]">Account connections</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">Connect ad accounts.</h1>
        <p className="mt-5 max-w-3xl leading-7 text-white/60">Connect Meta and Google accounts so reviewed campaigns can use the right advertising channel.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {connections.map((connection) => (
            <div key={connection.provider} className="rounded-3xl border border-white/10 bg-black/25 p-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black">{connection.label}</h2>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">{connection.status.replace("_", " ")}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60">{connection.note}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/api/oauth/${connection.provider}/start`} className="rounded-2xl px-5 py-3 text-sm font-black text-white neon-button">Start connection</Link>
                <button type="button" onClick={() => setConnections(saveConnectionStatus(connection.provider, "not_connected"))} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white">Reset</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/terms" className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black text-white">Terms</Link>
          <Link href="/privacy" className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black text-white">Privacy</Link>
          <Link href="/faq" className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black text-white">FAQ</Link>
        </div>
      </div>
    </section>
  );
}

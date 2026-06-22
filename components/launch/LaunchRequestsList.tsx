"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { launchRequestsKey, type LaunchRequest } from "@/lib/launchRequests";

function readRequests() {
  try {
    const raw = window.localStorage.getItem(launchRequestsKey);
    return raw ? (JSON.parse(raw) as LaunchRequest[]) : [];
  } catch {
    return [];
  }
}

export function LaunchRequestsList() {
  const [items, setItems] = useState<LaunchRequest[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setItems(readRequests());
  }, []);

  function clearAll() {
    window.localStorage.removeItem(launchRequestsKey);
    setItems([]);
  }

  async function finalPublish(item: LaunchRequest) {
    setMessage("Submitting request...");
    const response = await fetch("/api/platform-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: item.provider, requestId: item.id, payload: item.payload })
    });
    const data = await response.json();
    setMessage(data.message || "Request processed.");
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Launch requests</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-6xl">Review channel-ready requests.</h1>
            <p className="mt-4 max-w-3xl leading-7 text-muted">Approved campaign packages appear here before channel submission.</p>
          </div>
          {items.length > 0 && <button onClick={clearAll} className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Clear</button>}
        </div>

        {message && <div className="mt-6 rounded-2xl bg-canvas p-4 text-sm font-semibold text-coral">{message}</div>}

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-canvas p-6 text-muted">
            No launch requests yet. Create a campaign package to begin.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl bg-canvas p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">Campaign request</h2>
                    <p className="mt-1 text-sm text-muted">Campaign ID: {item.campaignId}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">{item.status.replace("_", " ")}</span>
                </div>
                <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                  <div className="rounded-xl bg-card px-4 py-3">Provider: {item.provider}</div>
                  <div className="rounded-xl bg-card px-4 py-3">Created: {new Date(item.createdAt).toLocaleString()}</div>
                  <div className="rounded-xl bg-card px-4 py-3">Requirement: connected account</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => finalPublish(item)} className="rounded-xl bg-dark px-4 py-3 text-sm font-bold text-canvas">Submit request</button>
                  <Link href={`/campaigns?id=${item.campaignId}`} className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Open report</Link>
                  <Link href="/connections" className="rounded-xl bg-coral px-4 py-3 text-sm font-bold text-white">Connect account</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

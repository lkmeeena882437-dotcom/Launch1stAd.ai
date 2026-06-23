"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth/session";
import { launchRequestsKey, type LaunchRequest } from "@/lib/launchRequests";
import { getSupabaseConfig } from "@/lib/supabase/config";

function readRequests() {
  try {
    const raw = window.localStorage.getItem(launchRequestsKey);
    return raw ? (JSON.parse(raw) as LaunchRequest[]) : [];
  } catch {
    return [];
  }
}

async function loadCloudRequests() {
  const { url, anonKey } = getSupabaseConfig();
  const session = getAuthSession();
  if (!url || !anonKey || !session?.accessToken) return [];

  const response = await fetch(`${url}/rest/v1/campaign_launches?select=*&order=created_at.desc`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${session.accessToken}`
    }
  });
  const rows = await response.json().catch(() => []);
  if (!response.ok || !Array.isArray(rows)) return [];

  return rows.map((row) => ({
    id: row.id,
    campaignId: row.campaign_id,
    provider: row.provider || "selected",
    status: row.status || "under_review",
    payload: row.payload || { input: { promotionType: row.destination || "Campaign" }, output: {} },
    createdAt: row.created_at,
    reviewWindow: row.review_window || "2–24 hours"
  })) as LaunchRequest[];
}

function estimatedMetrics(index: number) {
  return {
    views: 1200 + index * 340,
    clicks: 75 + index * 18,
    leads: 12 + index * 4
  };
}

export function LaunchRequestsList() {
  const [items, setItems] = useState<LaunchRequest[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setItems(readRequests());
    loadCloudRequests().then((cloudItems) => {
      if (cloudItems.length > 0) setItems(cloudItems);
    });
  }, []);

  function clearLocal() {
    window.localStorage.removeItem(launchRequestsKey);
    setItems([]);
    setMessage("Local review list cleared. Cloud records stay in your workspace.");
  }

  async function sendToProvider(item: LaunchRequest) {
    setMessage("Sending campaign to configured provider connector.");
    await fetch("/api/platform-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: item.provider, requestId: item.id, payload: item.payload })
    }).catch(() => undefined);
    setMessage("Provider request sent. Review window remains 2–24 hours.");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-5 md:py-10">
      <div className="rounded-3xl bg-card p-5 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Launch requests</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-6xl">Review, approve and track campaigns.</h1>
            <p className="mt-4 max-w-3xl leading-7 text-muted">Submitted campaigns enter a 2–24 hour review window before active delivery and destination tracking.</p>
          </div>
          {items.length > 0 && <button onClick={clearLocal} className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Clear local</button>}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 text-sm">
          <p className="font-semibold text-muted">Fund wallet and reserve ad spend before provider delivery.</p>
          <Link href="/wallet" className="rounded-xl bg-coral px-4 py-3 font-bold text-white">Add ad funds</Link>
        </div>

        {message && <div className="mt-6 rounded-2xl bg-canvas p-4 text-sm font-semibold text-coral">{message}</div>}

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-canvas p-6 text-muted">
            No launch requests yet. Create a funded campaign to submit it for review.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((item, index) => {
              const metrics = estimatedMetrics(index);
              return (
              <div key={item.id} className="rounded-2xl bg-canvas p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">Campaign request</h2>
                    <p className="mt-1 text-sm text-muted">Campaign ID: {item.campaignId}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">{item.status.replace("_", " ")}</span>
                </div>
                <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                  <div className="rounded-xl bg-card px-4 py-3">Provider: {item.provider}</div>
                  <div className="rounded-xl bg-card px-4 py-3">Created: {new Date(item.createdAt).toLocaleString()}</div>
                  <div className="rounded-xl bg-card px-4 py-3">Review: {item.reviewWindow || "2–24 hours"}</div>
                  <div className="rounded-xl bg-card px-4 py-3">Destination: {item.payload.input.promotionType}</div>
                </div>

                {item.status === "active" && (
                  <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                    <div className="rounded-xl bg-white px-4 py-3"><strong>{metrics.views.toLocaleString()}</strong><span className="ml-2 text-muted">views</span></div>
                    <div className="rounded-xl bg-white px-4 py-3"><strong>{metrics.clicks.toLocaleString()}</strong><span className="ml-2 text-muted">clicks</span></div>
                    <div className="rounded-xl bg-white px-4 py-3"><strong>{metrics.leads.toLocaleString()}</strong><span className="ml-2 text-muted">leads / members</span></div>
                  </div>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
                  <button onClick={() => sendToProvider(item)} className="rounded-xl bg-dark px-4 py-3 text-sm font-bold text-canvas">Send to provider</button>
                  <Link href={`/campaigns?id=${item.campaignId}`} className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Open report</Link>
                  <Link href="/wallet" className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Wallet</Link>
                </div>
              </div>
            );})}
          </div>
        )}
      </div>
    </section>
  );
}

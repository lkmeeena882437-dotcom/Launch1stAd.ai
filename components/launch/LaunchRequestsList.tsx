"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth/session";
import { launchRequestsKey, type LaunchRequest, type LaunchRequestStatus } from "@/lib/launchRequests";
import { getSupabaseConfig } from "@/lib/supabase/config";

const reviewStatuses = ["under_review", "approved", "rejected", "paused"] as const;
type ReviewStatus = typeof reviewStatuses[number];

const fallbackPayload: LaunchRequest["payload"] = {
  input: {
    businessName: "Campaign",
    category: "General",
    product: "Campaign offer",
    priceRange: "",
    location: "India",
    budget: "₹500/day",
    goal: "Leads",
    language: "Hinglish",
    promotionType: "Campaign",
    promotionLink: "",
    targetPlatforms: ["Instagram", "Facebook"],
    audienceType: "Interested buyers",
    ageRange: "18-45",
    gender: "All",
    interests: "",
    currency: "INR",
    totalBudget: "₹3500/week",
    paymentModel: "Auto"
  },
  output: {}
};

type CloudLaunchRow = {
  id?: string;
  campaign_id?: string;
  provider?: string;
  status?: LaunchRequestStatus;
  payload?: LaunchRequest["payload"];
  created_at?: string;
};

function readRequests() {
  try {
    const raw = window.localStorage.getItem(launchRequestsKey);
    return raw ? (JSON.parse(raw) as LaunchRequest[]) : [];
  } catch {
    return [];
  }
}

function normalizeLaunchRequest(row: CloudLaunchRow): LaunchRequest {
  return {
    id: row.id || crypto.randomUUID(),
    campaignId: row.campaign_id || "campaign",
    provider: row.provider || "selected",
    status: row.status || "under_review",
    payload: row.payload || fallbackPayload,
    createdAt: row.created_at || new Date().toISOString(),
    reviewWindow: "2–24 hours"
  };
}

async function loadCloudRequests() {
  const { url, anonKey } = getSupabaseConfig();
  const session = getAuthSession();
  if (!url || !anonKey || !session?.accessToken) return [];

  const response = await fetch(`${url}/rest/v1/launch_requests?select=*&order=created_at.desc`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${session.accessToken}`
    }
  });
  const rows = await response.json().catch(() => []);
  if (!response.ok || !Array.isArray(rows)) return [];
  return rows.map((row) => normalizeLaunchRequest(row as CloudLaunchRow));
}

export function LaunchRequestsList() {
  const [items, setItems] = useState<LaunchRequest[]>([]);
  const [message, setMessage] = useState("");

  async function refresh() {
    const local = readRequests();
    setItems(local);
    const cloudItems = await loadCloudRequests();
    if (cloudItems.length > 0) setItems(cloudItems);
  }

  useEffect(() => { refresh(); }, []);

  function clearLocal() {
    window.localStorage.removeItem(launchRequestsKey);
    setItems([]);
    setMessage("Local review list cleared. Cloud records stay in your workspace.");
  }

  async function updateStatus(item: LaunchRequest, status: ReviewStatus) {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setMessage("Sign in before updating review status.");
      return;
    }

    setMessage("Updating review status...");
    const response = await fetch("/api/reviews/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`
      },
      body: JSON.stringify({ id: item.id, status })
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data?.ok) {
      setItems((current) => current.map((record) => record.id === item.id ? { ...record, status } : record));
      setMessage(`Review marked as ${status.replace("_", " ")}.`);
    } else {
      setMessage(data?.message || "Review status could not be updated.");
    }
  }

  async function sendToProvider(item: LaunchRequest) {
    if (item.status !== "approved") {
      setMessage("Approve the campaign before sending it to a provider connector.");
      return;
    }

    setMessage("Sending approved campaign to configured provider connector.");
    await fetch("/api/platform-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: item.provider, requestId: item.id, payload: item.payload })
    }).catch(() => undefined);
    setMessage("Provider request sent. Delivery depends on provider setup and account approval.");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-5 md:py-10">
      <div className="neon-shell rounded-[2rem] p-5 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#22e6a8]">Review manager</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">Review, approve and track campaigns.</h1>
            <p className="mt-4 max-w-3xl leading-7 text-white/60">Submitted campaigns enter review before provider delivery. Approve only campaigns with correct offer, budget, destination and policy-safe copy.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={refresh} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white">Refresh</button>
            {items.length > 0 && <button onClick={clearLocal} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white">Clear local</button>}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/70">
          <p className="font-semibold">Verified wallet funding is required before campaign review.</p>
          <Link href="/wallet" className="rounded-xl bg-white px-4 py-3 font-black text-black">Add ad funds</Link>
        </div>

        {message && <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-bold text-[#fda4af]">{message}</div>}

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-6 text-white/60">No launch requests yet. Create a funded campaign to submit it for review.</div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-black/25 p-4 text-white md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black">Campaign request</h2>
                    <p className="mt-1 text-sm text-white/55">Campaign ID: {item.campaignId}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">{item.status.replace("_", " ")}</span>
                </div>
                <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                  <div className="rounded-xl bg-white/10 px-4 py-3">Provider: {item.provider}</div>
                  <div className="rounded-xl bg-white/10 px-4 py-3">Created: {new Date(item.createdAt).toLocaleString()}</div>
                  <div className="rounded-xl bg-white/10 px-4 py-3">Review: {item.reviewWindow || "2–24 hours"}</div>
                  <div className="rounded-xl bg-white/10 px-4 py-3">Destination: {item.payload.input.promotionType}</div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
                  <button onClick={() => updateStatus(item, "approved")} className="rounded-xl bg-[#22e6a8] px-4 py-3 text-sm font-black text-black">Approve</button>
                  <button onClick={() => updateStatus(item, "rejected")} className="rounded-xl bg-[#ff5d8f] px-4 py-3 text-sm font-black text-white">Reject</button>
                  <button onClick={() => updateStatus(item, "paused")} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white">Pause</button>
                  <button onClick={() => sendToProvider(item)} className="rounded-xl border border-white/15 bg-white px-4 py-3 text-sm font-black text-black">Send to provider</button>
                  <Link href={`/campaigns?id=${item.campaignId}`} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-black text-white">Open report</Link>
                  <Link href="/wallet" className="rounded-xl border border-white/15 px-4 py-3 text-sm font-black text-white">Wallet</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

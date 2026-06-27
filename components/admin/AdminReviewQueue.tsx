"use client";

import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth/session";

type ReviewRow = {
  id: string;
  campaign_id?: string;
  provider?: string;
  status?: string;
  created_at?: string;
  payload?: { input?: { businessName?: string; promotionType?: string; goal?: string; budget?: string } };
};

export function AdminReviewQueue() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [message, setMessage] = useState("Loading review queue...");

  async function load() {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setMessage("Sign in as owner to load the review queue.");
      return;
    }

    const response = await fetch("/api/admin/reviews", { headers: { Authorization: `Bearer ${session.accessToken}` } });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data?.ok) {
      setRows(Array.isArray(data.reviews) ? data.reviews : []);
      setMessage(data.reviews?.length ? "Review queue loaded." : "No submitted campaigns yet.");
    } else {
      setMessage(data?.message || "Review queue could not be loaded.");
    }
  }

  async function update(id: string, status: string) {
    const session = getAuthSession();
    if (!session?.accessToken) {
      setMessage("Sign in as owner before updating reviews.");
      return;
    }

    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.accessToken}` },
      body: JSON.stringify({ id, status })
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data?.ok) {
      setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
      setMessage(`Review marked ${status.replace("_", " ")}.`);
    } else {
      setMessage(data?.message || "Review update failed.");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-5">
      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 text-white shadow-[0_0_60px_rgba(45,212,255,0.18)] backdrop-blur-xl md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#22e6a8]">Owner queue</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Submitted launch requests</h2>
          </div>
          <button onClick={load} className="rounded-xl bg-white px-4 py-3 text-sm font-black text-black">Refresh</button>
        </div>
        {message && <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-bold text-[#fda4af]">{message}</div>}
        <div className="mt-6 grid gap-4">
          {rows.map((row) => (
            <div key={row.id} className="rounded-3xl border border-white/10 bg-black/25 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">{row.payload?.input?.businessName || "Campaign request"}</h3>
                  <p className="mt-1 text-sm text-white/55">Campaign: {row.campaign_id || row.id}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">{(row.status || "under_review").replace("_", " ")}</span>
              </div>
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                <div className="rounded-xl bg-white/10 px-4 py-3">Provider: {row.provider || "selected"}</div>
                <div className="rounded-xl bg-white/10 px-4 py-3">Goal: {row.payload?.input?.goal || "Leads"}</div>
                <div className="rounded-xl bg-white/10 px-4 py-3">Destination: {row.payload?.input?.promotionType || "Campaign"}</div>
                <div className="rounded-xl bg-white/10 px-4 py-3">Budget: {row.payload?.input?.budget || "Not set"}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["approved", "rejected", "paused", "under_review"].map((status) => (
                  <button key={status} onClick={() => update(row.id, status)} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white">{status.replace("_", " ")}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

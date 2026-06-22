"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const placements = ["Feed", "Reels", "Stories", "Search", "Video", "Display", "Telegram post"];
const requestKey = "launch1stad.launchRequests";

export function CampaignProcessForm() {
  const [done, setDone] = useState(false);
  const [terms, setTerms] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [cpm, setCpm] = useState("");
  const [cpc, setCpc] = useState("");
  const [placement, setPlacement] = useState("Feed");
  const [targeting, setTargeting] = useState("");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = window.localStorage.getItem(requestKey);
    const list = raw ? JSON.parse(raw) : [];
    const item = {
      id: crypto.randomUUID(),
      campaignId: `final-${Date.now()}`,
      provider: "selected",
      status: "connected_required",
      payload: { output: { title, text, cpm, cpc, placement, targeting, privacyPolicyUrl, termsAccepted: terms } },
      createdAt: new Date().toISOString()
    };
    window.localStorage.setItem(requestKey, JSON.stringify([item, ...list]));
    setDone(true);
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Campaign creation</p>
        <h1 className="serif-display mt-3 text-4xl md:text-6xl">Create final campaign setup.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Title, text, cost model, placement, targeting, privacy policy and terms complete karo.</p>

        <form onSubmit={submit} className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold">Campaign title<input required value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" placeholder="Summer offer campaign" /></label>
          <label className="grid gap-2 text-sm font-semibold">Ad text<textarea required value={text} onChange={(event) => setText(event.target.value)} className="min-h-28 rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" placeholder="Write main ad copy here" /></label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">CPM guide<input value={cpm} onChange={(event) => setCpm(event.target.value)} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" placeholder="₹80–₹250" /></label>
            <label className="grid gap-2 text-sm font-semibold">CPC guide<input value={cpc} onChange={(event) => setCpc(event.target.value)} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" placeholder="₹2–₹20" /></label>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">Placement<select value={placement} onChange={(event) => setPlacement(event.target.value)} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none">{placements.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-sm font-semibold">Targeting<input required value={targeting} onChange={(event) => setTargeting(event.target.value)} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" placeholder="India, interested buyers, local intent" /></label>
          </div>
          <label className="grid gap-2 text-sm font-semibold">Privacy policy URL<input required value={privacyPolicyUrl} onChange={(event) => setPrivacyPolicyUrl(event.target.value)} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" placeholder="https://your-site.com/privacy" /></label>
          <label className="flex items-start gap-3 rounded-2xl bg-canvas p-4 text-sm leading-6 text-muted"><input checked={terms} onChange={(event) => setTerms(event.target.checked)} required type="checkbox" className="mt-1" /><span>I confirm that the campaign text, targeting, privacy policy and terms are reviewed.</span></label>
          <button className="rounded-xl bg-coral px-5 py-4 text-sm font-bold text-white">Final request ready</button>
        </form>

        {done && <div className="mt-6 rounded-2xl bg-canvas p-5 text-sm leading-7 text-muted">Final setup saved in requests.<div className="mt-4 flex flex-wrap gap-3"><Link href="/connections" className="rounded-xl bg-dark px-4 py-3 text-sm font-bold text-canvas">Connect account</Link><Link href="/launch-requests" className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Open requests</Link></div></div>}
      </div>
    </section>
  );
}

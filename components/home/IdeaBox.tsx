"use client";

import { FormEvent, useState } from "react";

const personas = ["Meta Ads", "Google Search", "Landing Page", "WhatsApp Leads", "Email", "Telegram"];
const prompts = ["Plan", "Targeting", "Ad copy", "Keywords"];

export function IdeaBox() {
  const [persona, setPersona] = useState(personas[0]);
  const [question, setQuestion] = useState("Build a focused campaign plan for my business");
  const [answer, setAnswer] = useState("Select a channel expert, enter your offer and get one clear launch direction.");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/idea-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: `${persona}: ${question}` })
      });
      const data = await response.json();
      setAnswer(data.answer || "Add offer, audience, budget and destination for a stronger answer.");
    } catch {
      setAnswer("Use one audience, one offer, one CTA and one follow-up path before launching.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 md:px-5 md:py-10">
      <div className="neon-card rounded-[2rem] p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c084fc]">AI campaign assistant</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Ask less. Launch clearer.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/62">A compact planner for strategy, targeting, hooks and follow-up ideas. Keep it focused; build the full campaign in the workspace.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-3 md:p-4">
            <div className="scrollbar-hide mb-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
              {personas.map((item) => (
                <button key={item} type="button" onClick={() => setPersona(item)} className={item === persona ? "shrink-0 rounded-full bg-[#2dd4ff] px-3 py-2 text-[11px] font-black text-black" : "shrink-0 rounded-full bg-white/10 px-3 py-2 text-[11px] font-bold text-white/70"}>{item}</button>
              ))}
            </div>
            <form onSubmit={submit} className="space-y-3">
              <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-20 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none" />
              <div className="grid grid-cols-4 gap-2">
                {prompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => setQuestion(prompt)} className="rounded-full bg-white/10 px-3 py-2 text-[11px] font-bold text-white/70">{prompt}</button>
                ))}
              </div>
              <button className="w-full rounded-2xl px-5 py-3 text-sm font-black text-white neon-button">{loading ? "Thinking..." : "Ask AI"}</button>
            </form>
            <div className="mt-3 max-h-28 overflow-y-auto rounded-2xl bg-white/95 p-3 text-xs leading-5 text-slate-900 md:text-sm">{answer}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

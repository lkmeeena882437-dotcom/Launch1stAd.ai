"use client";

import { FormEvent, useState } from "react";

const personas = [
  "Meta Ads Expert",
  "Google Search Planner",
  "Landing Page Hook Creator",
  "WhatsApp Leads Specialist",
  "Email Marketing Specialist",
  "Telegram Growth Planner"
];

const prompts = [
  "Build plan",
  "Targeting",
  "Ad copy",
  "Keywords"
];

export function IdeaBox() {
  const [persona, setPersona] = useState(personas[0]);
  const [question, setQuestion] = useState("Build a campaign plan for my business");
  const [answer, setAnswer] = useState("Select an expert, enter the offer, and generate a focused launch direction.");
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
      setAnswer(data.answer || "Add business, offer, audience and budget for better guidance.");
    } catch {
      setAnswer("Define the offer, select one audience, write a direct CTA, and prepare follow-up replies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-5 md:py-14">
      <div className="premium-ring rounded-[1.5rem] bg-dark p-4 text-canvas md:rounded-[2rem] md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 md:px-4 md:py-2 md:text-xs">AI campaign assistant</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white md:mt-4 md:text-5xl">Choose an expert. Get a focused answer.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-white/60 md:mt-3 md:text-sm md:leading-6">Strategy, targeting, creative, keywords and lead follow-up ideas.</p>
        </div>

        <div className="ai-mobile-panel mx-auto mt-4 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur md:mt-6 md:rounded-3xl md:p-5">
          <div className="scrollbar-hide mb-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {personas.map((item) => (
              <button key={item} type="button" onClick={() => setPersona(item)} className={item === persona ? "shrink-0 rounded-full bg-coral px-3 py-2 text-[11px] font-bold text-white" : "shrink-0 rounded-full bg-white/10 px-3 py-2 text-[11px] font-semibold text-white/70"}>{item}</button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-2 md:space-y-3">
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-16 w-full rounded-xl border border-white/10 bg-white p-3 text-sm text-ink outline-none md:min-h-24 md:rounded-2xl md:p-4" />
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setQuestion(prompt)} className="rounded-full bg-white/10 px-3 py-2 text-[11px] font-semibold text-white/70">{prompt}</button>
              ))}
            </div>
            <button className="w-full rounded-xl bg-coral px-5 py-2.5 text-sm font-bold text-white md:py-3">{loading ? "Thinking..." : "Ask AI"}</button>
          </form>
          <div className="mt-3 max-h-28 overflow-y-auto whitespace-pre-line rounded-xl bg-white p-3 text-xs leading-5 text-ink md:mt-4 md:max-h-80 md:rounded-2xl md:p-4 md:text-sm md:leading-6">{answer}</div>
        </div>
      </div>
    </section>
  );
}

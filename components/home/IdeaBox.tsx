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
  "Build a campaign plan",
  "Suggest targeting",
  "Write ad copy",
  "Find search keywords"
];

export function IdeaBox() {
  const [persona, setPersona] = useState(personas[0]);
  const [question, setQuestion] = useState("Build a campaign plan for my business");
  const [answer, setAnswer] = useState("Select a persona, describe the business, and get a concise launch direction.");
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
      setAnswer("Recommended: define the offer, choose one audience, write a direct CTA, and prepare follow-up replies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 md:py-14">
      <div className="premium-ring rounded-[2rem] bg-dark p-5 text-canvas md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">AI campaign assistant</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">Choose an expert. Get a focused answer.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60">Strategy, targeting, creative, keywords, landing hooks and lead follow-up ideas.</p>
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur md:p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {personas.map((item) => (
              <button key={item} type="button" onClick={() => setPersona(item)} className={item === persona ? "rounded-full bg-coral px-3 py-2 text-xs font-bold text-white" : "rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/70"}>{item}</button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-3">
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-24 w-full rounded-2xl border border-white/10 bg-white p-4 text-sm text-ink outline-none" />
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setQuestion(prompt)} className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/70">{prompt}</button>
              ))}
            </div>
            <button className="w-full rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">{loading ? "Thinking..." : "Ask AI"}</button>
          </form>
          <div className="mt-4 max-h-80 overflow-y-auto whitespace-pre-line rounded-2xl bg-white p-4 text-sm leading-6 text-ink">{answer}</div>
        </div>
      </div>
    </section>
  );
}

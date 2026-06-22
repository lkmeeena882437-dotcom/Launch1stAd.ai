"use client";

import { FormEvent, useState } from "react";

const prompts = [
  "Build a campaign plan for my business",
  "Suggest the best audience for Meta ads",
  "Write WhatsApp lead ad copy",
  "Suggest Google search keywords"
];

export function IdeaBox() {
  const [question, setQuestion] = useState("Build a campaign plan for my business");
  const [answer, setAnswer] = useState("Describe your business, offer, target location and budget. The assistant will suggest an ad angle, audience, creative direction and next launch step.");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/idea-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setAnswer(data.answer || "Try a clear business question.");
    } catch {
      setAnswer("Recommended next step: define the offer, choose one primary audience, write a direct CTA and prepare WhatsApp follow-up replies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-20">
      <div className="premium-ring rounded-[2rem] bg-dark p-5 text-canvas md:p-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">AI campaign assistant</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">Get campaign guidance before you spend.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/60">Ask for strategy, targeting, copy, keywords, budget direction or a campaign review.</p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur md:p-6">
          <form onSubmit={submit} className="space-y-4">
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-36 w-full rounded-2xl border border-white/10 bg-white p-4 text-base text-ink outline-none" />
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setQuestion(prompt)} className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/70">{prompt}</button>
              ))}
            </div>
            <button className="w-full rounded-xl bg-coral px-5 py-4 text-sm font-bold text-white">{loading ? "Thinking..." : "Ask AI"}</button>
          </form>
          <div className="mt-5 whitespace-pre-line rounded-2xl bg-white p-5 text-sm leading-7 text-ink">{answer}</div>
        </div>
      </div>
    </section>
  );
}

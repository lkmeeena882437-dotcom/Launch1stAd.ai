"use client";

import { FormEvent, useState } from "react";

export function IdeaBox() {
  const [question, setQuestion] = useState("Mere business ke liye ad idea do");
  const [answer, setAnswer] = useState("Business, product ya offer likho. Yahan se quick marketing idea milega.");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/idea-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    setAnswer(data.answer || "Try a simple business question.");
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <div className="grid overflow-hidden rounded-3xl bg-dark text-canvas md:grid-cols-2">
        <div className="p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">AI idea box</p>
          <h2 className="serif-display mt-3 text-4xl md:text-5xl">Ask, then launch smarter.</h2>
          <p className="mt-4 leading-7 text-white/60">Ad idea, offer angle, caption, audience ya WhatsApp follow-up ke liye quick help lo.</p>
        </div>
        <div className="bg-darkElevated p-5 md:p-8">
          <form onSubmit={submit} className="space-y-4">
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-28 w-full rounded-2xl border border-white/10 bg-dark p-4 text-base text-white outline-none" />
            <button className="w-full rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white">{loading ? "Thinking..." : "Get idea"}</button>
          </form>
          <div className="mt-5 whitespace-pre-line rounded-2xl bg-dark p-4 text-sm leading-7 text-white/70">{answer}</div>
        </div>
      </div>
    </section>
  );
}

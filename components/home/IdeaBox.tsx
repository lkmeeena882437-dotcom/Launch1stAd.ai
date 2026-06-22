"use client";

import { FormEvent, useState } from "react";

const prompts = [
  "Mere business ke liye low budget ad plan do",
  "Instagram aur Facebook ke liye best audience batao",
  "WhatsApp leads ke liye ad copy do",
  "Google search keywords suggest karo"
];

export function IdeaBox() {
  const [question, setQuestion] = useState("Mere business ke liye ad idea do");
  const [answer, setAnswer] = useState("Business, product, offer ya promotion link likho. Main ad angle, platform, audience, copy aur next step suggest karunga.");
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
      setAnswer(data.answer || "Try a simple business question.");
    } catch {
      setAnswer("Quick idea: clear offer, simple audience, strong CTA aur WhatsApp follow-up ready rakho.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-20">
      <div className="premium-ring rounded-[2rem] bg-dark p-5 text-canvas md:p-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">AI campaign chat</p>
          <h2 className="serif-display mt-4 text-4xl md:text-6xl">Ask before you spend a rupee.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/60">Business idea, audience, platform, budget, copy, WhatsApp script, Google keywords ya campaign review — yahan se quick answer lo.</p>
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

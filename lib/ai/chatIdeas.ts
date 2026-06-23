const fallbackIdeas = [
  "Offer: one clear promise + price/benefit.",
  "Audience: choose one primary segment first.",
  "Creative: test hook, proof and CTA variants.",
  "Follow-up: prepare WhatsApp or lead-form replies."
];

export function fallbackChatAnswer(question: string) {
  const clean = question.trim();
  if (!clean) return "Ask for strategy, targeting, copy, keywords or lead follow-up guidance.";

  return [
    `Focus: ${clean}`,
    "",
    ...fallbackIdeas.map((idea, index) => `${index + 1}. ${idea}`),
    "",
    "Next: create a campaign package and review targeting before launch."
  ].join("\n");
}

export async function answerMarketingQuestion(question: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallbackChatAnswer(question);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: `You are Launch1stAd.ai, a concise advertising strategy assistant. Give premium, practical output in short sections. No guaranteed results. Include compliance caution for finance or investment categories. User question: ${question}` }]
        }]
      })
    });

    if (!response.ok) return fallbackChatAnswer(question);
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || fallbackChatAnswer(question);
  } catch {
    return fallbackChatAnswer(question);
  }
}

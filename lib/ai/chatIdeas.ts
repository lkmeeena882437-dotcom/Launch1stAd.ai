const fallbackIdeas = [
  "Use a clear offer: product + price range + one strong reason to contact now.",
  "Create 3 ad angles: problem-solution, offer/discount, and social proof.",
  "For WhatsApp leads, ask one simple question first: budget, location, or product choice.",
  "Keep the first line short. Example: Need more local customers this week?",
  "Test one reel, one static image, and one direct offer creative before increasing budget."
];

export function fallbackChatAnswer(question: string) {
  const clean = question.trim();
  if (!clean) return "Ask about ad creative, offer, campaign idea, WhatsApp script, or targeting.";

  return [
    `Idea for: ${clean}`,
    "",
    ...fallbackIdeas.map((idea, index) => `${index + 1}. ${idea}`),
    "",
    "Simple next step: turn this into one campaign report from Campaign Builder."
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
          parts: [{ text: `You are Launch1stAd.ai, a practical ad strategy assistant for Indian businesses. Answer simply in Hinglish/English. Give concise, useful ideas. No guaranteed results. User question: ${question}` }]
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

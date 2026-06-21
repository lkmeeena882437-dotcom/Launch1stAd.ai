import { buildCampaign, type CampaignInput } from "@/lib/campaign";
import { buildCampaignPrompt } from "./prompt";
import { parseJsonBlock } from "./parse";

type CampaignOutput = ReturnType<typeof buildCampaign>;

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function generateCampaignWithAI(input: CampaignInput): Promise<{ campaign: CampaignOutput; source: "ai" | "fallback" }> {
  const fallback = buildCampaign(input);
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return { campaign: fallback, source: "fallback" };
  }

  try {
    const prompt = buildCampaignPrompt(input);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      return { campaign: fallback, source: "fallback" };
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const parsed = parseJsonBlock<CampaignOutput>(text);

    if (!parsed) {
      return { campaign: fallback, source: "fallback" };
    }

    return { campaign: parsed, source: "ai" };
  } catch {
    return { campaign: fallback, source: "fallback" };
  }
}

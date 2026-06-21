import type { CampaignInput } from "@/lib/campaign";

export function buildCampaignPrompt(input: CampaignInput) {
  return `You are Launch1stAd.ai, an AI marketing strategist for Indian businesses.

Create a ready-to-launch campaign pack. Keep the advice practical, safe and conversion-focused. Do not promise guaranteed leads, sales or income.

Business details:
- Business name: ${input.businessName || "Not provided"}
- Category: ${input.category}
- Product or service: ${input.product || "Not provided"}
- Price range: ${input.priceRange || "Not provided"}
- Location: ${input.location || "India"}
- Daily budget: ${input.budget || "Not provided"}
- Goal: ${input.goal}
- Language: ${input.language}

Return only valid JSON with this shape:
{
  "summary": "short strategy summary",
  "meta": {
    "objective": "campaign objective",
    "audience": "target audience",
    "adSets": ["ad set 1", "ad set 2", "ad set 3"],
    "creatives": ["creative idea 1", "creative idea 2", "creative idea 3"]
  },
  "google": {
    "campaignType": "campaign type",
    "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
    "extensions": ["extension 1", "extension 2", "extension 3"]
  },
  "copy": {
    "headline": "ad headline",
    "primaryText": "ad primary text",
    "cta": "CTA"
  },
  "whatsapp": ["message 1", "message 2", "message 3"],
  "sevenDayPlan": ["day 1", "day 2", "day 3", "day 4", "day 5"]
}`;
}

export type CampaignInput = {
  businessName: string;
  category: string;
  product: string;
  priceRange: string;
  location: string;
  budget: string;
  goal: "Sales" | "Leads" | "WhatsApp" | "Traffic";
  language: "Hindi" | "English" | "Hinglish";
};

const categoryAngles: Record<string, string[]> = {
  Clothing: ["New arrivals", "Under-budget fashion", "Style transformation", "Limited stock"],
  Coaching: ["Result proof", "Demo class", "Parent trust", "Limited seats"],
  Clinic: ["Trust and care", "Appointment booking", "Doctor expertise", "Local convenience"],
  RealEstate: ["Site visit", "Location advantage", "Limited inventory", "Easy finance"],
  Restaurant: ["Taste craving", "Combo offer", "Family outing", "Fast delivery"],
  Default: ["Clear offer", "Trust proof", "Fast action", "WhatsApp enquiry"]
};

function anglesFor(category: string) {
  const key = category.replace(/\s/g, "");
  return categoryAngles[key] ?? categoryAngles.Default;
}

export function buildCampaign(input: CampaignInput) {
  const angles = anglesFor(input.category);
  const dailyBudget = input.budget || "₹500/day";
  const platformFocus =
    input.goal === "Traffic"
      ? "Google Search + Meta traffic retargeting"
      : input.goal === "WhatsApp"
      ? "Meta Click-to-WhatsApp + retargeting"
      : input.goal === "Leads"
      ? "Meta Lead Form + Google Search"
      : "Meta Sales/WhatsApp + Google intent campaign";

  return {
    summary: `${input.businessName || "Your business"} ke liye ${platformFocus} best rahega. Budget ${dailyBudget} se start karo aur pehle 7 din creative + audience test karo.`,
    meta: {
      objective: input.goal === "Sales" ? "Sales / WhatsApp conversions" : input.goal,
      audience: `${input.location || "India"}, interest + broad audience test, buyer intent, ${input.category} related interests`,
      adSets: [
        "Broad audience testing",
        "Interest stack testing",
        "Retargeting: Instagram engagers + website visitors + WhatsApp clickers"
      ],
      creatives: angles.map((angle) => `${angle} reel/static creative for ${input.product}`)
    },
    google: {
      campaignType: input.goal === "Traffic" ? "Search + Performance Max" : "Search intent campaign",
      keywords: [
        `${input.product} near me`,
        `best ${input.category} in ${input.location || "India"}`,
        `${input.product} price`,
        `buy ${input.product} online`
      ],
      extensions: ["Call", "Location", "WhatsApp/contact", "Offer snippet"]
    },
    copy: {
      headline: `${input.product} ke liye ready offer — ${input.businessName || "trusted business"}`,
      primaryText:
        input.language === "English"
          ? `Discover ${input.product} from ${input.businessName || "our brand"}. Clear pricing, fast response and easy booking/order on WhatsApp.`
          : input.language === "Hindi"
          ? `${input.product} ab aasaan tareeke se. Price, details aur booking/order ke liye WhatsApp par message karein.`
          : `${input.product} chahiye? Details, price aur order ke liye WhatsApp par message karo — fast response available.` ,
      cta: input.goal === "WhatsApp" ? "Send WhatsApp" : input.goal === "Sales" ? "Shop Now" : "Get Quote"
    },
    whatsapp: [
      "Namaste, interest ke liye thanks. Aapko kis product/service ki details chahiye?",
      "Aapka budget aur location share kar dijiye, main best option suggest kar deta hoon.",
      "Ye offer limited time ke liye hai. Kya main aapke liye booking/order confirm kar du?"
    ],
    sevenDayPlan: [
      "Day 1-2: 3 creatives test karo, budget equal split.",
      "Day 3: CTR low ho to hook/thumbnail badlo.",
      "Day 4: Best audience ko 60% budget do.",
      "Day 5: WhatsApp follow-up script optimize karo.",
      "Day 6-7: Retargeting campaign launch karo."
    ]
  };
}

export type CampaignInput = {
  businessName: string;
  category: string;
  product: string;
  priceRange: string;
  location: string;
  budget: string;
  goal: "Sales" | "Leads" | "WhatsApp" | "Traffic" | "Views" | "App Installs";
  language: "Hindi" | "English" | "Hinglish";
  promotionType: "Website" | "App" | "Telegram" | "Instagram" | "Facebook" | "WhatsApp" | "YouTube" | "Local Store" | "Landing Page";
  promotionLink: string;
  targetPlatforms: string[];
  audienceType: string;
  ageRange: string;
  gender: "All" | "Men" | "Women";
  interests: string;
  currency: "INR" | "USD";
  totalBudget: string;
  paymentModel: "Auto" | "CPM" | "CPC" | "CPV" | "CPL";
};

const categoryAngles: Record<string, string[]> = {
  Clothing: ["New arrivals", "Under-budget fashion", "Style transformation", "Limited stock"],
  Coaching: ["Result proof", "Demo class", "Parent trust", "Limited seats"],
  Clinic: ["Trust and care", "Appointment booking", "Doctor expertise", "Local convenience"],
  RealEstate: ["Site visit", "Location advantage", "Limited inventory", "Easy finance"],
  Restaurant: ["Taste craving", "Combo offer", "Family outing", "Fast delivery"],
  LocalStore: ["Nearby store offer", "Local trust", "Walk-in visit", "WhatsApp enquiry"],
  Ecommerce: ["Best seller", "Limited offer", "Fast delivery", "Retargeting deal"],
  Agency: ["Client growth", "Lead generation", "Done-for-you service", "Case-study style proof"],
  SalonBeauty: ["Appointment booking", "Before-after proof", "Festive package", "Local repeat visit"],
  GymFitness: ["Trial pass", "Transformation proof", "Membership offer", "Local fitness community"],
  Jewellery: ["Occasion offer", "Premium collection", "Wedding collection", "Store visit"],
  MobileElectronics: ["Latest model", "Exchange offer", "Price comparison", "Local service"],
  TravelHotel: ["Weekend package", "Booking offer", "Location experience", "Family trip"],
  EventWedding: ["Portfolio proof", "Package offer", "Booking enquiry", "Trust and experience"],
  InteriorFurniture: ["Home makeover", "Catalogue preview", "Premium finish", "Site visit"],
  AutoVehicle: ["Test drive", "Service reminder", "Exchange offer", "Finance option"],
  GroceryFMCG: ["Daily essentials", "Monthly basket", "Delivery offer", "Repeat order"],
  EducationCourse: ["Skill outcome", "Demo class", "Certificate value", "Limited batch"],
  B2BServices: ["Business growth", "Cost saving", "Consultation offer", "Quote request"],
  CreatorInfluencer: ["Follower growth", "Video hook", "Community join", "Collab enquiry"],
  TelegramChannel: ["Community join", "Daily value", "Exclusive updates", "Social proof"],
  AppSaaS: ["Free trial", "Feature benefit", "Use-case demo", "Install now"],
  Default: ["Clear offer", "Trust proof", "Fast action", "WhatsApp enquiry"]
};

function anglesFor(category: string) {
  const key = category.replace(/[^A-Za-z0-9]/g, "");
  return categoryAngles[key] ?? categoryAngles.Default;
}

function defaultPlatforms(input: CampaignInput) {
  if (input.targetPlatforms?.length) return input.targetPlatforms;
  if (input.promotionType === "Telegram") return ["Telegram", "Instagram"];
  if (input.promotionType === "App") return ["Google Display", "YouTube", "In-app ads"];
  if (input.promotionType === "YouTube") return ["YouTube", "Google Display"];
  if (input.goal === "WhatsApp") return ["Instagram", "Facebook"];
  if (input.goal === "Traffic") return ["Google Search", "Instagram", "Facebook"];
  return ["Instagram", "Facebook", "Google Search"];
}

function paymentNote(model: CampaignInput["paymentModel"], goal: CampaignInput["goal"]) {
  if (model !== "Auto") return `${model} model selected. Use it as planning guidance; final billing depends on each ad platform auction.`;
  if (goal === "Views") return "Recommended model: CPV/CPM for video view campaigns.";
  if (goal === "Traffic") return "Recommended model: CPC optimization with CPM auction monitoring.";
  if (goal === "Leads" || goal === "WhatsApp") return "Recommended model: optimize for CPL, while platforms may charge through CPM/CPC auction.";
  if (goal === "App Installs") return "Recommended model: CPI/CPA tracking with Google App or in-app ad placements.";
  return "Recommended model: CPM/CPC auction with CPA/ROAS tracking.";
}

function budgetSplit(platforms: string[]) {
  if (platforms.length === 0) return "Start with 70% Meta/Google core platform and 30% testing.";
  const core = platforms.slice(0, 2).join(" + ");
  return `Start with 70% budget on ${core || platforms[0]} and 30% on creative/audience testing.`;
}

export function buildCampaign(input: CampaignInput) {
  const angles = anglesFor(input.category);
  const dailyBudget = input.budget || "₹500/day";
  const totalBudget = input.totalBudget || "Not fixed";
  const platforms = defaultPlatforms(input);
  const destination = `${input.promotionType || "Website"}${input.promotionLink ? `: ${input.promotionLink}` : ""}`;
  const audience = `${input.location || "India"}, ${input.ageRange || "18-45"}, ${input.gender || "All"}, ${input.audienceType || "interested buyers"}`;
  const platformFocus = platforms.join(" + ");

  return {
    summary: `${input.businessName || "Your business"} ke liye ${platformFocus} par ${input.promotionType || "Website"} promotion start karo. Budget ${dailyBudget} se test karo, audience/creative compare karo aur pehle 7 din data read karo.`,
    setup: {
      destination,
      platforms,
      audience,
      interests: input.interests || `${input.category} buyers, local intent, competitor interests, engaged shoppers`,
      budget: `${input.currency || "INR"} | Daily: ${dailyBudget} | Total: ${totalBudget}`,
      paymentModel: input.paymentModel || "Auto",
      paymentNote: paymentNote(input.paymentModel || "Auto", input.goal),
      budgetSplit: budgetSplit(platforms),
      placements: platforms.map((platform) => `${platform}: feed/reels/search/display placements as relevant`)
    },
    meta: {
      objective: input.goal === "Sales" ? "Sales / WhatsApp conversions" : input.goal,
      audience: `${audience}, interests: ${input.interests || `${input.category} related interests`}`,
      adSets: [
        "Broad audience testing",
        "Interest stack testing",
        "Retargeting: social engagers + website visitors + WhatsApp clickers"
      ],
      creatives: angles.map((angle) => `${angle} reel/static creative for ${input.product}`)
    },
    google: {
      campaignType: input.goal === "Traffic" ? "Search + Performance Max" : input.goal === "Views" ? "YouTube video campaign" : "Search intent campaign",
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
          ? `Discover ${input.product} from ${input.businessName || "our brand"}. Clear pricing, fast response and easy booking/order.`
          : input.language === "Hindi"
          ? `${input.product} ab aasaan tareeke se. Price, details aur booking/order ke liye message karein.`
          : `${input.product} chahiye? Details, price aur order ke liye message karo — fast response available.` ,
      cta: input.goal === "WhatsApp" ? "Send WhatsApp" : input.goal === "Sales" ? "Shop Now" : input.goal === "Views" ? "Watch Now" : "Get Quote"
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
      "Day 5: WhatsApp/follow-up script optimize karo.",
      "Day 6-7: Retargeting campaign launch karo."
    ]
  };
}

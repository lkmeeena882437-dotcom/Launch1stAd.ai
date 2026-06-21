import type { CampaignInput } from "@/lib/campaign";

export const categories = ["Clothing", "Coaching", "Clinic", "Real Estate", "Restaurant", "Local Store", "Ecommerce", "Agency"];
export const goals: CampaignInput["goal"][] = ["Sales", "Leads", "WhatsApp", "Traffic", "Views", "App Installs"];
export const languages: CampaignInput["language"][] = ["Hinglish", "Hindi", "English"];
export const promotionTypes: CampaignInput["promotionType"][] = ["Website", "App", "Telegram", "Instagram", "Facebook", "WhatsApp", "YouTube", "Local Store", "Landing Page"];
export const adPlatforms = ["Instagram", "Facebook", "Google Search", "YouTube", "Google Display", "Telegram", "In-app ads"];
export const currencies: CampaignInput["currency"][] = ["INR", "USD"];
export const paymentModels: CampaignInput["paymentModel"][] = ["Auto", "CPM", "CPC", "CPV", "CPL"];
export const genders: CampaignInput["gender"][] = ["All", "Men", "Women"];

import type { CampaignInput } from "./campaign";

export const savedBusinessKey = "launch1stad.savedBusiness";

export type SavedBusiness = {
  businessName: string;
  category: string;
  product: string;
  priceRange: string;
  location: string;
  targetCustomer: string;
  whatsapp: string;
  website: string;
  tone: string;
};

export const defaultSavedBusiness: SavedBusiness = {
  businessName: "",
  category: "Clothing",
  product: "",
  priceRange: "",
  location: "India",
  targetCustomer: "",
  whatsapp: "",
  website: "",
  tone: "Local Hindi"
};

export function savedBusinessToCampaign(saved: SavedBusiness): Partial<CampaignInput> {
  return {
    businessName: saved.businessName,
    category: saved.category,
    product: saved.product,
    priceRange: saved.priceRange,
    location: saved.location,
    language: saved.tone === "Premium" ? "English" : "Hinglish"
  };
}

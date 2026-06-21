import { getCurrentUser } from "@/lib/auth/user";
import type { SavedBusiness } from "@/lib/saved";
import { supabaseRest } from "@/lib/supabase/rest";

type BusinessRow = {
  id?: string;
  business_name: string;
  category: string;
  product: string;
  price_range: string;
  location: string;
  target_customer: string;
  whatsapp: string;
  website: string;
  tone: string;
};

function toRow(profile: SavedBusiness, userId: string): BusinessRow & { user_id: string } {
  return {
    user_id: userId,
    business_name: profile.businessName,
    category: profile.category,
    product: profile.product,
    price_range: profile.priceRange,
    location: profile.location,
    target_customer: profile.targetCustomer,
    whatsapp: profile.whatsapp,
    website: profile.website,
    tone: profile.tone
  };
}

export function fromBusinessRow(row: BusinessRow): SavedBusiness {
  return {
    businessName: row.business_name,
    category: row.category,
    product: row.product,
    priceRange: row.price_range,
    location: row.location,
    targetCustomer: row.target_customer,
    whatsapp: row.whatsapp,
    website: row.website,
    tone: row.tone
  };
}

export async function saveBusinessProfileToCloud(profile: SavedBusiness) {
  try {
    const user = getCurrentUser();
    if (!user) return { ok: false, reason: "not_logged_in" as const };

    const response = await supabaseRest("business_profiles", {
      method: "POST",
      body: JSON.stringify(toRow(profile, user.id))
    });

    return { ok: response.ok, reason: response.ok ? "saved" as const : "failed" as const };
  } catch {
    return { ok: false, reason: "not_configured" as const };
  }
}

export async function getLatestBusinessProfileFromCloud() {
  try {
    const user = getCurrentUser();
    if (!user) return null;

    const query = `business_profiles?select=*&user_id=eq.${user.id}&order=created_at.desc&limit=1`;
    const response = await supabaseRest(query);
    if (!response.ok) return null;
    const rows = (await response.json()) as BusinessRow[];
    return rows[0] ? fromBusinessRow(rows[0]) : null;
  } catch {
    return null;
  }
}

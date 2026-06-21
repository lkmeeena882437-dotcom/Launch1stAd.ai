import { getAuthSession } from "@/lib/auth/session";
import { getSupabaseConfig } from "./config";

export async function supabaseRest(path: string, init: RequestInit = {}) {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured || !url || !anonKey) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const session = typeof window !== "undefined" ? getAuthSession() : null;
  const bearer = session?.accessToken ?? anonKey;

  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers ?? {})
    }
  });
}

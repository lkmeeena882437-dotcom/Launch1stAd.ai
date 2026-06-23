import { getSupabaseConfig } from "@/lib/supabase/config";

export async function sendMagicLink(email: string) {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured || !url || !anonKey) {
    throw new Error("Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.");
  }

  const redirectTo = `${window.location.origin}/session`;

  const response = await fetch(`${url}/auth/v1/otp`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      create_user: true,
      options: { email_redirect_to: redirectTo }
    })
  });

  if (!response.ok) {
    let details = "";
    try {
      const error = await response.json();
      details = error?.msg || error?.message || "";
    } catch {
      details = "";
    }
    throw new Error(details || "Magic link failed. Enable Supabase Email provider and add the site URL plus /session redirect URL.");
  }

  return true;
}

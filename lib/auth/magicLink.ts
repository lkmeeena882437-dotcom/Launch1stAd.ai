import { getSupabaseConfig } from "@/lib/supabase/config";

export async function sendMagicLink(email: string) {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured || !url || !anonKey) {
    throw new Error("Supabase env variables missing.");
  }

  const redirectTo = `${window.location.origin}/auth/callback`;

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
    throw new Error("Login link send nahi ho paya. Supabase settings check karo.");
  }

  return true;
}

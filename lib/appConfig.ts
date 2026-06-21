export function getAppConfig() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const geminiKey = process.env.GEMINI_API_KEY || "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const growthLink = process.env.NEXT_PUBLIC_GROWTH_LINK || "";
  const teamLink = process.env.NEXT_PUBLIC_TEAM_LINK || "";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";

  return {
    appUrl,
    aiReady: Boolean(geminiKey),
    supabaseReady: Boolean(supabaseUrl && supabaseAnonKey),
    growthLinkReady: Boolean(growthLink),
    teamLinkReady: Boolean(teamLink),
    whatsappReady: Boolean(whatsapp),
    supportEmailReady: Boolean(supportEmail),
    growthLink,
    teamLink,
    whatsapp,
    supportEmail
  };
}

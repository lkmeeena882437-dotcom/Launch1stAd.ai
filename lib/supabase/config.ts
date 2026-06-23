function normalizeSupabaseUrl(value?: string) {
  if (!value) return undefined;
  let url = value.trim();
  if (!url) return undefined;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }
  url = url.replace(/\/+$/, "");
  url = url.replace(/\/auth\/v1$/, "");
  url = url.replace(/\/rest\/v1$/, "");
  return url;
}

export function getSupabaseConfig() {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey)
  };
}

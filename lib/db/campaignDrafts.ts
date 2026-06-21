import type { CampaignInput } from "@/lib/campaign";
import { getCurrentUser } from "@/lib/auth/user";
import { supabaseRest } from "@/lib/supabase/rest";

type CampaignOutput = Record<string, unknown>;

export async function saveCampaignDraftToCloud(args: {
  title: string;
  input: CampaignInput;
  output: CampaignOutput;
  summary: string;
  source: string;
}) {
  const user = getCurrentUser();
  if (!user) return { ok: false, reason: "not_logged_in" as const };

  const response = await supabaseRest("campaign_drafts", {
    method: "POST",
    body: JSON.stringify({
      user_id: user.id,
      title: args.title,
      input: args.input,
      output: args.output,
      summary: args.summary,
      source: args.source
    })
  });

  return { ok: response.ok, reason: response.ok ? "saved" as const : "failed" as const };
}

export async function getCampaignDraftsFromCloud() {
  const user = getCurrentUser();
  if (!user) return [];

  const query = `campaign_drafts?select=*&user_id=eq.${user.id}&order=created_at.desc&limit=20`;
  const response = await supabaseRest(query);
  if (!response.ok) return [];
  return response.json();
}

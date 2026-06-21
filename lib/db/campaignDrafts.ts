import { getCurrentUser } from "@/lib/auth/user";
import type { CampaignInput } from "@/lib/campaign";
import type { SavedCampaign } from "@/lib/history";
import { supabaseRest } from "@/lib/supabase/rest";

type CampaignOutput = Record<string, unknown>;

type CampaignDraftRow = {
  id: string;
  title: string;
  input: CampaignInput;
  output: CampaignOutput;
  summary: string;
  source: string;
  created_at: string;
  client_id?: string;
  client_name?: string;
};

export async function saveCampaignDraftToCloud(args: {
  title: string;
  input: CampaignInput;
  output: CampaignOutput;
  summary: string;
  source: string;
  clientId?: string;
  clientName?: string;
}) {
  try {
    const user = getCurrentUser();
    if (!user) return { ok: false, reason: "offline" as const };

    const response = await supabaseRest("campaign_drafts", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        title: args.title,
        input: args.input,
        output: args.output,
        summary: args.summary,
        source: args.source,
        client_id: args.clientId ?? "",
        client_name: args.clientName ?? ""
      })
    });

    return { ok: response.ok, reason: response.ok ? "saved" as const : "offline" as const };
  } catch {
    return { ok: false, reason: "offline" as const };
  }
}

export function draftRowToSavedCampaign(row: CampaignDraftRow): SavedCampaign {
  return {
    id: row.id,
    title: row.title,
    createdAt: row.created_at,
    input: row.input,
    summary: row.summary,
    clientId: row.client_id,
    clientName: row.client_name
  };
}

export async function getCampaignDraftsFromCloud(): Promise<SavedCampaign[]> {
  try {
    const user = getCurrentUser();
    if (!user) return [];

    const query = `campaign_drafts?select=*&user_id=eq.${user.id}&order=created_at.desc&limit=20`;
    const response = await supabaseRest(query);
    if (!response.ok) return [];
    const rows = (await response.json()) as CampaignDraftRow[];
    return rows.map(draftRowToSavedCampaign);
  } catch {
    return [];
  }
}

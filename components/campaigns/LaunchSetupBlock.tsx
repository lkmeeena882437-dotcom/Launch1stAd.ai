import type { buildCampaign } from "@/lib/campaign";
import { ReportBlock } from "./ReportBlock";

type Campaign = ReturnType<typeof buildCampaign>;

export function LaunchSetupBlock({ campaign }: { campaign: Campaign }) {
  const setup = campaign.setup;
  const platforms = setup?.platforms?.length ? setup.platforms : ["Instagram", "Facebook", "Google Search"];

  return (
    <>
      <ReportBlock title="Manual Launch Setup">{`Platforms: ${platforms.join(", ")}\nMarket group: ${setup?.audience || campaign.meta.audience}\nBudget: ${setup?.budget || "Start small and test"}\nSplit: ${setup?.budgetSplit || "Core platform plus testing"}\nBilling guide: ${setup?.paymentModel || "Auto"}\nFirst review: Check after 72 hours and keep the better creative active.`}</ReportBlock>
      <ReportBlock title="Meta Setup">{`Objective: ${campaign.meta.objective}\nPlacement: Feed, Reels, Stories, WhatsApp click where useful\nMarket group: ${campaign.meta.audience}\nAd sets: ${campaign.meta.adSets.join(" | ")}\nCreative ideas: ${campaign.meta.creatives.join(" | ")}\nCTA: ${campaign.copy.cta}`}</ReportBlock>
      <ReportBlock title="Google Setup">{`Campaign type: ${campaign.google.campaignType}\nKeywords: ${campaign.google.keywords.join(", ")}\nExtensions: ${campaign.google.extensions.join(", ")}\nDestination: ${setup?.destination || "Selected promotion link"}\nStart with intent keywords, then test wider keywords later.`}</ReportBlock>
    </>
  );
}

import type { buildCampaign } from "@/lib/campaign";
import { ReportBlock } from "./ReportBlock";

type Campaign = ReturnType<typeof buildCampaign>;

export function ReportSections({ campaign }: { campaign: Campaign }) {
  return (
    <>
      <ReportBlock title="Strategy Summary">{campaign.summary}</ReportBlock>
      <ReportBlock title="Campaign Setup">{`Destination: ${campaign.setup.destination}\nPlatforms: ${campaign.setup.platforms.join(", ")}\nAudience: ${campaign.setup.audience}\nInterests: ${campaign.setup.interests}`}</ReportBlock>
      <ReportBlock title="Budget & Payment">{`Budget: ${campaign.setup.budget}\nPayment model: ${campaign.setup.paymentModel}\nGuidance: ${campaign.setup.paymentNote}\nSplit: ${campaign.setup.budgetSplit}`}</ReportBlock>
      <ReportBlock title="Meta Campaign">{`Objective: ${campaign.meta.objective}\nAudience: ${campaign.meta.audience}\nAd sets: ${campaign.meta.adSets.join(" | ")}`}</ReportBlock>
      <ReportBlock title="Google Campaign">{`Type: ${campaign.google.campaignType}\nKeywords: ${campaign.google.keywords.join(", ")}\nExtensions: ${campaign.google.extensions.join(", ")}`}</ReportBlock>
      <ReportBlock title="Ad Copy">{`Headline: ${campaign.copy.headline}\nPrimary text: ${campaign.copy.primaryText}\nCTA: ${campaign.copy.cta}`}</ReportBlock>
      <ReportBlock title="WhatsApp Lead Script">{campaign.whatsapp.join("\n")}</ReportBlock>
      <ReportBlock title="7-Day Optimization Plan">{campaign.sevenDayPlan.join("\n")}</ReportBlock>
    </>
  );
}

import type { buildCampaign } from "@/lib/campaign";
import { ReportBlock } from "./ReportBlock";

type Campaign = ReturnType<typeof buildCampaign>;

export function ReportSections({ campaign }: { campaign: Campaign }) {
  const setup = campaign.setup;

  return (
    <>
      <ReportBlock title="Strategy Summary">{campaign.summary}</ReportBlock>
      <ReportBlock title="Launch Setup">{`Destination: ${setup?.destination || "Selected destination"}\nPlatforms: ${(setup?.platforms || []).join(", ") || "Recommended platforms"}\nMarket: ${setup?.audience || "Relevant market group"}\nKeywords: ${setup?.interests || "Category intent and search keywords"}`}</ReportBlock>
      <ReportBlock title="Budget Guide">{`Budget: ${setup?.budget || "Use selected budget"}\nModel: ${setup?.paymentModel || "Auto"}\nNote: ${setup?.paymentNote || "Final billing depends on ad platform auction."}\nSplit: ${setup?.budgetSplit || "Start with core platform and keep testing budget."}`}</ReportBlock>
      <ReportBlock title="Meta Campaign">{`Objective: ${campaign.meta.objective}\nMarket: ${campaign.meta.audience}\nAd sets: ${campaign.meta.adSets.join(" | ")}`}</ReportBlock>
      <ReportBlock title="Google Campaign">{`Type: ${campaign.google.campaignType}\nKeywords: ${campaign.google.keywords.join(", ")}\nExtensions: ${campaign.google.extensions.join(", ")}`}</ReportBlock>
      <ReportBlock title="Ad Copy">{`Headline: ${campaign.copy.headline}\nPrimary text: ${campaign.copy.primaryText}\nCTA: ${campaign.copy.cta}`}</ReportBlock>
      <ReportBlock title="WhatsApp Lead Script">{campaign.whatsapp.join("\n")}</ReportBlock>
      <ReportBlock title="7-Day Optimization Plan">{campaign.sevenDayPlan.join("\n")}</ReportBlock>
    </>
  );
}

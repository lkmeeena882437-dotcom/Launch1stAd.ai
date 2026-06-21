import { PrintExportButton } from "@/components/actions/PrintExportButton";
import { ResultCard } from "./ResultCard";
import type { buildCampaign } from "@/lib/campaign";

type Campaign = ReturnType<typeof buildCampaign>;

export function ResultPanel({ campaign, generated }: { campaign: Campaign; generated: boolean }) {
  return (
    <section className="rounded-2xl bg-dark p-6 text-canvas md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">AI Output</p>
          <h2 className="text-2xl font-semibold">Ready-to-launch campaign pack</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-success/20 px-3 py-1 text-xs text-success">{generated ? "Generated" : "Preview"}</span>
          <PrintExportButton />
        </div>
      </div>
      <div className="mt-7 space-y-5">
        <ResultCard title="Strategy Summary" body={campaign.summary} />
        <ResultCard title="Campaign Setup" body={`Destination: ${campaign.setup.destination}\nPlatforms: ${campaign.setup.platforms.join(", ")}\nAudience: ${campaign.setup.audience}\nInterests: ${campaign.setup.interests}`} />
        <ResultCard title="Budget & Payment" body={`Budget: ${campaign.setup.budget}\nPayment model: ${campaign.setup.paymentModel}\nGuidance: ${campaign.setup.paymentNote}\nSplit: ${campaign.setup.budgetSplit}`} />
        <ResultCard title="Meta Campaign" body={`Objective: ${campaign.meta.objective}\nAudience: ${campaign.meta.audience}\nAd sets: ${campaign.meta.adSets.join(" | ")}`} />
        <ResultCard title="Google Campaign" body={`Type: ${campaign.google.campaignType}\nKeywords: ${campaign.google.keywords.join(", ")}\nExtensions: ${campaign.google.extensions.join(", ")}`} />
        <ResultCard title="Ad Copy" body={`Headline: ${campaign.copy.headline}\nPrimary text: ${campaign.copy.primaryText}\nCTA: ${campaign.copy.cta}`} />
        <ResultCard title="WhatsApp Lead Script" body={campaign.whatsapp.join("\n")} />
        <ResultCard title="7-Day Optimization Plan" body={campaign.sevenDayPlan.join("\n")} />
      </div>
    </section>
  );
}

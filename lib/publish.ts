import type { CampaignInput } from "./campaign";

export type PublishMode = "draft_ready" | "needs_connection" | "submitted";

export type PublishPlan = {
  mode: PublishMode;
  message: string;
  platformSteps: string[];
};

export function buildPublishPlan(input: CampaignInput): PublishPlan {
  const platforms = input.targetPlatforms?.length ? input.targetPlatforms : ["Instagram", "Facebook", "Google Search"];
  return {
    mode: "needs_connection",
    message: "Campaign data ready hai. Platform connection enable hote hi same payload se campaign publish kiya ja sakta hai.",
    platformSteps: platforms.map((platform) => `${platform}: ${input.goal} objective, ${input.budget || "small daily budget"}, ${input.promotionLink || "selected link"}`)
  };
}

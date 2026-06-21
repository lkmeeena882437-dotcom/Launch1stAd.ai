export type MetricsInput = {
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
  sales: number;
  revenue: number;
};

export function calculateMetrics(input: MetricsInput) {
  const ctr = input.impressions > 0 ? (input.clicks / input.impressions) * 100 : 0;
  const cpc = input.clicks > 0 ? input.spend / input.clicks : 0;
  const cpl = input.leads > 0 ? input.spend / input.leads : 0;
  const roas = input.spend > 0 ? input.revenue / input.spend : 0;
  const conversionRate = input.clicks > 0 ? (input.leads / input.clicks) * 100 : 0;

  const advice: string[] = [];

  if (ctr < 1) advice.push("CTR low hai. Hook, thumbnail aur first line change karo.");
  if (cpc > 20) advice.push("CPC high hai. Audience broad test karo aur low-quality interests remove karo.");
  if (conversionRate < 5) advice.push("Clicks aa rahe hain par leads kam hain. Offer aur WhatsApp script improve karo.");
  if (roas > 0 && roas < 1.5) advice.push("ROAS weak hai. Retargeting aur high-intent keywords par budget shift karo.");
  if (advice.length === 0) advice.push("Metrics healthy lag rahe hain. Best creative aur audience ko scale karo.");

  return {
    ctr: Number(ctr.toFixed(2)),
    cpc: Number(cpc.toFixed(2)),
    cpl: Number(cpl.toFixed(2)),
    roas: Number(roas.toFixed(2)),
    conversionRate: Number(conversionRate.toFixed(2)),
    advice
  };
}

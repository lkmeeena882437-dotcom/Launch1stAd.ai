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

  if (ctr < 1) advice.push("CTR is low. Refresh the hook, creative thumbnail and opening line.");
  if (cpc > 20) advice.push("CPC is high. Test a broader audience and remove low-quality interests.");
  if (conversionRate < 5) advice.push("Clicks are not converting. Strengthen the offer, landing step and follow-up script.");
  if (roas > 0 && roas < 1.5) advice.push("ROAS needs improvement. Shift budget toward retargeting and high-intent keywords.");
  if (advice.length === 0) advice.push("Metrics are healthy. Scale the best-performing creative and audience segment.");

  return {
    ctr: Number(ctr.toFixed(2)),
    cpc: Number(cpc.toFixed(2)),
    cpl: Number(cpl.toFixed(2)),
    roas: Number(roas.toFixed(2)),
    conversionRate: Number(conversionRate.toFixed(2)),
    advice
  };
}

"use client";

import { useMemo, useState } from "react";
import { calculateMetrics, type MetricsInput } from "@/lib/optimizer";
import { MetricInput } from "./MetricInput";

export function OptimizerForm() {
  const [metrics, setMetrics] = useState<MetricsInput>({
    impressions: 10000,
    clicks: 120,
    spend: 1000,
    leads: 12,
    sales: 2,
    revenue: 2500
  });

  const result = useMemo(() => calculateMetrics(metrics), [metrics]);

  function update(key: keyof MetricsInput, value: number) {
    setMetrics((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl bg-card p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <MetricInput label="Impressions" value={metrics.impressions} onChange={(value) => update("impressions", value)} />
          <MetricInput label="Clicks" value={metrics.clicks} onChange={(value) => update("clicks", value)} />
          <MetricInput label="Spend" value={metrics.spend} onChange={(value) => update("spend", value)} />
          <MetricInput label="Leads" value={metrics.leads} onChange={(value) => update("leads", value)} />
          <MetricInput label="Sales" value={metrics.sales} onChange={(value) => update("sales", value)} />
          <MetricInput label="Revenue" value={metrics.revenue} onChange={(value) => update("revenue", value)} />
        </div>
      </section>
      <section className="rounded-2xl bg-dark p-6 text-canvas md:p-8">
        <h2 className="text-2xl font-semibold">Optimizer Result</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <p>CTR: {result.ctr}%</p>
          <p>CPC: ₹{result.cpc}</p>
          <p>CPL: ₹{result.cpl}</p>
          <p>ROAS: {result.roas}x</p>
        </div>
        <div className="mt-6 space-y-3">
          {result.advice.map((item) => <p key={item} className="rounded-xl bg-darkElevated p-4 text-white/70">{item}</p>)}
        </div>
      </section>
    </div>
  );
}

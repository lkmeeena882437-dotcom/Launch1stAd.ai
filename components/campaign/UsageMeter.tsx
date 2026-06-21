"use client";

import { useEffect, useState } from "react";
import { getUsedCampaigns } from "@/lib/quota";

export function UsageMeter() {
  const [used, setUsed] = useState(0);

  useEffect(() => {
    setUsed(getUsedCampaigns());
  }, []);

  return <p className="mb-4 rounded-xl border border-hairline bg-card px-4 py-3 text-sm font-semibold text-coral">Monthly generations: {used}/3.</p>;
}

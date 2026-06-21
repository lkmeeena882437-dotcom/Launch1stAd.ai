"use client";

import { useState } from "react";
import { statusLabel, type CampaignStatus, type SavedCampaign } from "@/lib/history";
import { updateCampaignStatus } from "@/lib/status";

const statuses: CampaignStatus[] = ["In Review", "Approved", "Running"];

export function StatusButtons({ item }: { item: SavedCampaign }) {
  const [status, setStatus] = useState<CampaignStatus>(statusLabel(item.status));

  function changeStatus(next: CampaignStatus) {
    updateCampaignStatus(item.id, next, next === "In Review" ? "Submitted for human review." : "");
    setStatus(next);
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
      {statuses.map((next) => (
        <button key={next} type="button" onClick={() => changeStatus(next)} className={status === next ? "rounded-full bg-coral px-3 py-1 text-white" : "rounded-full bg-white/10 px-3 py-1 text-white/60"}>
          {next}
        </button>
      ))}
    </div>
  );
}

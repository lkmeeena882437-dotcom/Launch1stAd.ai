"use client";

import { useState } from "react";
import { statusLabel, type CampaignStatus, type SavedCampaign } from "@/lib/history";
import { updateCampaignStatus } from "@/lib/status";

const flow: CampaignStatus[] = ["In Review", "Approved", "Running", "Completed"];

export function StatusActions({ item }: { item: SavedCampaign }) {
  const [status, setStatus] = useState<CampaignStatus>(statusLabel(item.status));

  function setNext(nextStatus: CampaignStatus) {
    updateCampaignStatus(item.id, nextStatus, nextStatus === "In Review" ? "Submitted for human review." : "");
    setStatus(nextStatus);
  }

  return (
    <div className="rounded-2xl border border-hairline bg-canvas p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Campaign status</p>
          <p className="mt-1 text-xs text-muted">Current: {status}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {flow.map((nextStatus) => (
            <button key={nextStatus} type="button" onClick={() => setNext(nextStatus)} className={status === nextStatus ? "rounded-lg bg-coral px-3 py-2 text-xs font-semibold text-white" : "rounded-lg border border-hairline px-3 py-2 text-xs font-semibold"}>
              {nextStatus}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted">Status tracking is for review/operations. Real leads start only after the campaign is launched inside Meta, Google, Telegram or another ad platform with budget.</p>
    </div>
  );
}

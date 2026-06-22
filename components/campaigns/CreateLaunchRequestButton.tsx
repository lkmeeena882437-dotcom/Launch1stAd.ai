"use client";

import Link from "next/link";
import { useState } from "react";
import type { CampaignInput } from "@/lib/campaign";
import { createLaunchRequest } from "@/lib/launchRequests";

export function CreateLaunchRequestButton({ campaignId, input, output }: {
  campaignId: string;
  input: CampaignInput;
  output: unknown;
}) {
  const [created, setCreated] = useState(false);

  function submit() {
    createLaunchRequest(campaignId, input, output);
    setCreated(true);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={submit} className="rounded-xl bg-dark px-4 py-3 text-sm font-bold text-canvas">
        Create platform campaign
      </button>
      {created && (
        <>
          <span className="text-sm font-semibold text-coral">Request ready</span>
          <Link href="/connections" className="rounded-xl border border-hairline px-4 py-3 text-sm font-bold">Connect account</Link>
        </>
      )}
    </div>
  );
}

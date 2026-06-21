"use client";

import { useRouter } from "next/navigation";
import type { CampaignInput } from "@/lib/campaign";
import { campaignReuseKey } from "@/lib/history";

export function UseAgainButton({ input }: { input: CampaignInput }) {
  const router = useRouter();

  function useAgain() {
    window.localStorage.setItem(campaignReuseKey, JSON.stringify(input));
    router.push("/campaign");
  }

  return (
    <button
      type="button"
      onClick={useAgain}
      className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white print:hidden"
    >
      Use again
    </button>
  );
}

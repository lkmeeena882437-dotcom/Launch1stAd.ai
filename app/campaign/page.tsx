import Link from "next/link";
import { Brand } from "@/components/Brand";
import { CampaignBuilder } from "@/components/campaign/CampaignBuilder";

export default function CampaignPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <CampaignBuilder />
    </main>
  );
}

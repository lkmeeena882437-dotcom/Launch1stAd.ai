import Link from "next/link";
import { Brand } from "@/components/Brand";
import { WalletPanel } from "@/components/wallet/WalletPanel";

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-canvas pb-24 text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-5">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-xl border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <WalletPanel />
    </main>
  );
}

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
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white md:hidden">
        <div className="grid grid-cols-4 text-center text-xs font-bold">
          <Link href="/dashboard" className="px-2 py-4 text-muted">Dashboard</Link>
          <Link href="/campaigns" className="px-2 py-4 text-muted">Campaigns</Link>
          <Link href="/wallet" className="border-t-2 border-coral bg-orange-50 px-2 py-4 text-coral">Wallet</Link>
          <Link href="/settings" className="px-2 py-4 text-muted">Settings</Link>
        </div>
      </nav>
    </main>
  );
}

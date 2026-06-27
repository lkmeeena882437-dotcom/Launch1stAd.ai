import Link from "next/link";
import { Brand } from "@/components/Brand";

const rows = [
  ["Profile details", "/account"],
  ["Provider connections", "/connections"],
  ["Review requests", "/launch-requests"],
  ["Review manager", "/admin/reviews"],
  ["FAQ", "/faq"],
  ["Privacy policy", "/privacy"],
  ["Terms & conditions", "/terms"]
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-canvas pb-24 text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-5">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-xl border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-5 md:py-10">
        <h1 className="text-5xl font-black tracking-tight">Settings</h1>
        <div className="mt-8 divide-y divide-hairline rounded-3xl bg-white shadow-soft">
          {rows.map(([label, href]) => (
            <Link key={label} href={href} className="flex items-center justify-between gap-4 px-5 py-5 text-xl font-semibold">
              <span>{label}</span>
              <span className="text-muted">›</span>
            </Link>
          ))}
        </div>
      </section>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white md:hidden">
        <div className="grid grid-cols-4 text-center text-xs font-bold">
          <Link href="/dashboard" className="px-2 py-4 text-muted">Dashboard</Link>
          <Link href="/campaigns" className="px-2 py-4 text-muted">Campaigns</Link>
          <Link href="/wallet" className="px-2 py-4 text-muted">Wallet</Link>
          <Link href="/settings" className="border-t-2 border-coral bg-orange-50 px-2 py-4 text-coral">Settings</Link>
        </div>
      </nav>
    </main>
  );
}

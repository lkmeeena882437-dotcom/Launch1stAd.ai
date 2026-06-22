import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SessionBadge } from "@/components/auth/SessionBadge";
import { HistoryList } from "@/components/dashboard/HistoryList";

const actions = [
  {
    title: "New Campaign",
    href: "/campaign",
    text: "Business details add karo aur AI campaign setup generate karo.",
    primary: true
  },
  {
    title: "Auto Publish",
    href: "/launch",
    text: "User info se connected ad platforms par campaign create karne ka flow dekho."
  },
  {
    title: "Promotion Links",
    href: "/platforms",
    text: "Website, app, WhatsApp, Instagram, Facebook, YouTube aur Telegram links save karo."
  },
  {
    title: "Analytics",
    href: "/analytics",
    text: "CTR, CPC, CPL aur ROAS check karo."
  }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <div className="flex items-center gap-3">
            <SessionBadge />
            <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">New Campaign</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Dashboard</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="serif-display text-5xl">Launch workspace.</h1>
            <p className="mt-4 max-w-2xl leading-7 text-muted">Client select karo, links save karo, campaign banao, report export/share karo.</p>
          </div>
          <Link href="/clients" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Manage clients</Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={action.primary ? "rounded-2xl bg-dark p-6 text-canvas" : "rounded-2xl bg-card p-6 text-ink"}
            >
              <h2 className="text-xl font-semibold">{action.title}</h2>
              <p className={action.primary ? "mt-3 text-sm leading-6 text-white/60" : "mt-3 text-sm leading-6 text-muted"}>{action.text}</p>
              <p className="mt-5 text-sm font-semibold text-coral">Open →</p>
            </Link>
          ))}
        </div>

        <section id="reports" className="mt-10">
          <HistoryList />
        </section>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/setup" className="hover:text-coral">Setup</Link>
          <Link href="/account" className="hover:text-coral">Account</Link>
          <Link href="/business" className="hover:text-coral">Single business profile</Link>
        </div>
      </section>
    </main>
  );
}

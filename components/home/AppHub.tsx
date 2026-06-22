import Link from "next/link";

const modules = [
  { title: "Home", text: "Start here", href: "/", badge: "H", tone: "bg-dark text-canvas" },
  { title: "AI Chat", text: "Ask before spend", href: "#ai-chat", badge: "AI", tone: "bg-coral text-white" },
  { title: "Ad Campaign", text: "Build campaign", href: "/campaign", badge: "AD", tone: "bg-blue-600 text-white" },
  { title: "Creative", text: "Hooks, copy, CTA", href: "/campaign", badge: "CR", tone: "bg-pink-500 text-white" },
  { title: "Meta Connect", text: "Facebook + Instagram", href: "/connections", badge: "M", tone: "bg-blue-700 text-white" },
  { title: "Google Connect", text: "Search + YouTube", href: "/connections", badge: "G", tone: "bg-emerald-500 text-white" },
  { title: "Payment", text: "UPI, wallet, crypto", href: "#payments", badge: "₹", tone: "bg-amber-500 text-white" },
  { title: "Ad Status", text: "Requests & progress", href: "/launch-requests", badge: "S", tone: "bg-violet-600 text-white" },
  { title: "Wallet", text: "Balance & billing", href: "#payments", badge: "W", tone: "bg-slate-900 text-white" },
  { title: "Spend", text: "CPM, CPC, ROAS", href: "/analytics", badge: "SP", tone: "bg-lime-600 text-white" },
  { title: "Privacy", text: "Policy ready", href: "/setup", badge: "P", tone: "bg-slate-700 text-white" },
  { title: "Help", text: "Support center", href: "/setup", badge: "?", tone: "bg-coral text-white" }
];

export function AppHub() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Your control room</p>
          <h2 className="serif-display mt-2 text-4xl md:text-5xl">Everything in one clean app hub.</h2>
        </div>
        <Link href="/dashboard" className="rounded-xl border border-hairline bg-white px-5 py-3 text-sm font-bold">Open workspace</Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((item) => (
          <Link key={item.title} href={item.href} className="group rounded-3xl border border-hairline bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-black ${item.tone}`}>{item.badge}</div>
            <h3 className="mt-5 text-xl font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

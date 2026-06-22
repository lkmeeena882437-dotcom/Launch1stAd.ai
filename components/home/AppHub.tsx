import Link from "next/link";

const modules = [
  { title: "Home", text: "Start here", href: "/", badge: "H", tone: "bg-dark text-canvas" },
  { title: "AI Chat", text: "Ask before spend", href: "#ai-chat", badge: "AI", tone: "bg-coral text-white" },
  { title: "Ad Campaign", text: "Build campaign", href: "/campaign", badge: "AD", tone: "bg-blue-600 text-white" },
  { title: "Creative", text: "Hooks, copy, CTA", href: "/campaign", badge: "CR", tone: "bg-pink-500 text-white" },
  { title: "Meta Connect", text: "Facebook + Instagram", href: "/connections", badge: "M", tone: "bg-blue-700 text-white" },
  { title: "Google Connect", text: "Search + YouTube", href: "/connections", badge: "G", tone: "bg-emerald-500 text-white" },
  { title: "Payment", text: "UPI, Card, USDT, TON", href: "#payments", badge: "₹", tone: "bg-amber-500 text-white" },
  { title: "TRC20", text: "Network option", href: "#payments", badge: "T20", tone: "bg-teal-600 text-white" },
  { title: "Ad Status", text: "Requests & progress", href: "/launch-requests", badge: "S", tone: "bg-violet-600 text-white" },
  { title: "Wallet", text: "Balance & billing", href: "#payments", badge: "W", tone: "bg-slate-900 text-white" },
  { title: "Spend", text: "CPM, CPC, ROAS", href: "/analytics", badge: "SP", tone: "bg-lime-600 text-white" },
  { title: "Help", text: "Support & privacy", href: "/setup", badge: "?", tone: "bg-coral text-white" }
];

const mainPlacements = [
  { title: "Meta", text: "Facebook + Instagram", badge: "M", tone: "bg-blue-700 text-white" },
  { title: "Google", text: "Search + YouTube", badge: "G", tone: "bg-emerald-600 text-white" },
  { title: "WhatsApp", text: "Lead chat", badge: "W", tone: "bg-green-600 text-white" }
];

const launchOffers = [
  ["Starter", "₹500", "AI setup + copy"],
  ["Growth", "₹1,500", "Creative variants"],
  ["Pro", "₹5,000", "Priority review"]
];

export function AppHub() {
  const line = " Ads can run on Meta, Instagram Reels, Facebook Feed, Google Search, YouTube and WhatsApp leads. ";
  return (
    <section id="payments" className="mx-auto max-w-7xl px-5 py-12">
      <div className="overflow-hidden rounded-[2rem] border border-hairline bg-dark py-3 text-canvas">
        <div className="marquee-track gap-8 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
          <span>{line}</span><span>{line}</span><span>{line}</span><span>{line}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] border border-hairline bg-white p-6 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Main placements</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">Aapka ad yahan chal sakta hai.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {mainPlacements.map((item) => (
              <div key={item.title} className="rounded-3xl border border-hairline bg-card p-5">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-black ${item.tone}`}>{item.badge}</div>
                <h3 className="mt-4 text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-hairline bg-white p-6 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Launch offers</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">Simple packs to start.</h2>
          <div className="mt-5 grid gap-3">
            {launchOffers.map(([name, amount, text]) => (
              <Link key={name} href="/launch" className="flex items-center justify-between gap-4 rounded-2xl bg-card p-4">
                <div><h3 className="font-bold text-ink">{name}</h3><p className="text-sm text-muted">{text}</p></div>
                <span className="rounded-xl bg-dark px-4 py-2 text-sm font-black text-canvas">{amount}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Your control room</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-ink md:text-5xl">Everything in one clean app hub.</h2>
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

      <details className="mt-6 rounded-[2rem] border border-hairline bg-white p-5 shadow-soft">
        <summary className="cursor-pointer text-sm font-bold text-ink">More tools</summary>
        <p className="mt-3 text-sm leading-6 text-muted">Privacy policy, help, support, wallet, spend, status, payment options and extra campaign tools yahan compact rakhe gaye hain.</p>
      </details>
    </section>
  );
}

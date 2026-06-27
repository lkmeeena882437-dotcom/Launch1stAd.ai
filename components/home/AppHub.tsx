import Link from "next/link";

const modules = [
  { title: "Campaign Builder", text: "Create structured launch briefs", href: "/campaign", badge: "AI", glow: "from-sky-400 to-blue-600" },
  { title: "Creative Studio", text: "Hooks, copy and CTA ideas", href: "/campaign", badge: "CR", glow: "from-pink-400 to-fuchsia-600" },
  { title: "Meta Channels", text: "Facebook and Instagram connections", href: "/connections", badge: "M", glow: "from-blue-400 to-indigo-600" },
  { title: "Google Channels", text: "Search and YouTube account path", href: "/connections", badge: "G", glow: "from-emerald-300 to-green-600" },
  { title: "Ad Wallet", text: "Verified deposits and payment records", href: "/wallet", badge: "₹", glow: "from-amber-300 to-orange-600" },
  { title: "Launch Status", text: "Review, approval and tracking", href: "/launch-requests", badge: "S", glow: "from-violet-400 to-purple-700" }
];

const channels = [
  ["Meta", "Facebook + Instagram reach", "#60a5fa"],
  ["Google", "Search + YouTube intent", "#34d399"],
  ["WhatsApp", "Lead conversations", "#22c55e"]
];

export function AppHub() {
  const line = " Meta Ads • Instagram Reels • Facebook Feed • Google Search • YouTube • WhatsApp Leads • Website Traffic ";
  return (
    <section id="payments" className="mx-auto max-w-7xl px-4 py-10 md:px-5 md:py-14">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 py-3 text-white backdrop-blur-xl">
        <div className="marquee-track gap-8 text-sm font-black uppercase tracking-[0.16em] text-white/70">
          <span>{line}</span><span>{line}</span><span>{line}</span><span>{line}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="neon-card rounded-[2rem] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#22e6a8]">Media channels</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Launch across high-intent channels.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {channels.map(([title, text, color]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <div style={{ background: color }} className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-black text-black">{title.slice(0, 1)}</div>
                <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="neon-card rounded-[2rem] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fda4af]">Ad spend workflow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Deposit, verify and launch with control.</h2>
          <div className="mt-6 grid gap-3">
            {[["Deposit", "Razorpay checkout and verified wallet credits"], ["Review", "Campaign generated only after funding"], ["Track", "Requests and records stay in workspace"]].map(([name, text]) => (
              <Link key={name} href="/wallet" className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div><h3 className="font-black text-white">{name}</h3><p className="text-sm text-white/60">{text}</p></div>
                <span className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black">Open</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Product modules</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">Tools for every launch stage.</h2>
        </div>
        <Link href="/dashboard" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white">Open workspace</Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((item) => (
          <Link key={item.title} href={item.href} className="group rounded-3xl border border-white/10 bg-white/10 p-5 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.glow} text-sm font-black text-white shadow-lg`}>{item.badge}</div>
            <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

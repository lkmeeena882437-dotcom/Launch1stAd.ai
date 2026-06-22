import Link from "next/link";

const modes = [
  {
    title: "Manual launch now",
    status: "Available",
    text: "AI report se copy, budget, platform aur checklist lo. Campaign ko Meta, Google, YouTube, Telegram ya app network me manually launch karo."
  },
  {
    title: "Human review workflow",
    status: "Available",
    text: "Campaign ko In Review, Approved aur Running status me track karo. Ye agency-style operations ke liye base hai."
  },
  {
    title: "Managed ad launch",
    status: "Next phase",
    text: "User campaign submit karega, human/admin review karega, payment/ad budget confirm hoga, phir campaign external ad platform par launch hoga."
  },
  {
    title: "API launch automation",
    status: "Future phase",
    text: "Platform approvals, account permissions aur policy setup ke baad direct integration possible hoga. Is phase me publish, status aur metrics sync automate honge."
  }
];

const checklist = [
  "Promotion link ready hai",
  "Offer aur CTA clear hai",
  "WhatsApp/page/website working hai",
  "Budget and payment model selected hai",
  "Ad copy safe hai, koi guarantee claim nahi hai",
  "Review status Approved hai",
  "External ad platform me campaign launch karna hai"
];

export function RealLaunchRoadmap() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-3xl bg-dark p-6 text-canvas md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Real ad launch</p>
        <h1 className="serif-display mt-3 text-4xl md:text-6xl">AI plan se real campaign launch tak.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-white/65">Abhi app campaign plan, review, status aur launch checklist deta hai. Real leads tab aayenge jab campaign external ad platform par budget ke saath run hoga.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {modes.map((mode) => (
            <div key={mode.title} className="rounded-2xl bg-darkElevated p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">{mode.status}</p>
              <h2 className="mt-3 text-xl font-semibold">{mode.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{mode.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-card p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Launch readiness checklist</h2>
          <div className="mt-5 grid gap-3">
            {checklist.map((item) => (
              <div key={item} className="rounded-xl bg-canvas px-4 py-3 text-sm font-semibold">✓ {item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-card p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Next real platform phase</h2>
          <p className="mt-4 leading-7 text-muted">Next phase me launch request, review approval, spend confirmation, manual launch notes, and running metrics tracking add hoga. Direct API publish baad me platform approvals ke baad hoga.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Create campaign</Link>
            <Link href="/platforms" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Save promotion links</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

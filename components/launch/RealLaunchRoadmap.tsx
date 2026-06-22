import Link from "next/link";

const modes = [
  {
    title: "Auto publish goal",
    status: "Product direction",
    text: "Website user se business, link, platform, budget and customer segment legi, phir connected ad account par campaign create karegi."
  },
  {
    title: "AI setup engine",
    status: "Available",
    text: "AI report objective, copy, keywords, audience group, CTA and budget guide ready karta hai."
  },
  {
    title: "Review workflow",
    status: "Available",
    text: "Campaign ko Draft, In Review, Approved, Running status me track kiya ja sakta hai."
  },
  {
    title: "Platform connector",
    status: "Connection required",
    text: "Meta, Google ya other platform account connect hone ke baad publish action active hoga."
  }
];

const checklist = [
  "User business details ready",
  "Promotion link ready",
  "India location and customer group selected",
  "Platform and budget selected",
  "AI copy and keywords generated",
  "Review status Approved",
  "Connected ad account available"
];

export function RealLaunchRoadmap() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-3xl bg-dark p-6 text-canvas md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Auto ad publish</p>
        <h1 className="serif-display mt-3 text-4xl md:text-6xl">User info se campaign create.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-white/65">Goal ye hai ki user info de, AI setup banaye, review pass ho, aur connected platform account par campaign publish ho. Platform connection ke bina app launch pack ready rakhegi.</p>
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
          <h2 className="text-2xl font-semibold">Auto publish checklist</h2>
          <div className="mt-5 grid gap-3">
            {checklist.map((item) => (
              <div key={item} className="rounded-xl bg-canvas px-4 py-3 text-sm font-semibold">✓ {item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-card p-6 md:p-8">
          <h2 className="text-2xl font-semibold">How it will run</h2>
          <p className="mt-4 leading-7 text-muted">Website campaign payload ready karegi: business, link, platform, objective, customer group, budget, copy and keywords. Connected account available hote hi same payload platform API ko bheja jayega.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Create campaign</Link>
            <Link href="/platforms" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Save promotion links</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

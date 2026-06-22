import Link from "next/link";

const modes = [
  {
    title: "Campaign intake",
    status: "Core",
    text: "Business details, destination links, budget, audience and channel preferences."
  },
  {
    title: "AI setup engine",
    status: "Core",
    text: "Objectives, copy, keywords, audience segments, CTA and budget guidance."
  },
  {
    title: "Review workflow",
    status: "Workflow",
    text: "Draft, review, approval and live-stage tracking for campaign operations."
  },
  {
    title: "Channel connector",
    status: "Connector",
    text: "Channel account connection for approved campaign requests."
  }
];

const checklist = [
  "Business profile",
  "Promotion destination",
  "Audience and location",
  "Budget and channel mix",
  "Creative assets",
  "Approval status",
  "Channel account"
];

export function RealLaunchRoadmap() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-3xl bg-dark p-6 text-canvas md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Launch workflow</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">From brief to channel-ready campaign.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-white/65">A guided workflow for campaign inputs, launch assets and approved channel requests.</p>
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
          <h2 className="text-2xl font-semibold">Launch checklist</h2>
          <div className="mt-5 grid gap-3">
            {checklist.map((item) => (
              <div key={item} className="rounded-xl bg-canvas px-4 py-3 text-sm font-semibold">✓ {item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-card p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Execution package</h2>
          <p className="mt-4 leading-7 text-muted">A structured package with business details, destination, objective, audience, budget, copy and keywords.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/campaign" className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Create campaign</Link>
            <Link href="/platforms" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Save destinations</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

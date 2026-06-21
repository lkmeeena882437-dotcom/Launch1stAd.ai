export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-canvas p-8 text-ink">
      <h1 className="serif-display text-5xl">Business Profile</h1>
      <p className="mt-4 max-w-2xl text-muted">Yahan user business name, category, offer, city, audience, WhatsApp and brand tone save karega. Is profile se har campaign personalised banega.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-card p-6"><h2 className="font-semibold">Business Details</h2><p className="mt-2 text-muted">Name, category, product and location.</p></div>
        <div className="rounded-2xl bg-card p-6"><h2 className="font-semibold">Audience</h2><p className="mt-2 text-muted">Target customer, budget and buyer intent.</p></div>
        <div className="rounded-2xl bg-card p-6"><h2 className="font-semibold">Brand Tone</h2><p className="mt-2 text-muted">Premium, local, youth, trust or urgent offer.</p></div>
      </div>
    </main>
  );
}

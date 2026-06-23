import Link from "next/link";
import { Brand } from "@/components/Brand";

const plans = [
  ["Starter", "₹500", "Campaign setup pack"],
  ["Growth", "₹1,500", "Creative and review pack"],
  ["Pro", "₹5,000", "Priority workspace pack"]
];

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Billing</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Credits and subscriptions.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Billing is structured for wallet credits, subscription plans and premium AI tools. Payment gateway keys can be added from deployment settings.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map(([name, price, text]) => (
            <div key={name} className="rounded-3xl bg-card p-6">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="mt-3 text-4xl font-black">{price}</p>
              <p className="mt-3 leading-7 text-muted">{text}</p>
              <button className="mt-6 rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Checkout ready</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

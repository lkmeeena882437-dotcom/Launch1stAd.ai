import Link from "next/link";
import { Brand } from "@/components/Brand";
import { BusinessForm } from "@/components/business/BusinessForm";

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/campaign" className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">Create Campaign</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Business Profile</p>
        <h1 className="serif-display mt-3 text-5xl">Save once. Use in every campaign.</h1>
        <p className="mt-4 max-w-2xl text-muted">Business name, category, offer, city, audience, WhatsApp and brand tone save karo. Campaign Builder me details auto-fill hongi.</p>
        <BusinessForm />
      </section>
    </main>
  );
}

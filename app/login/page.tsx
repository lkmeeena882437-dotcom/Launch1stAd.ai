import Link from "next/link";
import { Brand } from "@/components/Brand";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Login</p>
        <h1 className="serif-display mt-3 text-5xl">Magic link login</h1>
        <p className="mt-4 text-muted">Supabase env connect hone ke baad yahan email magic-link auth active hoga. Next step me full client login form wire hoga.</p>
      </section>
    </main>
  );
}

import Link from "next/link";
import { Brand } from "@/components/Brand";
import { getSupabaseConfig } from "@/lib/supabase/config";

export default function SetupPage() {
  const supabase = getSupabaseConfig();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Setup</p>
        <h1 className="serif-display mt-3 text-5xl">Supabase connection status</h1>
        <div className="mt-8 rounded-2xl bg-card p-6">
          <h2 className="text-2xl font-semibold">Database</h2>
          <p className="mt-3 text-muted">Status: {supabase.isConfigured ? "Connected env variables found" : "Missing Supabase env variables"}</p>
          <p className="mt-3 text-muted">Run `supabase/schema.sql` in your Supabase SQL Editor, then add env variables in Vercel.</p>
        </div>
      </section>
    </main>
  );
}

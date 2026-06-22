import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SignInBox } from "@/components/auth/SignInBox";

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
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Secure access</p>
        <h1 className="text-4xl font-black tracking-tight text-ink md:text-6xl">Sign in to your workspace.</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">Enter your email to receive a secure sign-in link for your Launch1stAd.ai account.</p>
        <SignInBox />
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { saveAuthSession } from "@/lib/auth/session";
import { sendMagicLink } from "@/lib/auth/magicLink";
import { getSupabaseConfig } from "@/lib/supabase/config";

function appBaseUrl() {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || window.location.origin).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

export function SignInBox() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    try {
      await sendMagicLink(email);
      setNote("Sign-in link sent. Check your inbox and continue to the dashboard.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Unable to send sign-in link.");
    }
    setBusy(false);
  }

  async function submitPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    try {
      const { url, anonKey, isConfigured } = getSupabaseConfig();
      if (!isConfigured || !url || !anonKey) throw new Error("Phone login is not configured.");
      const response = await fetch(`${url}/auth/v1/otp`, {
        method: "POST",
        headers: { apikey: anonKey, "Content-Type": "application/json" },
        body: JSON.stringify({ phone, create_user: true })
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.msg || error?.message || "OTP could not be sent.");
      }
      setNote("OTP sent. Enter the code and verify.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Unable to send OTP.");
    }
    setBusy(false);
  }

  async function verifyPhone() {
    setBusy(true);
    setNote("");
    try {
      const { url, anonKey, isConfigured } = getSupabaseConfig();
      if (!isConfigured || !url || !anonKey) throw new Error("Phone login is not configured.");
      const response = await fetch(`${url}/auth/v1/verify`, {
        method: "POST",
        headers: { apikey: anonKey, "Content-Type": "application/json" },
        body: JSON.stringify({ phone, token: otp, type: "sms" })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.access_token) throw new Error(data?.msg || data?.message || "OTP verification failed.");
      saveAuthSession({ accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000 });
      window.location.href = "/dashboard";
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Unable to verify OTP.");
    }
    setBusy(false);
  }

  function social(provider: "google" | "facebook") {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured || !url || !anonKey) {
      setNote("Social login is not configured.");
      return;
    }
    const redirectTo = `${appBaseUrl()}/session`;
    window.location.href = `${url}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(redirectTo)}`;
  }

  return (
    <div className="neon-card rounded-[2rem] p-5 md:p-7">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fda4af]">Choose sign-in method</p>
      <h2 className="mt-2 text-2xl font-black text-white">Continue to workspace</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => social("google")} className="rounded-2xl bg-white px-4 py-4 text-sm font-black text-slate-950">Continue with Google</button>
        <button type="button" onClick={() => social("facebook")} className="rounded-2xl bg-[#1877f2] px-4 py-4 text-sm font-black text-white">Continue with Facebook</button>
      </div>

      <form onSubmit={submitEmail} className="mt-4 rounded-3xl border border-white/10 bg-black/25 p-4">
        <label className="block">
          <span className="text-sm font-black text-white">Email link</span>
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 text-slate-950 outline-none" placeholder="you@company.com" />
        </label>
        <button disabled={busy} className="mt-4 w-full rounded-2xl px-5 py-4 text-sm font-black text-white disabled:opacity-60 neon-button">{busy ? "Sending..." : "Send link"}</button>
      </form>

      <form onSubmit={submitPhone} className="mt-4 rounded-3xl border border-white/10 bg-black/25 p-4">
        <label className="block">
          <span className="text-sm font-black text-white">Mobile OTP</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 text-slate-950 outline-none" placeholder="+91XXXXXXXXXX" />
        </label>
        <button disabled={busy} className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-black text-white disabled:opacity-60">Send OTP</button>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input value={otp} onChange={(event) => setOtp(event.target.value)} className="rounded-2xl border border-white/10 bg-white px-4 py-4 text-slate-950 outline-none" placeholder="Enter OTP" />
          <button type="button" onClick={verifyPhone} disabled={busy} className="rounded-2xl bg-[#22e6a8] px-5 py-4 text-sm font-black text-black disabled:opacity-60">Verify</button>
        </div>
      </form>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4 text-xs leading-6 text-white/60">
        By continuing, you agree to the <Link href="/terms" className="font-black text-white">Terms</Link> and <Link href="/privacy" className="font-black text-white">Privacy Policy</Link>. After sign-in, continue from the dashboard.
      </div>
      {note && <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-[#fda4af]">{note}</p>}
    </div>
  );
}

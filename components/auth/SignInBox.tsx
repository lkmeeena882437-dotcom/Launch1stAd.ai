"use client";

import { FormEvent, useState } from "react";
import { sendMagicLink } from "@/lib/auth/magicLink";
import { getSupabaseConfig } from "@/lib/supabase/config";

export function SignInBox() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    try {
      await sendMagicLink(email);
      setNote("Secure sign-in link sent. Open it from your inbox to enter the dashboard.");
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
      setNote("OTP sent. Enter verification code after SMS provider is enabled in Supabase.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Unable to send OTP.");
    }
    setBusy(false);
  }

  function social(provider: "google" | "facebook") {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured || !url || !anonKey) {
      setNote("Supabase social login is not configured.");
      return;
    }
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const redirectTo = `${appUrl.replace(/\/+$/, "")}/session`;
    window.location.href = `${url}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(redirectTo)}`;
  }

  return (
    <div className="mt-8 rounded-2xl bg-card p-5 md:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => social("google")} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-ink">Continue with Google</button>
        <button type="button" onClick={() => social("facebook")} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-ink">Continue with Facebook</button>
      </div>

      <form onSubmit={submitEmail} className="mt-5 rounded-2xl bg-white p-4">
        <label className="block">
          <span className="text-sm font-bold">Email address</span>
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 outline-coral" placeholder="you@company.com" />
        </label>
        <button disabled={busy} className="mt-4 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{busy ? "Sending..." : "Send secure link"}</button>
      </form>

      <form onSubmit={submitPhone} className="mt-4 rounded-2xl bg-white p-4">
        <label className="block">
          <span className="text-sm font-bold">Mobile number with country code</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 outline-coral" placeholder="+91XXXXXXXXXX" />
        </label>
        <button disabled={busy} className="mt-4 rounded-lg border border-hairline px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60">Send OTP</button>
      </form>

      <div className="mt-5 rounded-2xl bg-canvas p-4 text-sm leading-6 text-muted">
        Connect Meta or Google ad accounts from Settings after login. This allows campaign delivery and reporting through approved provider accounts.
      </div>
      {note && <p className="mt-4 text-sm font-semibold text-coral">{note}</p>}
    </div>
  );
}

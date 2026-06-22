"use client";

import { FormEvent, useState } from "react";
import { sendMagicLink } from "@/lib/auth/magicLink";

export function SignInBox() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    try {
      await sendMagicLink(email);
      setNote("Secure sign-in link sent. Check your inbox.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Unable to send sign-in link.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-2xl bg-card p-6 md:p-8">
      <label className="block">
        <span className="text-sm font-medium">Email address</span>
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 outline-coral" placeholder="you@company.com" />
      </label>
      <button disabled={busy} className="mt-5 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
        {busy ? "Sending..." : "Send secure link"}
      </button>
      {note && <p className="mt-4 text-sm font-semibold text-coral">{note}</p>}
    </form>
  );
}

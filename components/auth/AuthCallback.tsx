"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { saveAuthSession } from "@/lib/auth/session";
import { sessionFromHash } from "@/lib/auth/hash";

export function AuthCallback() {
  const [status, setStatus] = useState("Checking login link...");

  useEffect(() => {
    const session = sessionFromHash(window.location.hash);
    if (!session) {
      setStatus("Login session nahi mili. Link expired ho sakta hai.");
      return;
    }
    saveAuthSession(session);
    setStatus("Login successful. Dashboard open karo.");
  }, []);

  return (
    <div className="rounded-2xl bg-card p-6">
      <h1 className="text-2xl font-semibold">Auth callback</h1>
      <p className="mt-3 text-muted">{status}</p>
      <Link href="/dashboard" className="mt-5 inline-flex rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white">Go to dashboard</Link>
    </div>
  );
}

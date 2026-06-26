"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth/session";

export function AuthActions() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(getAuthSession()?.accessToken));
  }, []);

  if (signedIn) {
    return (
      <div className="flex shrink-0 gap-2">
        <Link href="/dashboard" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">Dashboard</Link>
        <Link href="/campaign" className="rounded-xl px-4 py-2 text-sm font-bold text-white neon-button">Create</Link>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 gap-2">
      <Link href="/login" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">Login</Link>
      <Link href="/campaign" className="rounded-xl px-4 py-2 text-sm font-bold text-white neon-button">Start</Link>
    </div>
  );
}

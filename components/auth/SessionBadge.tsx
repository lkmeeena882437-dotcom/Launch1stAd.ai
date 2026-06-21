"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearAuthSession, getAuthSession } from "@/lib/auth/session";

export function SessionBadge() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getAuthSession()));
  }, []);

  function logout() {
    clearAuthSession();
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return <Link href="/login" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Login</Link>;
  }

  return (
    <button onClick={logout} className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">
      Logout
    </button>
  );
}

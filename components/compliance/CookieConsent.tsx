"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const key = "launch1stad.cookieConsent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(key) !== "accepted");
  }, []);

  function accept() {
    window.localStorage.setItem(key, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-2xl border border-hairline bg-white p-4 shadow-premium">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          We use essential cookies to keep the workspace secure and improve product experience. Review our <Link href="/privacy" className="font-semibold text-coral">Privacy Policy</Link>.
        </p>
        <button onClick={accept} className="rounded-xl bg-dark px-4 py-3 text-sm font-bold text-canvas">Accept</button>
      </div>
    </div>
  );
}

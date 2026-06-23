"use client";

import { useEffect, useState } from "react";

export function FxRateCard() {
  const [rate, setRate] = useState(85);
  const [source, setSource] = useState("fallback");

  useEffect(() => {
    fetch("/api/fx-rate")
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.rate === "number") {
          setRate(data.rate);
          setSource(data.source || "live");
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6">
      <p className="text-sm text-muted">USD / INR</p>
      <h2 className="mt-3 text-4xl font-black text-ink">₹{rate.toFixed(2)}</h2>
      <p className="mt-2 text-xs text-muted">{source} exchange rate</p>
    </div>
  );
}

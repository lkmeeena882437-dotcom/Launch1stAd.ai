import type { ReactNode } from "react";

export function ReportBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-card p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 whitespace-pre-line leading-7 text-muted">{children}</div>
    </section>
  );
}

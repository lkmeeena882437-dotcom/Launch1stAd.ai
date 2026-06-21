"use client";

export function SavePdfButton({ label = "Save PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white print:hidden"
    >
      {label}
    </button>
  );
}

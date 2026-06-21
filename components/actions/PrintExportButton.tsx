"use client";

export function PrintExportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 print:hidden"
    >
      Export PDF
    </button>
  );
}

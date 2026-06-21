import Link from "next/link";
import { Brand } from "@/components/Brand";
import { PrintExportButton } from "@/components/actions/PrintExportButton";

export function DetailHeader() {
  return (
    <header className="border-b border-hairline bg-canvas print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/"><Brand /></Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
          <PrintExportButton />
        </div>
      </div>
    </header>
  );
}

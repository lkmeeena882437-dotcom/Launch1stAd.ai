import Link from "next/link";
import { Brand } from "@/components/Brand";
import { LaunchRequestsList } from "@/components/launch/LaunchRequestsList";

export default function LaunchRequestsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Brand /></Link>
          <Link href="/dashboard" className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold">Dashboard</Link>
        </div>
      </header>
      <LaunchRequestsList />
    </main>
  );
}

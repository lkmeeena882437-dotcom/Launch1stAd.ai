import Link from "next/link";

export function ShareReportButton({ id }: { id: string }) {
  return (
    <Link href={`/share?id=${id}`} className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold print:hidden">
      Open share view
    </Link>
  );
}

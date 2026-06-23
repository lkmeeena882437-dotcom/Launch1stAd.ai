export function ResultCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-darkElevated p-4 md:p-5">
      <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white/80">{title}</h3>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/70 md:leading-7">{body}</p>
    </div>
  );
}

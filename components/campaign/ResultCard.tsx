export function ResultCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-darkElevated p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 whitespace-pre-line leading-7 text-white/65">{body}</p>
    </div>
  );
}

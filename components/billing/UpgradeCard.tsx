type Props = {
  title: string;
  price: string;
  text: string;
  href?: string;
};

export function UpgradeCard({ title, price, text, href }: Props) {
  return (
    <div className="rounded-2xl bg-card p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <p className="mt-3 text-muted">{text}</p>
      {href ? <a href={href} className="mt-5 inline-flex rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white">Upgrade</a> : <span className="mt-5 inline-flex rounded-lg border border-hairline px-5 py-3 text-sm font-semibold">Current</span>}
    </div>
  );
}

export function SupportedMethods() {
  return (
    <div className="mt-5 rounded-2xl bg-card p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">Deposit methods</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["UPI", "Cards", "Paytm", "PhonePe", "Netbanking"].map((item) => (
          <span key={item} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-muted">{item}</span>
        ))}
      </div>
    </div>
  );
}

const methods = ["Razorpay", "UPI", "RuPay", "Visa", "Mastercard", "NetBanking", "PhonePe", "Paytm"];

export function SupportedMethods() {
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-100 p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">Trusted payment methods</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {methods.map((item) => (
          <span key={item} className="rounded-xl bg-white px-3 py-3 text-center text-xs font-black text-slate-700 shadow-sm">{item}</span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">Wallet credits are added only after checkout verification.</p>
    </div>
  );
}

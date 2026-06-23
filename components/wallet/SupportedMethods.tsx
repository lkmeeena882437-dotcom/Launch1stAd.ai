const methods = ["Razorpay", "UPI", "RuPay", "Visa", "Mastercard", "NetBanking", "PhonePe", "Paytm"];

export function SupportedMethods() {
  return (
    <div className="mt-5 rounded-2xl bg-card p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">Trusted payment methods</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {methods.map((item) => (
          <span key={item} className="rounded-xl bg-white px-3 py-3 text-center text-xs font-bold text-muted">{item}</span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-muted">Wallet credits are added only after Razorpay payment verification.</p>
    </div>
  );
}

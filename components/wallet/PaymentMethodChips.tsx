export const walletPaymentMethods = ["UPI", "Cards", "Wallet apps", "Netbanking"];

export function PaymentMethodChips({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {walletPaymentMethods.map((method) => (
        <button
          key={method}
          type="button"
          onClick={() => onSelect(method)}
          className={method === selected ? "rounded-full bg-dark px-4 py-2 text-xs font-bold text-canvas" : "rounded-full bg-card px-4 py-2 text-xs font-bold text-muted"}
        >
          {method}
        </button>
      ))}
    </div>
  );
}

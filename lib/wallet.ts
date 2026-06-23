export type WalletTransactionType = "credit" | "spend" | "reserve" | "refund";

export type WalletTransaction = {
  id: string;
  type: WalletTransactionType;
  amount: number;
  note: string;
  createdAt: string;
};

export type WalletState = {
  balance: number;
  reserved: number;
  transactions: WalletTransaction[];
};

export const walletKey = "launch1stad.wallet";

export const defaultWallet: WalletState = {
  balance: 0,
  reserved: 0,
  transactions: []
};

export function readWallet(): WalletState {
  try {
    const raw = window.localStorage.getItem(walletKey);
    return raw ? (JSON.parse(raw) as WalletState) : defaultWallet;
  } catch {
    return defaultWallet;
  }
}

function writeWallet(next: WalletState) {
  window.localStorage.setItem(walletKey, JSON.stringify(next));
  return next;
}

export function addCredits(amount: number, note = "Wallet top-up") {
  const current = readWallet();
  return writeWallet({
    ...current,
    balance: current.balance + amount,
    transactions: [{ id: crypto.randomUUID(), type: "credit", amount, note, createdAt: new Date().toISOString() }, ...current.transactions]
  });
}

export function reserveSpend(amount: number, note = "Campaign spend reserve") {
  const current = readWallet();
  if (amount <= 0 || amount > current.balance) return { ok: false, wallet: current, message: "Insufficient wallet balance." };
  const next = writeWallet({
    balance: current.balance - amount,
    reserved: current.reserved + amount,
    transactions: [{ id: crypto.randomUUID(), type: "reserve", amount, note, createdAt: new Date().toISOString() }, ...current.transactions]
  });
  return { ok: true, wallet: next, message: "Ad spend reserved." };
}

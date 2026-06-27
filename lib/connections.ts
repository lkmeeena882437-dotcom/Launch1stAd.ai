export type ConnectionProvider = "meta" | "google";
export type ConnectionStatus = "not_connected" | "started" | "connected" | "error";

export type PlatformConnection = {
  provider: ConnectionProvider;
  label: string;
  status: ConnectionStatus;
  note: string;
  accountLabel?: string;
  accountRef?: string;
  pageRef?: string;
  updatedAt?: string;
};

export const connectionKey = "launch1stad.platformConnections";

export const defaultConnections: PlatformConnection[] = [
  {
    provider: "meta",
    label: "Meta / Facebook / Instagram",
    status: "not_connected",
    note: "Connect to use Facebook page, Instagram profile and ad account for campaign creation."
  },
  {
    provider: "google",
    label: "Google Ads",
    status: "not_connected",
    note: "Connect to use Google Ads customer account for search and video campaign creation."
  }
];

export function readConnections() {
  try {
    const raw = window.localStorage.getItem(connectionKey);
    return raw ? (JSON.parse(raw) as PlatformConnection[]) : defaultConnections;
  } catch {
    return defaultConnections;
  }
}

export function saveConnectionStatus(provider: ConnectionProvider, status: ConnectionStatus, note?: string) {
  const current = readConnections();
  const next = current.map((item) => item.provider === provider ? { ...item, status, note: note || item.note, updatedAt: new Date().toISOString() } : item);
  window.localStorage.setItem(connectionKey, JSON.stringify(next));
  return next;
}

export function saveConnectionRecord(provider: ConnectionProvider, details: Partial<PlatformConnection>) {
  const current = readConnections();
  const next = current.map((item) => item.provider === provider ? {
    ...item,
    ...details,
    provider,
    status: details.status || item.status,
    note: details.note || item.note,
    updatedAt: new Date().toISOString()
  } : item);
  window.localStorage.setItem(connectionKey, JSON.stringify(next));
  return next;
}

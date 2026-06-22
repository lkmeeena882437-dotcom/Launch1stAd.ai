export type ConnectionProvider = "meta" | "google";
export type ConnectionStatus = "not_connected" | "started" | "connected" | "error";

export type PlatformConnection = {
  provider: ConnectionProvider;
  label: string;
  status: ConnectionStatus;
  note: string;
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
  const next = current.map((item) => item.provider === provider ? { ...item, status, note: note || item.note } : item);
  window.localStorage.setItem(connectionKey, JSON.stringify(next));
  return next;
}

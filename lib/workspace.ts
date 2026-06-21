import type { SavedBusiness } from "./saved";

export const workspaceClientsKey = "launch1stad.clients";
export const activeClientKey = "launch1stad.activeClient";

export type ClientProfile = SavedBusiness & {
  id: string;
  createdAt: string;
};

export function makeClientProfile(profile: SavedBusiness): ClientProfile {
  return {
    ...profile,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
}

export function getClients(): ClientProfile[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(workspaceClientsKey);
  return raw ? (JSON.parse(raw) as ClientProfile[]) : [];
}

export function saveClients(clients: ClientProfile[]) {
  window.localStorage.setItem(workspaceClientsKey, JSON.stringify(clients));
}

export function getActiveClient() {
  if (typeof window === "undefined") return null;
  const activeId = window.localStorage.getItem(activeClientKey);
  return getClients().find((client) => client.id === activeId) ?? null;
}

export function setActiveClient(clientId: string) {
  window.localStorage.setItem(activeClientKey, clientId);
}

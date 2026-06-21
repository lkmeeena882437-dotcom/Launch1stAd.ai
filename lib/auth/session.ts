export const authSessionKey = "launch1stad.authSession";

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
};

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem(authSessionKey, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  const raw = window.localStorage.getItem(authSessionKey);
  return raw ? (JSON.parse(raw) as AuthSession) : null;
}

export function clearAuthSession() {
  window.localStorage.removeItem(authSessionKey);
}

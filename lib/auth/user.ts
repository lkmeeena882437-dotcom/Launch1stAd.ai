import { getAuthSession } from "./session";

type JwtPayload = {
  sub?: string;
  email?: string;
  exp?: number;
};

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

export function getCurrentUser() {
  const session = getAuthSession();
  if (!session?.accessToken) return null;

  const [, payload] = session.accessToken.split(".");
  if (!payload) return null;

  try {
    const data = JSON.parse(decodeBase64Url(payload)) as JwtPayload;
    if (!data.sub) return null;
    return { id: data.sub, email: data.email ?? "" };
  } catch {
    return null;
  }
}

import type { AuthSession } from "./session";

export function sessionFromHash(hash: string): AuthSession | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const accessToken = params.get("access_token");

  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken: params.get("refresh_token") ?? undefined,
    tokenType: params.get("token_type") ?? undefined,
    expiresAt: params.get("expires_at") ? Number(params.get("expires_at")) : undefined
  };
}

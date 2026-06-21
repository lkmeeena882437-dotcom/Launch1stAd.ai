export const quotaKey = "launch1stad.quota";
export const accountKey = "launch1stad.account";

export type AccountMode = "starter" | "growth" | "team";

export function getAccountMode(): AccountMode {
  if (typeof window === "undefined") return "starter";
  return (window.localStorage.getItem(accountKey) as AccountMode) || "starter";
}

export function getMonthlyKey() {
  const now = new Date();
  return `${quotaKey}.${now.getFullYear()}-${now.getMonth() + 1}`;
}

export function getUsedCampaigns() {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(getMonthlyKey()) || "0");
}

export function canGenerateCampaign() {
  const mode = getAccountMode();
  if (mode !== "starter") return true;
  return getUsedCampaigns() < 3;
}

export function recordCampaignUsage() {
  if (typeof window === "undefined") return;
  const mode = getAccountMode();
  if (mode !== "starter") return;
  const key = getMonthlyKey();
  window.localStorage.setItem(key, String(getUsedCampaigns() + 1));
}

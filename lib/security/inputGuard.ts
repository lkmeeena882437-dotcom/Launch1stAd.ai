const blockedPatterns = [
  /ignore previous instructions/i,
  /system prompt/i,
  /developer message/i,
  /api key/i,
  /password/i,
  /secret key/i
];

export function validateUserPrompt(input: string) {
  const text = input.trim();
  if (!text) return { ok: false, message: "Enter a campaign question." };
  if (text.length > 2500) return { ok: false, message: "Prompt is too long. Keep it under 2,500 characters." };
  if (blockedPatterns.some((pattern) => pattern.test(text))) {
    return { ok: false, message: "Request blocked by input safety checks." };
  }
  return { ok: true, message: "OK" };
}

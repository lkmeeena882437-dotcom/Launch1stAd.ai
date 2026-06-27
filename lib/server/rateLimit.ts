import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

type LimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, Bucket>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const first = forwarded.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(request: Request, options: LimitOptions) {
  const now = Date.now();
  const id = `${options.key}:${clientIp(request)}`;
  const current = buckets.get(id);

  if (!current || current.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, remaining: options.limit - 1, resetAt: now + options.windowMs, retryAfter: 0 };
  }

  if (current.count >= options.limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    };
  }

  current.count += 1;
  buckets.set(id, current);
  return {
    ok: true,
    remaining: Math.max(0, options.limit - current.count),
    resetAt: current.resetAt,
    retryAfter: 0
  };
}

export function rateLimitResponse(result: { retryAfter: number }) {
  return NextResponse.json(
    {
      ok: false,
      status: "rate_limited",
      message: "Too many requests. Please wait a moment and try again."
    },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfter) }
    }
  );
}

// Simple sliding-window limiter for form submissions.
// Phase 1 runs per server instance, which is enough to stop casual abuse. A shared store
// (Supabase or Redis) can replace it in Phase 2 without changing callers.

type Bucket = number[];
const buckets = new Map<string, Bucket>();

export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 10_000) {
    for (const [k, v] of buckets) if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
  }
  return true;
}

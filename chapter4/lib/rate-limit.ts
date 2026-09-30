type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit({
    key,
    limit,
    windowMs,
}: {
    key: string;
    limit: number;
    windowMs: number;
}): { ok: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt < now) {
        const resetAt = now + windowMs;
        buckets.set(key, { count: 1, resetAt });
        return { ok: true, remaining: limit - 1, resetAt };
    }

    if (bucket.count >= limit) {
        return { ok: false, remaining: 0, resetAt: bucket.resetAt };
    }

    bucket.count += 1;
    return { ok: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

// Cleanup to prevent unbounded growth
setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
}, 60_000).unref?.();
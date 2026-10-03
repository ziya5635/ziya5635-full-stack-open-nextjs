import { NextRequest, NextResponse } from "next/server";
import { getUserFromApiToken } from "@/lib/services/api-auth";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
    try {
        // 1. Rate limit by IP first (before any DB work)
        // better to use redis for production
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            ?? req.headers.get("x-real-ip")
            ?? "unknown";

        const rl = rateLimit({ key: `ip:${ip}`, limit: 60, windowMs: 60_000 });

        if (!rl.ok) {
            return NextResponse.json(
                { error: "Too Many Requests" },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
                        "X-RateLimit-Limit": "60",
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
                    },
                }
            );
        }
        //2.auth
        let user = await getUserFromApiToken(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 3.also rate limit per token (tighter than IP)
        const userRl = rateLimit({ key: `token:${user.id}`, limit: 1000, windowMs: 3_600_000 });
        if (!userRl.ok) {
            return NextResponse.json(
                { error: "Too Many Tokens" },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
                        "X-RateLimit-Limit": "60",
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
                    },
                }
            );
        }

        return NextResponse.json(user, { headers: { "Cache-Control": "no-store" } });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
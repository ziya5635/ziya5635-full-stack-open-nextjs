import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const PREFIX = "Bearer ";

export async function getUserFromApiToken(req: Request) {
    const header = req.headers.get("authorization");
    if (!header?.startsWith(PREFIX)) return null;

    const token = header.slice(PREFIX.length).trim();
    if (!token) return null;

    const user = await db.query.users.findFirst({
        where: eq(users.token, token),
    });

    return user ?? null;
}
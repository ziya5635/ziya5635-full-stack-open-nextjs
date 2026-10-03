import { hashToken } from "@/lib/token";
import { getUserByToken } from "./users";

const PREFIX = "Bearer ";

export async function getUserFromApiToken(req: Request) {
    const header = req.headers.get("authorization");
    if (!header?.startsWith(PREFIX)) return null;

    const rawToken = header.slice(PREFIX.length).trim();
    if (!rawToken) return null;

    const tokenHash = hashToken(rawToken);

    let user = await getUserByToken(tokenHash);

    return user ?? null;
}
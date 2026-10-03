import { createHash } from "crypto";

export function hashToken(rawToken: string) {
    return createHash("sha256").update(rawToken).digest("hex");
}
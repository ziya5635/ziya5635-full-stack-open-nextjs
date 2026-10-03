import { auth } from "@/auth"
import { findUserByUsername } from "./users"

export async function getCurrentUser() {
    let session = await auth()
    if (!session?.user?.email) {
        return null
    }
    //since we currently are storing username as email in auth.ts
    return findUserByUsername(session.user.email);
}
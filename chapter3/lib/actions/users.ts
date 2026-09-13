import { findUserById, findUserByUsername, getUsers } from "@/lib/services/users";
import { ActionError } from "@/lib/exceptions";

export async function fetchAllUsers(username?: string) {
    try {
        return await getUsers(username);
    } catch (error) {
        console.log(error)
        if (error instanceof ActionError) throw error
        throw new ActionError(
            error instanceof Error ? error.message : "Failed to fetch blogs"
        )
    }
}

export async function getUserById(id: number) {
    try {
        let user = await findUserById(id)
        if (!user) throw new ActionError("User not found")
        return user
    } catch (error) {
        if (error instanceof ActionError) throw error
        throw new ActionError(
            error instanceof Error ? error.message : "Failed to fetch the user"
        )
    }
}

export async function getUserByUsername(username: string) {
    try {
        let user = await findUserByUsername(username)
        if (!user) throw new ActionError("User not found")
        return user
    } catch (error) {
        if (error instanceof ActionError) throw error
        throw new ActionError(
            error instanceof Error ? error.message : "Failed to fetch the user"
        )
    }
}
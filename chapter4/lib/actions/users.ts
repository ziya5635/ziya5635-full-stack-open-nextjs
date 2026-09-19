"use server";
import { addUser, findUserById, findUserByUsername, getUsers } from "@/lib/services/users";
import { ActionError, UsernameTakenError } from "@/lib/exceptions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function registerUser(
    prevState: { error?: string; field?: string },
    formData: FormData
) {
    const username = (formData.get("username") as string)?.trim();
    const name = (formData.get("name") as string)?.trim();
    const password = formData.get("password") as string;

    try {
        await addUser(username, name, password);

        revalidatePath("/users");
    } catch (error) {
        if (error instanceof UsernameTakenError) {
            return {
                error: "Username already taken",
                field: "username",
            };
        }
        console.error("registerUser failed", error);

        return {
            error: "Failed to create user",
        };
    }

    redirect("/login");
}
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
    prevState: { error: string; username: string; name: string; password: string; passwordConfirm: string },
    formData: FormData
) {
    const username = (formData.get("username") as string)?.trim();
    const name = (formData.get("name") as string)?.trim();
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    if (!username || username.length < 4) {
        return {
            error: "Username must be at least 4 characters long",
            username,
            name,
            password,
            passwordConfirm,
        };
    }
    if (!name) {
        return {
            error: "Name is required",
            username,
            name,
            password,
            passwordConfirm,
        };
    }
    if (!password || password.length < 4) {
        return {
            error: "Password must be at least 4 characters long",
            username,
            name,
            password,
            passwordConfirm,
        };
    }
    if (password !== passwordConfirm) {
        return {
            error: "Passwords do not match. Please try again.",
            passwordConfirm,
            username,
            name,
            password,
        };
    }

    try {
        await addUser(username, name, password);

        revalidatePath("/users");
    } catch (error) {
        if (error instanceof UsernameTakenError) {
            return {
                error: `Username under (${username}) already taken`,
                username,
                name,
                password,
                passwordConfirm,
            };
        }
        console.error("registerUser failed", error);

        return {
            error: "Failed to create user",
            username,
            name,
            password,
            passwordConfirm,
        };
    }

    redirect("/login");
}
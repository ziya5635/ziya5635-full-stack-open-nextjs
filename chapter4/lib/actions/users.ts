"use server";
import { addUser, findUserById, findUserByUsername, getUsers, updateUser } from "@/lib/services/users";
import { ActionError, UsernameTakenError } from "@/lib/exceptions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/services/session";
import { randomBytes } from "crypto";
import { hashToken } from "@/lib/token";

export async function fetchAllUsers(username?: string) {
    try {
        let users = await getUsers(username);
        return { users, success: true, error: "" };
    } catch (error) {
        if (error instanceof ActionError) {
            return { users: [], success: false, error: error.message };
        }
        console.error('Failed to fetch users:', error)
        return { users: [], success: false, error: "Failed to fetch users" };
    }
}

export async function getUserById(id: number) {
    try {
        let user = await findUserById(id)
        if (!user) {
            return { user: null, success: false, error: "User not found" }
        }
        return { user, success: true, error: "" }
    } catch (error) {
        if (error instanceof ActionError) {
            return { user: null, success: false, error: error.message };
        }
        console.error(error)
        return { user: null, success: false, error: "Failed to fetch the user" };
    }
}

export async function getUserByUsername(username: string) {
    try {
        let user = await findUserByUsername(username)
        if (!user) {
            return { user: null, success: false, error: "User not found" };
        }
        return { user, success: true, error: "" };
    } catch (error) {
        if (error instanceof ActionError) {
            return { user: null, success: false, error: error.message };
        }
        console.error(error)
        return { user: null, success: false, error: "Failed to fetch the user" };
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

export async function getCurrentUserAction() {
    try {
        let user = await getCurrentUser()
        if (!user) {
            return { user: null, success: false, error: "User not found" }
        }
        return { user, success: true, error: "" }
    } catch (error) {
        if (error instanceof ActionError) {
            return { user: null, success: false, error: error.message };
        }
        console.error(error)
        return { user: null, success: false, error: "Failed to fetch the user profile info" };
    }
}

export async function generateUserToken(
    prevState: { error?: string; token?: string },
    formData: FormData
): Promise<{ error?: string; token?: string }> {
    let user = await getCurrentUser();
    if (!user) {
        return { error: "User not found" };
    }

    try {
        const rawToken = randomBytes(32).toString("base64url");
        const tokenHash = hashToken(rawToken);

        let updatedUser = await updateUser(user.id, {
            token: tokenHash,
        });

        //continue by only showing raw token not the hashed one to user
        if (!updatedUser) {
            return { error: "Failed to update user with the new token" };
        }

        revalidatePath("/users");

        return { token: rawToken };
    } catch (error) {
        if (error instanceof UsernameTakenError) {
            return { error: error.message };
        }

        console.error("generateUserToken failed:", error);
        return { error: "Failed to generate token" };
    }
}
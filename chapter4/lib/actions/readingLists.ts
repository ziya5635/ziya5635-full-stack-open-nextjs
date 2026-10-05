"use server"

import { addToReadingList, getReadAndUnread, isInUserList, makeAsRead } from "@/lib/services/readingLists";
import { NotFoundError, UnauthenticatedError } from "@/lib/exceptions";
import { revalidatePath } from "next/cache";

export async function makeAsReadAction(prevState: { error?: string, success?: boolean }, formData: FormData) {
    try {
        const blogId = formData.get("blogId") as string;
        await makeAsRead(+blogId);
        revalidatePath("/me");
        return { success: true };
    } catch (error) {
        if (error instanceof UnauthenticatedError || error instanceof NotFoundError) {
            return { success: false, error: error.message };
        }
        console.log(error)
        return {
            success: false, error: "Failed to fetch user reading list "
        }
    }
}


export async function getReadAndUnreadAction() {
    try {
        let { read, unread } = await getReadAndUnread();
        return { success: true, read, unread, error: "" }

    } catch (error) {
        if (error instanceof UnauthenticatedError) {
            return { success: false, error: "Not logged in" };
        }
        console.log(error)
        return {
            success: false, error: "Failed to fetch user reading list "
        }
    }
}

export async function isInUserListAction(blogId: number) {
    try {
        const isInReadingList = await isInUserList(blogId);
        return { success: true, isInReadingList, error: "" }
    } catch (error) {
        if (error instanceof UnauthenticatedError) {
            return { success: true, isInReadingList: false, error: "" };
        }
        console.log(error)
        return { success: false, error: "Failed to find if the blog is in the user's list" };
    }
}

export async function addToReadingListAction(prevState: { success: boolean; error: string }, data: FormData) {
    try {
        const id = data.get('id') as string
        let listItem = await addToReadingList(+id)
        if (!listItem) {
            return { success: false, error: "Blog not added to the list" };
        }
        revalidatePath(`/blogs/${id}`)
        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof UnauthenticatedError) {
            return { success: false, error: error.message };
        }
        console.log(error)
        return { success: false, error: "Failed to add to the reading list" };
    }
}


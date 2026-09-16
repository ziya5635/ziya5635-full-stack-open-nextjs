'use server'
import { revalidatePath } from "next/cache";
import { addBlog, findBlogById, getBlogs, likeBlog } from "@/lib/services/blogs";
import { redirect } from "next/navigation";
import { ActionError, UnauthenticatedError } from "@/lib/exceptions";
import { auth } from "@/auth";

export async function createBlog(data: FormData) {
    const session = await auth();
    if (!session) redirect("/login");

    const url = data.get("url") as string;
    const author = data.get("author") as string;
    const title = data.get("title") as string;

    try {
        await addBlog(title, author, url);
        revalidatePath("/blogs");
    } catch (error) {
        if (error instanceof UnauthenticatedError) {
            redirect("/login");
        }

        if (error instanceof ActionError) throw error;

        throw new ActionError(
            error instanceof Error ? error.message : "Failed to create blogs"
        );
    }

    redirect("/blogs");
}

export async function fetchAllBlogs(title?: string) {
    try {
        return await getBlogs(title);
    } catch (error) {
        if (error instanceof ActionError) throw error
        throw new ActionError(
            error instanceof Error ? error.message : "Failed to fetch blogs"
        )
    }
}

export async function getBlogById(id: number) {
    try {
        let blog = await findBlogById(id)
        if (!blog) throw new ActionError("Blog not found")
        return blog
    } catch (error) {
        if (error instanceof ActionError) throw error
        throw new ActionError(
            error instanceof Error ? error.message : "Failed to fetch the blog"
        )
    }
}

export async function likeIt(data: FormData) {
    try {
        const id = data.get('id') as string
        let blog = await likeBlog(+id)
        if (!blog) throw new ActionError("Blog not found")
        revalidatePath('/blogs')
    } catch (error) {
        console.log(error)
        if (error instanceof ActionError) throw error
        throw new ActionError(
            error instanceof Error ? error.message : "Failed to like blog"
        )
    }
}

export async function searchByTitle(data: FormData) {
    const title = data.get('title') as string
    redirect(`/blogs?title=${title}`)
}
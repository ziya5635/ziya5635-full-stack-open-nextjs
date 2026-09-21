'use server'
import { revalidatePath } from "next/cache";
import { addBlog, findBlogById, getBlogs, likeBlog } from "@/lib/services/blogs";
import { redirect } from "next/navigation";
import { ActionError, UnauthenticatedError } from "@/lib/exceptions";
import { auth } from "@/auth";

export async function createBlog(prevState: { error?: string, success?: boolean, title?: string, author?: string, url?: string }, data: FormData) {
    let session = await auth();
    if (!session) redirect("/login");

    const title = data.get("title") as string;
    const author = data.get("author") as string;
    const url = data.get("url") as string;

    if (!title || title.length < 5) {
        return { success: false, error: "title must be at least 5 characters long", title, author, url }
    }

    if (!author || author.length < 5) {
        return { success: false, error: "author must be at least 5 characters long", title, author, url }
    }

    if (!url || url.length < 5) {
        return { success: false, error: "url must be at least 5 characters long", title, author, url }
    }

    try {
        await addBlog(title, author, url);
        revalidatePath("/blogs");
    } catch (error) {
        if (error instanceof UnauthenticatedError) {
            return { success: false, error: "user must be logged in", title, author, url }
            // redirect("/login");
        }

        if (error instanceof ActionError) {
            return { success: false, error: error.message, title, author, url }
        }
        console.error('Unable to create blogs:', error)
        return { success: false, error: 'Unable to create the blog', title, author, url }
    }
    return { success: true, error: "", title: "", author: "", url: "" }
    // redirect("/blogs");
}

export async function fetchAllBlogs(title?: string) {
    try {
        return { blogs: await getBlogs(title), success: true, error: "" };
    } catch (error) {
        console.log('Failed to fetch blogs:', error)
        if (error instanceof ActionError) {
            return { blogs: [], success: false, error: error.message };
        }
        return { blogs: [], success: false, error: "Failed to fetch blogs" };
    }
}

export async function getBlogById(id: number) {
    try {
        let blog = await findBlogById(id)
        if (!blog) {
            return { success: false, error: "Blog not found" };
        }
        return { success: true, error: "", blog };
    } catch (error) {
        console.log('Failed to fetch the blog:', error)
        if (error instanceof ActionError) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "Failed to fetch the blog" };
    }
}

export async function likeIt(prevState: { success: boolean; error: string }, data: FormData) {
    try {
        const id = data.get('id') as string
        let blog = await likeBlog(+id)
        if (!blog) {
            return { success: false, error: "Blog not found" };
        }
        revalidatePath('/blogs')
        return { success: true, error: "" };
    } catch (error) {
        console.log(error)
        if (error instanceof ActionError) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "Failed to like blog" };
    }
}

export async function searchByTitle(data: FormData) {
    const title = data.get('title') as string
    redirect(`/blogs?title=${title}`)
}
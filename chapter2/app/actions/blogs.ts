'use server'
import { revalidatePath } from "next/cache";
import { addBlog, findBlog, likeBlog } from "../services/blogs";
import { redirect } from "next/navigation";

export async function createBlog(data: FormData) {
    const url = data.get('url') as string
    const author = data.get('author') as string
    const title = data.get('title') as string
    addBlog(title, author, url)
    revalidatePath('/blogs')
    redirect('/blogs')
}

export async function getBlogById(id: number) {
    return findBlog(id);
}

export async function LikeIt(data: FormData) {
    const id = data.get('id') as string
    const blog = likeBlog(+id)
    if (blog) {
        revalidatePath('/blogs')
        revalidatePath(`/blogs/${id}`)
    }
}


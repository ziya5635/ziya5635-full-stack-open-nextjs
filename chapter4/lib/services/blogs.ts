import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";
import { getCurrentUser } from "./session";
import { UnauthenticatedError } from "@/lib/exceptions";

export function getBlogs(title?: string) {
    if (title) {
        return db.query.blogs.findMany({ where: ilike(blogs.title, `%${title}%`), orderBy: desc(blogs.likes) });
    }
    return db.query.blogs.findMany({ orderBy: desc(blogs.likes) });
}

export async function addBlog(title: string, author: string, url: string) {
    let user = await getCurrentUser()
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    return db.insert(blogs).values({ title, author, url, userId: user.id })
}

export function findBlogById(id: number) {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
    })
}

export async function likeBlog(id: number) {
    let blog = await findBlogById(id)
    if (!blog) return null

    let [updated] = await db
        .update(blogs)
        .set({ likes: sql`${blogs.likes} + 1` })
        .where(eq(blogs.id, id))
        .returning()

    return updated
}
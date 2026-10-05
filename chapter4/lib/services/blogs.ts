import { db } from "@/db";
import { blogs } from "@/db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { getCurrentUser } from "./session";
import { NotFoundError, UnauthenticatedError } from "@/lib/exceptions";
import { addToReadingList } from "./readingLists";

export function getBlogs(title?: string) {
    if (title) {
        //SQL query builder theme
        return db.select().from(blogs).where(ilike(blogs.title, `%${title}%`)).orderBy(desc(blogs.likes))
        //Relational query API theme
        // return db.query.blogs.findMany({ where: ilike(blogs.title, `%${title}%`), orderBy: desc(blogs.likes) });
    }
    return db.query.blogs.findMany({ orderBy: desc(blogs.likes) });
}

export async function addBlog(title: string, author: string, url: string) {
    let user = await getCurrentUser()
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    let [newBlog] = await db
        .insert(blogs)
        .values({ title, author, url, userId: user.id })
        .returning()

    await addToReadingList(newBlog.id);
    return newBlog;
    // return db.insert(blogs).values({ title, author, url, userId: user.id })
}

export function findBlogById(id: number) {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
    })
}

export async function likeBlog(id: number) {
    let [updated] = await db
        .update(blogs)
        .set({ likes: sql`${blogs.likes} + 1` })
        .where(eq(blogs.id, id))
        .returning()

    if (!updated) {
        throw new NotFoundError("Blog is not in your reading list");
    }
    return updated;
}

export async function isOwnedByUser(blogId: number) {
    let user = await getCurrentUser()
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    let existing = await db.query.readingList.findFirst({
        where: and(
            eq(blogs.userId, user.id),
            eq(blogs.id, blogId),
        ),
    });
    return existing ? true : false;
}

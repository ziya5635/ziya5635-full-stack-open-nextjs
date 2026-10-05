import { readingList } from "@/db/schema";
import { NotFoundError, UnauthenticatedError } from "@/lib/exceptions";
import { getCurrentUser } from "./session";
import { db } from "@/db";
import { and, desc, eq } from "drizzle-orm";

export async function makeAsRead(blogId: number) {
    let user = await getCurrentUser();
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    let [updated] = await db
        .update(readingList)
        .set({ read: true })
        .where(and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)))
        .returning()
    console.log(updated)

    if (!updated) {
        throw new NotFoundError("Blog is not in your reading list");
    }
    return updated;
}

export async function getReadAndUnread() {
    let user = await getCurrentUser();
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    let [read, unread] = await Promise.all([
        db.query.readingList.findMany({
            where: and(eq(readingList.userId, user.id), eq(readingList.read, true)),
            orderBy: [desc(readingList.id)],
            with: { blog: true },
        }),
        db.query.readingList.findMany({
            where: and(eq(readingList.userId, user.id), eq(readingList.read, false)),
            orderBy: [desc(readingList.id)],
            with: { blog: true },
        }),
    ]);

    return { read, unread };
}

export async function isInUserList(blogId: number) {
    let user = await getCurrentUser()
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    let existing = await db.query.readingList.findFirst({
        where: and(
            eq(readingList.userId, user.id),
            eq(readingList.blogId, blogId),
        ),
    });
    return existing ? true : false;
}

export async function addToReadingList(blogId: number) {
    let user = await getCurrentUser()
    if (!user) {
        throw new UnauthenticatedError("Not logged in");
    }
    let existing = await db.query.readingList.findFirst({
        where: and(
            eq(readingList.userId, user.id),
            eq(readingList.blogId, blogId),
        ),
    });
    if (existing) {
        return existing;
    }
    let [newListItem] = await db.insert(readingList).values({ userId: user.id, blogId }).returning();
    return newListItem;
}
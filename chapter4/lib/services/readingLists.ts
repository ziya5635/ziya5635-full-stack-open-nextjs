import { readingList } from "@/db/schema";
import { UnauthenticatedError } from "@/lib/exceptions";
import { getCurrentUser } from "./session";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

export async function isOwnedByUser(blogId: number) {
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
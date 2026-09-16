import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, eq, ilike } from "drizzle-orm";

export function getUsers(username?: string) {
    if (username) {
        return db.query.users.findMany({ where: ilike(users.username, `%${username}%`), orderBy: desc(users.username) });
    }
    return db.query.users.findMany()
}

export function findUserById(id: number) {
    return db.query.users.findFirst({
        where: eq(users.id, id),
        with: { blogs: true },
    })
}

export function findUserByUsername(username: string) {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true }, // this is a join using relations defined in db schema
    })
}
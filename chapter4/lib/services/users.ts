import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { desc, eq, ilike } from "drizzle-orm";
import { UsernameTakenError } from "@/lib/exceptions";

export function getUsers(username?: string) {
    if (username) {
        //SQL query builder theme
        return db.select().from(users).where(ilike(users.username, `%${username}%`)).orderBy(desc(users.username));
        // return db.query.users.findMany({ where: ilike(users.username, `%${username}%`), orderBy: desc(users.username) });
    }
    return db.select().from(users);
    // return db.query.users.findMany()
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

// Postgres unique violation
const UNIQUE_VIOLATION = "23505";

function isUniqueViolation(error: unknown): boolean {
    // Drizzle may nest the original driver error under `cause`
    const err = error as any;
    return err?.code === UNIQUE_VIOLATION || err?.cause?.code === UNIQUE_VIOLATION;
}

export async function addUser(username: string, name: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        return await db.insert(users).values({ username, name, passwordHash });
    } catch (error) {
        if (isUniqueViolation(error)) {
            throw new UsernameTakenError();
        }
        throw error;
    }
}

export async function updateUser(
    userId: number,
    userData: { name?: string; token?: string, username?: string }
) {
    if (!userData.name && !userData.token && !userData.username) {
        return;
    }

    let values: { name?: string; token?: string, username?: string } = {};
    if (userData.name !== undefined) values.name = userData.name;
    if (userData.token !== undefined) values.token = userData.token;
    if (userData.username !== undefined) values.username = userData.username;

    try {
        let [updated] = await db
            .update(users)
            .set(values)
            .where(eq(users.id, userId))
            .returning();

        return updated;
    } catch (error) {
        if (isUniqueViolation(error)) {
            throw new UsernameTakenError();
        }
        throw error;
    }
}
import {userTable} from "../../db/schema.js";
import {db} from "../../db/index.js";
import {eq} from "drizzle-orm";

const all = () => {
    return db
        .select()
        .from(userTable)
        .orderBy(userTable.id, "desc");
}

const create = (data: any) => {
    return db.insert(userTable).values(data).returning();
}

const findOrFail = (id: number) => {
    return db.select().from(userTable).where(eq(userTable.id, id));
}

const findByEmail = (email: any) => {
    return db.select().from(userTable).where(eq(userTable.email, email));
}

const update = (id: number, data: any) => {
    return db.update(userTable).set(data).where(eq(userTable.id, id)).returning();
}

const destroy = (id: number) => {
    return db.delete(userTable).where(eq(userTable.id, id)).returning();
}

export const User = {
    all,
    create,
    findOrFail,
    update,
    destroy,
    findByEmail
}
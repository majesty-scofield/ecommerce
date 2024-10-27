import {userTable} from "../../db/schema.js";
import {createInsertSchema} from "drizzle-zod";

export const createUserSchema = createInsertSchema(userTable).omit({
    id: true,
    role: true,
})

export const loginSchema = createInsertSchema(userTable).pick({
    email: true,
    password: true,
})
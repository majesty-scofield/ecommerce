import {product} from "../../db/schema.js";
import {db} from "../../db/index.js";
import {eq} from "drizzle-orm";

/**
 * Get all products
 */
const all = () => {
    return db
        .select()
        .from(product)
        .orderBy(product.id, 'desc');
}

/**
 * Create a new product
 * @param data
 */
const create = (data: any) => {
    return db.insert(product).values(data).returning();
}

/**
 * Get a product by id
 * @param id
 */
const findOrFail = (id: number) => {
    return db.select().from(product).where(eq(product.id, id));
}
/**
 * Update a product
 * @param id
 * @param data
 */
const update = (id: number, data: any) => {
    return db.update(product).set(data).where(eq(product.id, id)).returning();
}

/**
 * Delete a product
 * @param id
 */
const destroy = (id: number) => {
    return db.delete(product).where(eq(product.id, id)).returning();
}

export const Product = {
    all,
    create,
    findOrFail,
    update,
    destroy
}
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;

// Check if ECOMMERCE_API_DATABASE_URL is defined
if (!process.env.ECOMMERCE_API_DATABASE_URL) {
    throw new Error("ECOMMERCE_API_DATABASE_URL is not defined in the environment variables.");
}

const pool = new Pool({
    connectionString: process.env.ECOMMERCE_API_DATABASE_URL!,
});

// Test the database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Database connected successfully!");
    release(); // release the client back to the pool
});

export const db = drizzle({ client: pool });


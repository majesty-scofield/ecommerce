import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.ECOMMERCE_API_DATABASE_URL!,
    },
    verbose: true,
    strict: true,
});
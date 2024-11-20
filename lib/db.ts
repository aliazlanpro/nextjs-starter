import { env } from "@/env.mjs";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
export const pool = new Pool({
  connectionString: env.POSTGRES_URL,
  ssl: {
    ca: env.PG_SSL,
    rejectUnauthorized: true,
  },
});

export const db = drizzle(pool);

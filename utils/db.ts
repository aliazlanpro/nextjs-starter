import { env } from "@/env.mjs";
import { DB as AppDB } from "@/prisma/generated/client/types";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
const { Pool } = pg;

// PostgreSQL Kysely

export const pool = new Pool({
  connectionString: env.POSTGRES_URL,
  ssl: {
    ca: env.PG_SSL,
    rejectUnauthorized: true,
  },
});

export const appDbPool = new Pool({
  connectionString: env.POSTGRES_URL,
  ssl: {
    // Please re-download this certificate at least monthly to avoid expiry
    ca: env.PG_SSL,
    rejectUnauthorized: true,
  },
});

export const appDb = new Kysely<AppDB>({
  dialect: new PostgresDialect({ pool: appDbPool }),
});

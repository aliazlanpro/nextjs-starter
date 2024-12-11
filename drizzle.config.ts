import { defineConfig } from "drizzle-kit";
import { env } from "./env.mjs";
export default defineConfig({
  schema: "./schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
});

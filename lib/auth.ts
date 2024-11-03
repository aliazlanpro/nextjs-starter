import { betterAuth } from "better-auth";
import { pool } from "../schema";
import { env } from "../env.mjs";

export const auth = betterAuth({
  database: pool,
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
});

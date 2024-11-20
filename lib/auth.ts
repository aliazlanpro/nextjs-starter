import { betterAuth } from "better-auth";
import { db } from "./db";
import { env } from "../env.mjs";
import { oneTap } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.user,
      account: schema.account,
      session: schema.session,
      verification: schema.verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
  plugins: [oneTap()],
});

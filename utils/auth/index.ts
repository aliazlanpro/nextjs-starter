import { Lucia } from "lucia";

import { User } from "@/prisma/generated/client/types";
import { env } from "@/env.mjs";

import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";

import { Google } from "arctic";
import { appDbPool } from "../db";

const adapter = new NodePostgresAdapter(appDbPool, {
  user: "User",
  session: "Session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      image: attributes.image,
      createdAt: attributes.created_at,
      updatedAt: attributes.updated_at,
    };
  },
});

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.NEXT_PUBLIC_APP_URL + "login/google/callback"
);

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export interface DatabaseUserAttributes extends User {}

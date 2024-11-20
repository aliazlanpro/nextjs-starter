import { env } from "@/env.mjs";
import { createAuthClient } from "better-auth/react";
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [
    oneTapClient({
      clientId: env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
    }),
  ],
});

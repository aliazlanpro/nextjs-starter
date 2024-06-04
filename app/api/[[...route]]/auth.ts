import { lucia } from "@/utils/auth";
import { getSession } from "@/utils/auth/session";
import { Hono } from "hono";
import { cookies } from "next/headers";

const app = new Hono().post("/logout", async (c) => {
  const { session } = await getSession();
  if (!session) {
    return c.json("Not logged in", 401);
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return c.json("Logged out", 200);
});

export default app;

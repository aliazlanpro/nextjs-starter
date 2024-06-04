import { cookies } from "next/headers";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
import { google, lucia } from "@/utils/auth";
import { redirects } from "@/utils/constants";
import { appDb } from "@/utils/db";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
      headers: { Location: redirects.toLogin },
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );

    const googleUserRes = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser = (await googleUserRes.json()) as GoogleUser;

    if (!googleUser.email || !googleUser.email_verified) {
      return new Response(
        JSON.stringify({
          error: "Your Google account must have a verified email address.",
        }),
        { status: 400, headers: { Location: redirects.toLogin } }
      );
    }

    const existingUser = await appDb
      .selectFrom("User")
      .where("email", "=", googleUser.email)
      .select("id")
      .executeTakeFirst();
    if (existingUser) {
      const existingOAuthUser = await appDb
        .selectFrom("OAuthAccount")
        .where("OAuthAccount.userId", "=", existingUser.id)
        .where("OAuthAccount.providerId", "=", "google")
        .executeTakeFirst();
      if (!existingOAuthUser) {
        await appDb
          .insertInto("OAuthAccount")
          .values({
            providerId: "google",
            providerUserId: googleUser.sub,
            userId: existingUser.id,
          })
          .execute();
      }
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    } else {
      const userId = generateId(21);
      const newUser = await appDb
        .insertInto("User")
        .values({
          name: googleUser.name,
          id: userId,
          email: googleUser.email,
          image: googleUser.picture,
          ...(googleUser.email_verified && {
            emailVerified: new Date(Date.now()),
          }),
        })
        .returning(["id", "created_at", "emailVerified"])
        .executeTakeFirstOrThrow();
      await appDb
        .insertInto("OAuthAccount")
        .values({
          providerId: "google",
          providerUserId: googleUser.sub,
          userId: newUser.id,
        })
        .executeTakeFirst();

      const session = await lucia.createSession(newUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    return new Response(null, {
      status: 302,
      headers: { Location: redirects.afterLogin },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: "Invalid code" }), {
        status: 400,
      });
    }

    console.log(e);

    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}

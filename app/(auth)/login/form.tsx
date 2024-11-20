"use client";

import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirects } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginForm() {
  const [clickedGoogle, setClickedGoogle] = useState(false);

  const router = useRouter();

  async function oneTap() {
    await authClient.oneTap({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push(redirects.afterLogin);
        },
      },
    });
  }
  useEffect(() => {
    oneTap();
  }, []);

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirects.afterLogin,
    });
  };

  return (
    <form>
      <Button
        text="Continue with Google"
        onClick={() => {
          setClickedGoogle(true);
          signInWithGoogle();
        }}
        loading={clickedGoogle}
        icon={<GoogleIcon className="h-4 w-4" />}
        type="button"
      />
    </form>
  );
}

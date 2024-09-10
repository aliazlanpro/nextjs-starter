"use client";

import { signInWithGoogle } from "@/actions/auth";
import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export function LoginForm() {
  const [clickedGoogle, setClickedGoogle] = useState(false);

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

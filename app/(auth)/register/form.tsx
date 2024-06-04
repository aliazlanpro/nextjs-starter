"use client";

import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export function RegisterForm() {
  const [clickedGoogle, setClickedGoogle] = useState(false);

  return (
    <a href="/login/google">
      <Button
        text="Continue with Google"
        onClick={() => {
          setClickedGoogle(true);
        }}
        loading={clickedGoogle}
        icon={<GoogleIcon className="h-4 w-4" />}
      />
    </a>
  );
}

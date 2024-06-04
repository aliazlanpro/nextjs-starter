import { ThemeSelect } from "@/components/global/theme-select";

import { getSession } from "@/utils/auth/session";
import LogoutButton from "@/components/auth/logout-button";
import { Suspense } from "react";
import { RegisterForm } from "../(auth)/register/form";
import { ProgressBarLink } from "@/components/global/progress-bar";

export default function Home() {
  return (
    <main>
      Starter Template
      <ProgressBarLink href={`/hello`}>Hello</ProgressBarLink>
      <ThemeSelect />
      <Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </Suspense>
    </main>
  );
}

async function Auth() {
  const { user } = await getSession();
  if (!user) return <RegisterForm />;
  return <LogoutButton />;
}

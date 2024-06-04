import { ThemeSelect } from "@/components/global/theme-select";
import { RegisterForm } from "./(auth)/register/form";
import { getSession } from "@/utils/auth/session";
import LogoutButton from "@/components/auth/logout-button";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      Starter Template
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

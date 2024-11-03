import { ThemeSelect } from "@/components/global/theme-select";
import LogoutButton from "@/components/auth/logout-button";
import { Suspense } from "react";
import { ProgressBarLink } from "@/components/global/progress-bar";
import { LoginForm } from "../(auth)/login/form";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default function Home() {
  return (
    <main className="container-x py-20 min-h-screen">
      <h1 className="text-4xl font-bold">Starter Template</h1>
      <ProgressBarLink
        className=" text-blue-500 mt-5 underline"
        href={`/hello`}
      >
        Hello
      </ProgressBarLink>
      <ThemeSelect />
      <Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </Suspense>
    </main>
  );
}

async function Auth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <LoginForm />;
  return (
    <div className="flex flex-col items-center space-y-4 mt-5 p-6 bg-background rounded-lg shadow-md">
      <Image
        src={session.user.image || "/default-avatar.png"}
        width={100}
        height={100}
        alt={session.user.name || "User avatar"}
        className="rounded-full border-2 border-primary"
      />
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          {session.user.name}
        </h2>
        <p className="text-sm text-muted-foreground">{session.user.email}</p>
      </div>
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}

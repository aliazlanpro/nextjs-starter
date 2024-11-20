"use client";
import { toast } from "sonner";
import React, { Dispatch, SetStateAction } from "react";
import { LoadingSpinnerIcon } from "../icons/loading-spinner";
import { ExitIcon } from "@radix-ui/react-icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { redirects } from "@/lib/constants";

export default function LogoutButton() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Logout
      setLoading={setLoading}
      className="flex items-center justify-start space-x-2 truncate"
    >
      {loading ? (
        <LoadingSpinnerIcon className="h-4 w-4" />
      ) : (
        <ExitIcon className="h-4 w-4" />
      )}
      <span className=" text-sm truncate">Sign Out</span>
    </Logout>
  );
}

interface LogoutProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export function Logout({
  className,
  children,
  setLoading,
  ...props
}: LogoutProps) {
  const router = useRouter();

  async function logout() {
    try {
      setLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
            router.push(redirects.afterLogout);
          },
        },
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error occured logging out.");
      setLoading(false);
    }
  }
  return (
    <span {...props} className={className} onClick={logout}>
      {children}
    </span>
  );
}

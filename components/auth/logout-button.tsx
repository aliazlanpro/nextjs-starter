"use client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { redirects } from "@/utils/constants";
import { LoadingSpinnerIcon } from "../icons/loading-spinner";
import { ExitIcon } from "@radix-ui/react-icons";

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
      await axios.post("/api/auth/logout");
      router.push(redirects.afterLogout);
      router.refresh();
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

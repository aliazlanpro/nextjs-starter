"use client";

import React, { ReactNode } from "react";

import { useFormStatus } from "react-dom";
import { LoadingSpinnerIcon } from "../icons/loading-spinner";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "danger"
    | "ghost";
  loading?: boolean;
  icon?: ReactNode;
  shortcut?: string;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { text, variant = "primary", loading, icon, shortcut, className, ...props },
    ref
  ) => {
    const status = useFormStatus();

    return (
      <button
        // if onClick is passed, it's a "button" type, otherwise it's being used in a form, hence "submit"
        type={props.onClick ? "button" : "submit"}
        className={cn(
          "group flex h-9 w-full items-center  justify-center space-x-2 rounded-md border px-4 text-sm font-medium transition-all focus:outline-none flex-shrink-0",
          props.disabled || loading || status.pending
            ? "cursor-not-allowed  border-border   bg-accent dark:text-accent-foreground/30 "
            : {
                "bg-primary text-primary-foreground shadow hover:bg-primary/90":
                  variant === "primary",
                "bg-secondary text-secondary-foreground shadow-sm  hover:bg-secondary/70 hover:border-foreground":
                  variant === "secondary",
                "border-transparent text-slate-500 transition-all duration-75 hover:bg-slate-100":
                  variant === "outline",
                "border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500":
                  variant === "success",
                "border-red-500 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2":
                  variant === "danger",
                "hover:bg-accent hover:text-accent-foreground border-none":
                  variant === "ghost",
              },
          className
        )}
        disabled={props.disabled || loading || status.pending}
        {...props}
      >
        {loading || status.pending ? (
          <LoadingSpinnerIcon />
        ) : icon ? (
          icon
        ) : null}
        <p>{text}</p>
        {shortcut && (
          <kbd className="hidden rounded bg-zinc-700 px-2 py-0.5 text-xs font-light text-slate-400 transition-all duration-75 group-hover:bg-slate-100 group-hover:text-slate-500 md:inline-block">
            {shortcut}
          </kbd>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

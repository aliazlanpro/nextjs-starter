"use client";

import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { Skeleton } from "@/components/ui/skeleton";

type Theme = "dark" | "system" | "light";

type Props = {
  currentTheme?: Theme;
};

const ThemeIcon = ({ currentTheme }: Props) => {
  switch (currentTheme) {
    case "dark":
      return <MoonIcon className=" size-3.5" />;
    case "system":
      return <DesktopIcon className=" size-3.5" />;
    default:
      return <SunIcon className=" size-3.5" />;
  }
};

export const ThemeSelect = () => {
  const isMounted = useIsMounted();
  const { theme, setTheme, themes } = useTheme();
  return (
    <div>
      {isMounted ? (
        <div className="flex items-center relative">
          <Select
            defaultValue={theme}
            onValueChange={(value: Theme) => setTheme(value)}
          >
            <SelectTrigger className="w-full pl-8 pr-3 py-1.5 bg-transparent outline-none  h-[32px] text-xs rounded-sm">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {themes.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {theme === "system"
                      ? "Sync with system"
                      : theme === "dark"
                      ? "Dark mode"
                      : "Light mode"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="absolute left-2 pointer-events-none">
            <ThemeIcon currentTheme={theme as Theme} />
          </div>
        </div>
      ) : (
        <Skeleton className="h-8 rounded-sm w-full" />
      )}
    </div>
  );
};

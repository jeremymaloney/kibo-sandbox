"use client";

import { useTheme } from "@/contexts/theme-context";
import { Button } from "./ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-theme-sm items-center">
      <span className="text-theme-sm font-medium mr-2 text-foreground">
        Theme:
      </span>
      <Button
        onClick={() => setTheme("red")}
        variant={theme === "red" ? "default" : "outline"}
        size="sm"
      >
        Red (Compact)
      </Button>
      <Button
        onClick={() => setTheme("blue")}
        variant={theme === "blue" ? "default" : "outline"}
        size="sm"
      >
        Blue (Spacious)
      </Button>
    </div>
  );
}


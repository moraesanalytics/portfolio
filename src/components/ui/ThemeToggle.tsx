"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-heading"
    >
      {/* Visibility is CSS-driven to avoid a hydration mismatch. */}
      <Moon className="size-[18px] dark:hidden" strokeWidth={1.75} />
      <Sun className="hidden size-[18px] dark:block" strokeWidth={1.75} />
    </button>
  );
}

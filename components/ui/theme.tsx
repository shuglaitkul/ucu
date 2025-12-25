"use client";
import { useStore } from "@/stores/useStore";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "./button";
import { Sun } from "../animate-ui/icons/sun";
import { Moon } from "../animate-ui/icons/moon";
import { AnimateIcon } from "../animate-ui/icons/icon";

export function ThemeIcon() {
  const setDark = useStore((s) => s.setDark);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const current = resolvedTheme ?? theme;
    if (current) setDark(current === "dark");
  }, [theme, resolvedTheme, setDark]);

  const current = resolvedTheme ?? theme;
  const isDark = current === "dark";

  return (
    <Button
      variant="logo"
      size="logo"
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setTheme(next);
        setDark(next === "dark");
      }}
    >
      <AnimateIcon animateOnHover>
        {isDark ? <Sun key="sun" /> : <Moon key="moon" />}
      </AnimateIcon>
    </Button>
  );
}

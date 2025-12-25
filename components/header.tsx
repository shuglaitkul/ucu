"use client";
import { useEffect, useState } from "react";
import { Logo } from "./ui/logo";
import { ThemeIcon } from "./ui/theme";
import { useStore } from "@/stores/useStore";
import { AvatarIcon } from "./ui/avatar";

export function Header() {
  const [time, setTime] = useState(getCurrentTime());
  const { user } = useStore();

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 z-10 w-full h-16 bg-background flex items-center px-6 border-b border-border">
      <div className="flex items-center justify-between w-full ">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <div className="text-xl font-medium text-foreground hidden md:block">
            {time}
          </div>
          <ThemeIcon />
          {user && (
            <AvatarIcon />
          )}
        </div>
      </div>
    </nav>
  );
}

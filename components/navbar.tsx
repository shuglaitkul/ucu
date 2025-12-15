"use client";
import { useEffect, useState } from "react";
import { Logo } from "./ui/logo";
import { ThemeIcon } from "./ui/theme";
import { Button } from "./ui/button";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { AvatarIcon } from "./ui/avatar";

export function Navbar() {
  const [time, setTime] = useState(getCurrentTime());
  const { logout, user } = useStore();
  const router = useRouter();

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
    <nav className="w-full h-16 bg-background flex items-center px-6 border-b border-border">
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

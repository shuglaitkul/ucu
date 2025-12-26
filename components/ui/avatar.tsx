"use client";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { User } from "../animate-ui/icons/user";

export function AvatarIcon() {
  const { logout, user } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="logo" size="logo">
          <AnimateIcon animateOnHover>
            <User size={30}/>
          </AnimateIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="font-bold">
          {user?.username}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleLogout}>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

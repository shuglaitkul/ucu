"use client"

import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";

export default function Main() {
  const { logout } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    console.log('[main page] logout')
    logout();
    router.push('/auth');
  };

  return (
    <div>
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );
}

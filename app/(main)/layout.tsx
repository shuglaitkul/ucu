"use client";

import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isHydrated } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated) {
    return <div></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Проверка авторизации...
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <Navbar />
      <main className="absolute top-0 left-0 w-full h-full pt-16">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

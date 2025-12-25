"use client";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";
import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isHydrated, user } = useStore();
  const router = useRouter();

  useEffect(() => {
    console.log("[main page] mount", { isAuthenticated, user });
    if (isHydrated && !isAuthenticated) {
      console.log("[main page] not authenticated -> /auth");
      router.push("/auth");
      return;
    }
  }, [isAuthenticated, isHydrated, router, user]);

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

  const role = user?.role;

  return (
    <div>
      {role === "planner" || role === "checker" ? (
        <div className="relative h-screen overflow-hidden">
          <Header />
          <main className="absolute top-0 left-0 w-full h-full pt-16">
            {children}
          </main>
        </div>
      ) : (
        <div className="flex">
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </div>
      )}
    </div>
  );
};

export default MainLayout;

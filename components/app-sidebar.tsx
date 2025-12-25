"use client";
import { initialContainers } from "@/lib/containers";
import { Logo } from "./ui/logo";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { useStore } from "@/stores/useStore";
import { CraneContainers } from "./crane/components/crane-containers";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useStore();
  const role = user?.role;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-0">
              <a href="#">
                <Logo />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {role === "crane" ? (
        <>
          <SidebarGroupLabel className="text-md text-foreground h-4 mt-2">
            Активные задачи
          </SidebarGroupLabel>
          <SidebarGroupLabel>Найдено контейнеров: {initialContainers.length}</SidebarGroupLabel>
        </>
      ) : null}
      {role === "crane" ? <CraneContainers /> : null}
    </Sidebar>
  );
}

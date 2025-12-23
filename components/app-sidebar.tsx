import { initialContainers } from "@/lib/containers";
import { Card } from "./ui/card";
import { Logo } from "./ui/logo";
import { Sidebar, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel, SidebarGroupContent, SidebarContent } from "./ui/sidebar";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarGroup>
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
        <SidebarGroupLabel className="text-lg text-foreground font-semibold h-4 mt-2">
          Активные задачи
        </SidebarGroupLabel>
        <SidebarGroupLabel>Найдено контейнеров: 20</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {initialContainers.map((container) => (
              <SidebarMenuItem key={container.id}>
                <Card className="px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="mb-1.5 text-foreground text-sm">
                      {container.name}
                    </h3>
                    <div className="space-y-0.5">
                      <p className="text-xs text-secondary-foreground">
                        Маршрут : {container.countryFrom} -{">"}{" "}
                        {container.countryTo}
                      </p>
                      <div className="flex flex-row justify-between">
                        <p className="text-xs text-secondary-foreground">
                          Вес: {container.weight} т
                        </p>
                        <p className="text-xs text-secondary-foreground">
                          Зона: {container.zone}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}

import { Card } from "@/components/ui/card";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { initialContainers } from "@/lib/containers";

export function CraneContainers() {
  return (
    <SidebarGroup>
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
  );
}

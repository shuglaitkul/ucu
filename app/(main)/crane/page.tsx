import AppSidebar from "@/components/app-sidebar";
import { CraneContent } from "@/components/crane/crane-content";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Crane() {
  return (
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
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <CraneContent />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ContainerCard } from "./container-card";
import { Container } from "@/lib/containers";
import { filterActiveContainers } from "@/lib/container-utils";

interface StatusColumnProps {
  status: string;
  containers: Container[];
}

export function StatusColumn({ status, containers }: StatusColumnProps) {
  const actualContainers = filterActiveContainers(containers);

  const { setNodeRef } = useDroppable({
    id: status,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "прибыл":
        return "border-l-blue-500";
      case "в обработке":
        return "border-l-amber-500";
      case "готов к отправке":
        return "border-l-emerald-500";
      case "отправлен":
        return "border-l-violet-500";
      case "отменен":
        return "border-l-rose-500";
      case "поломка оборудования":
        return "border-l-orange-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="status-col flex flex-col bg-secondary/70 rounded-lg border p-3 w-full">
      <div
        className={`${getStatusColor(
          status
        )} bg-background rounded-md px-2 py-2 mb-3 border-l-4 flex flex-row items-center justify-between text-xs font-medium w-53`}
      >
        <h2 className="text-secondary-foreground uppercase tracking-wide truncate">
          {status}
        </h2>
        <p className="text-muted-foreground md:pl-2 lg:pl-0">
          {containers.length}
        </p>
      </div>
      <div ref={setNodeRef} className="flex-1 overflow-y-auto scrollbar">
        <SortableContext
          items={actualContainers.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {actualContainers.map((container) => (
            <ContainerCard key={container.id} container={container} />
          ))}
        </SortableContext>
        {containers.length === 0 && (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-md">
            <p className="text-muted-foreground text-xs">Пусто</p>
          </div>
        )}
      </div>
    </div>
  );
}

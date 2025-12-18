import { Container } from "@/lib/containers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { isFinished, isOlderThanAWeek } from "@/lib/container-utils";

interface ContainerCardProps {
  container: Container;
}

export function ContainerCard({ container }: ContainerCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: container.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isDraggable = !(isFinished(container) && isOlderThanAWeek(container));

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-card rounded-md border p-3 mb-2 transition-colors ${
        isDragging ? "opacity-40" : "hover:bg-muted/40"
      }`}
    >
      <div className="flex items-start gap-2">
        {isDraggable && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mt-0.5"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="mb-1.5 text-foreground text-sm">{container.name}</h3>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              Отправление: {container.country}
            </p>
            <p className="text-xs text-muted-foreground">
              Вес: {container.weight} т
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

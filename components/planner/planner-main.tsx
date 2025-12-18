"use client";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { StatusColumn } from "./components/status-column";
import { ChevronDown, GripVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "../animate-ui/icons/sliders-horizontal";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { RotateCcw } from "../animate-ui/icons/rotate-ccw";
import { Clock } from "../animate-ui/icons/clock";

interface Container {
  id: string;
  name: string;
  country: string;
  weight: number;
  status: string;
}

const STATUSES = [
  "прибыл",
  "в обработке",
  "готов к отправке",
  "отправлен",
  "отменен",
  "поломка оборудования",
];

const initialContainers: Container[] = [
  {
    id: "1",
    name: "CONT-001",
    country: "Китай",
    weight: 15.5,
    status: "прибыл",
  },
  {
    id: "2",
    name: "CONT-002",
    country: "Казахстан",
    weight: 22.3,
    status: "прибыл",
  },
  {
    id: "3",
    name: "CONT-003",
    country: "Казахстан",
    weight: 18.7,
    status: "в обработке",
  },
  {
    id: "4",
    name: "CONT-004",
    country: "Кыргызстан",
    weight: 20.1,
    status: "в обработке",
  },
  {
    id: "5",
    name: "CONT-005",
    country: "Казахстан",
    weight: 16.8,
    status: "готов к отправке",
  },
  {
    id: "6",
    name: "CONT-006",
    country: "Китай",
    weight: 19.4,
    status: "готов к отправке",
  },
  {
    id: "7",
    name: "CONT-007",
    country: "Узбекистан",
    weight: 21.2,
    status: "отправлен",
  },
  {
    id: "8",
    name: "CONT-008",
    country: "Казахстан",
    weight: 17.9,
    status: "отправлен",
  },
  {
    id: "9",
    name: "CONT-009",
    country: "Казахстан",
    weight: 14.6,
    status: "отменен",
  },
  {
    id: "10",
    name: "CONT-010",
    country: "Китай",
    weight: 23.1,
    status: "поломка оборудования",
  },
];

export default function PlannerMainPage() {
  const [containers, setContainers] = useState<Container[]>(initialContainers);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(STATUSES);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = containers.find((c) => c.id === activeId);
    if (!activeContainer) return;

    if (STATUSES.includes(overId)) {
      setContainers((containers) =>
        containers.map((c) =>
          c.id === activeId ? { ...c, status: overId } : c
        )
      );
      return;
    }

    const overContainer = containers.find((c) => c.id === overId);
    if (!overContainer) return;

    if (activeContainer.status !== overContainer.status) {
      setContainers((containers) =>
        containers.map((c) =>
          c.id === activeId ? { ...c, status: overContainer.status } : c
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = containers.find((c) => c.id === activeId);
    const overContainer = containers.find((c) => c.id === overId);

    if (!activeContainer) return;

    if (overContainer && activeContainer.status === overContainer.status) {
      const activeIndex = containers.findIndex((c) => c.id === activeId);
      const overIndex = containers.findIndex((c) => c.id === overId);

      setContainers((containers) =>
        arrayMove(containers, activeIndex, overIndex)
      );
    }
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    if (selectedStatuses.length === 0) {
      return (
        <div className="text-muted-foreground text-sm">Статусы не выбраны</div>
      );
    }
  };

  const activeContainer = activeId
    ? containers.find((c) => c.id === activeId)
    : null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto">
        <header className="flex flex-row justify-between mb-6">
          <div>
            <h1 className="text-foreground mb-1 text-2xl">
              Расписание составов
            </h1>
            <p className="text-secondary- text-sm">
              Перетаскивайте контейнеры между статусами
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <AnimateIcon animateOnHover>
              <Button>
                История <Clock />
              </Button>
            </AnimateIcon>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AnimateIcon animateOnHover>
                  <Button variant="outline" className="text-xs">
                    Фильтр <SlidersHorizontal />
                  </Button>
                </AnimateIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-54">
                {STATUSES.map((status) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={status}
                      className="capitalize"
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => toggleStatus(status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  );
                })}
                <div className="border-t mt-1 pt-1">
                  <AnimateIcon animateOnHover>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-normal"
                      onClick={() => setSelectedStatuses(STATUSES)}
                    >
                      <RotateCcw />
                      Сбросить фильтр
                    </Button>
                  </AnimateIcon>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {selectedStatuses.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground px-2">
              Выберите хотя бы один статус
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar">
              {STATUSES.filter((status) =>
                selectedStatuses.includes(status)
              ).map((status) => (
                <StatusColumn
                  key={status}
                  status={status}
                  containers={containers.filter((c) => c.status === status)}
                />
              ))}
            </div>
          )}

          <DragOverlay>
            {activeContainer ? (
              <div className="bg-background rounded-md border border-border p-3 shadow-lg w-[210px]">
                <div className="flex items-start gap-2">
                  <div className="text-gray-400 mt-0.5">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1.5 text-foreground text-sm">
                      {activeContainer.name}
                    </h3>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        Отправление: {activeContainer.country}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Вес: {activeContainer.weight} т
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

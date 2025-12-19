"use client";
import { useState } from "react";
import { StatusColumn } from "./components/status-column";
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
import {
  Container,
  initialContainers,
  VISIBLE_STATUSES,
} from "@/lib/containers";
import { Dialog, DialogContent } from "../ui/dialog";
import { ContainerDetails } from "./components/container-details";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Layers } from "../animate-ui/icons/layers";

export default function PlannerMainPage() {
  const [containers, setContainers] = useState<Container[]>(initialContainers);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    VISIBLE_STATUSES.map((s) => s.id)
  );
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null
  );

  const toggleStatus = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId)
        ? prev.filter((s) => s !== statusId)
        : [...prev, statusId]
    );
  };

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
              <Button onClick={() => (window.location.href = "/main/history")}>
                История <Clock />
              </Button>
            </AnimateIcon>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AnimateIcon animateOnHover>
                  <Button variant="outline">
                    Фильтр <SlidersHorizontal />
                  </Button>
                </AnimateIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-54">
                {VISIBLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={status.id}
                      className="capitalize"
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={() => toggleStatus(status.id)}
                    >
                      {status.label}
                    </DropdownMenuCheckboxItem>
                  );
                })}
                <div className="border-t mt-1 pt-1">
                  <AnimateIcon animateOnHover>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-normal"
                      onClick={() =>
                        setSelectedStatuses(VISIBLE_STATUSES.map((s) => s.id))
                      }
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
        {selectedStatuses.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground px-2">
            Выберите хотя бы один статус
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar items-end">
            {VISIBLE_STATUSES.filter((status) =>
              selectedStatuses.includes(status.id)
            ).map((status) => (
              <StatusColumn
                key={status.id}
                status={status.label}
                containers={containers.filter((c) => c.status === status.label)}
                onContainerClick={setSelectedContainer}
              />
            ))}
          </div>
        )}
        <Dialog
          open={!!selectedContainer}
          onOpenChange={() => setSelectedContainer(null)}
        >
          <DialogContent className="bg-card">
            <DialogTitle></DialogTitle>
            {selectedContainer && (
              <ContainerDetails container={selectedContainer} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { RotateCcw } from "../animate-ui/icons/rotate-ccw";
import { Button } from "../ui/button";
import { List } from "../animate-ui/icons/list";
import { SlidersHorizontal } from "../animate-ui/icons/sliders-horizontal";
import { ContainerCard } from "./components/container-card";
import { Container } from "@/lib/containers";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { filterFinishedOldContainers } from "@/lib/container-utils";

interface ContainersProps {
  containers: Container[];
  onContainerClick: (container: Container) => void;
}

export default function PlannerHistoryPage({
  containers,
  onContainerClick,
}: ContainersProps) {
  const finishedContainers = filterFinishedOldContainers(containers);

  const containersByMonth: Record<string, Container[]> = {};
  finishedContainers.forEach((c) => {
    const month = format(new Date(c.sentDate!), "LLLL yyyy", { locale: ru });
    if (!containersByMonth[month]) containersByMonth[month] = [];
    containersByMonth[month].push(c);
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto">
        <header className="flex flex-row justify-between mb-6">
          <h1 className="text-foreground mb-1 text-2xl">История</h1>
          <div className="flex flex-row gap-2 items-center">
            <AnimateIcon animateOnHover>
              <Button onClick={() => (window.location.href = "/main")}>
                Расписание <List />
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
                {/* календарь */}
                {/* <div className="border-t mt-1 pt-1">
                  <AnimateIcon animateOnHover>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-normal"
                    >
                      <RotateCcw />
                      Сбросить фильтр
                    </Button>
                  </AnimateIcon>
                </div> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="space-y-6">
          {Object.entries(containersByMonth).map(([month, containers]) => (
            <div key={month}>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <hr className="flex-1 border-t border-border" />
                <span className="px-10">{`${month}`}</span>
                <hr className="flex-1 border-t border-border" />
              </div>

              <div className="grid grid-cols-6 gap-2">
                {containers.map((container) => (
                  <ContainerCard
                    key={container.id}
                    container={container}
                    onClick={onContainerClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

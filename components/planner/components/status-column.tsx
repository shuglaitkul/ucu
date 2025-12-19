import { ContainerCard } from "./container-card";
import { Container } from "@/lib/containers";
import { filterActiveContainers } from "@/lib/container-utils";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Layers } from "@/components/animate-ui/icons/layers";
interface StatusColumnProps {
  status: string;
  containers: Container[];
  onContainerClick: (container: Container) => void;
}

export function StatusColumn({
  status,
  containers,
  onContainerClick,
}: StatusColumnProps) {
  const actualContainers = filterActiveContainers(containers);
  const [open, setOpen] = React.useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const filteredContainers = actualContainers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "прибыл":
        return "border-l-blue-500";
      case "в обработке":
        return "border-l-amber-500";
      case "готов к отправке":
        return "border-l-emerald-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="status-col flex flex-col bg-card rounded-lg border p-3 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={`${getStatusColor(
              status
            )} bg-background rounded-md px-2 py-2 mb-3 border-l-4 text-xs font-medium cursor-pointer`}
            onClick={() => setIsSearching(true)}
          >
            {isSearching ? (
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onBlur={() => {
                  if (!search) setIsSearching(false);
                }}
                placeholder="Поиск контейнера"
                className="w-full bg-transparent outline-none text-xs"
              />
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="uppercase tracking-wide truncate">{status}</h2>
                <p className="text-muted-foreground">
                  {filteredContainers.length}
                </p>
              </div>
            )}
          </div>
        </PopoverTrigger>
      </Popover>
      <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 overflow-y-auto scrollbar">
        {filteredContainers.map((container) => (
          <ContainerCard
            key={container.id}
            container={container}
            onClick={onContainerClick}
          />
        ))}
        {containers.length === 0 && (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-md">
            <p className="text-muted-foreground text-xs">Пусто</p>
          </div>
        )}
      </div>
      {status == "готов к отправке" && (
        <div className="flex justify-center mt-4">
          <AnimateIcon animateOnHover>
            <Button>
              Сортировать
              <Layers />
            </Button>
          </AnimateIcon>
        </div>
      )}
    </div>
  );
}

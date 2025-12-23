import { ContainerCard } from "./container-card";
import { Container } from "@/lib/containers";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Layers } from "@/components/animate-ui/icons/layers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
  const [open, setOpen] = React.useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [forwarder, setForwarder] = useState<string>("");
  const [timeSelected, setTimeSelected] = useState<string>("");
  const [appliedFilter, setAppliedFilter] = useState<{
    forwarder?: string;
    time?: string;
  } | null>(null);
  const [plannedMap, setPlannedMap] = useState<Record<string, string>>({});

  const pad = (n: number) => n.toString().padStart(2, "0");
  const now = new Date();
  const minTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  let filteredContainers = containers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  // compute planned forwarders (unique) and remaining (unplanned) containers
  const plannedForwarderMap = new Map<string, string>();
  containers.forEach((c) => {
    const t = plannedMap[c.id];
    if (t && c.forwarder) plannedForwarderMap.set(c.forwarder, t);
  });
  const plannedItems = Array.from(plannedForwarderMap.entries());

  const remainingContainers = filteredContainers.filter((c) => !plannedMap[c.id]);

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
                  {status === "готов к отправке" ? remainingContainers.length : filteredContainers.length}
                </p>
              </div>
            )}
          </div>
        </PopoverTrigger>
      </Popover>
      <div className="flex-1 min-h-0">
        {status == "готов к отправке" && plannedItems.length > 0 ? (
          <div className="col-span-full mb-2">
            <div className="text-xs text-muted-foreground mb-1">Запланированные</div>
            <div className="flex flex-col gap-2">
              {plannedItems.map(([forwarderName, time]) => (
                <div
                  key={forwarderName}
                  className="flex items-center justify-between gap-2 p-2 bg-muted/5 border border-border rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium truncate">{forwarderName}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{time}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 overflow-y-auto scrollbar">
          {(status === "готов к отправке" ? remainingContainers : filteredContainers).map((container) => (
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
      </div>
      {status == "готов к отправке" && (
        <div className="mt-4">
          <div className="flex justify-center">
            <AnimateIcon animateOnHover>
              <Button onClick={() => setDialogOpen(true)}>
                Сортировать
                <Layers />
              </Button>
            </AnimateIcon>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Сортировка готовых контейнеров</DialogTitle>
              </DialogHeader>

              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">
                  Экспедитор
                </label>
                <select
                  className="w-full rounded-md border px-2 py-1 bg-background"
                  value={forwarder}
                  onChange={(e) => setForwarder(e.target.value)}
                >
                  <option value="">Все</option>
                  {Array.from(new Set(containers.map((c) => c.forwarder)))
                    .filter(Boolean)
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>

                <label className="text-sm text-muted-foreground">Время отправки (сегодня)</label>
                <input
                  type="time"
                  min={minTime}
                  className="w-full rounded-md border px-2 py-1 bg-background"
                  value={timeSelected}
                  onChange={(e) => setTimeSelected(e.target.value)}
                />
              </div>

              <DialogFooter>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setPlannedMap((prev) => {
                        const copy = { ...prev };
                        containers.forEach((c) => {
                          if (c.forwarder === forwarder) delete copy[c.id];
                        });
                        return copy;
                      });
                      setForwarder("");
                      setTimeSelected("");
                      setAppliedFilter(null);
                      setDialogOpen(false);
                    }}
                  >
                    Очистить
                  </Button>
                  <Button
                    disabled={!forwarder || !timeSelected || timeSelected < minTime}
                    onClick={() => {
                      if (!forwarder || !timeSelected) return;
                      setPlannedMap((prev) => {
                        const copy = { ...prev };
                        containers.forEach((c) => {
                          if (c.forwarder === forwarder) copy[c.id] = timeSelected;
                        });
                        return copy;
                      });
                      setAppliedFilter({ forwarder: forwarder, time: timeSelected });
                      setDialogOpen(false);
                    }}
                  >
                    Применить
                  </Button>
                </div>
              </DialogFooter>
              <DialogClose />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

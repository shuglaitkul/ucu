"use client";

import React, { useMemo, useState } from "react";
import { ContainerCard } from "./container-card";
import { Container } from "@/lib/containers";
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
import { Badge } from "@/components/ui/badge";
interface StatusColumnProps {
  status: string;
  containers: Container[];
  onContainerClick: (container: Container) => void;
  onStatusChange?: (ids: string[], status: string) => void;
  plannedMap?: Record<string, string>;
  onApplyPlanned?: (ids: string[], forwarder: string, time: string) => void;
  onClearPlanned?: (forwarder: string) => void;
  processingContainers?: Container[];
}

export function StatusColumn({
  status,
  containers,
  onContainerClick,
  onStatusChange,
  onApplyPlanned,
  onClearPlanned,
  plannedMap,
  processingContainers,
}: StatusColumnProps) {
  const [open, setOpen] = React.useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [forwarder, setForwarder] = useState<string>("");
  const [timeSelected, setTimeSelected] = useState<string>("");
  const pad = (n: number) => n.toString().padStart(2, "0");
  const now = new Date();
  const minTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const filteredContainers = useMemo(
    () =>
      containers.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [containers, search]
  );

  const plannedForwarderMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of containers) {
      const t = plannedMap?.[c.id];
      if (t && c.forwarder) m.set(c.forwarder, t);
    }
    return m;
  }, [containers, plannedMap]);

  const plannedItems = useMemo(
    () => Array.from(plannedForwarderMap.entries()),
    [plannedForwarderMap]
  );

  const plannedGroups = useMemo(() => {
    const groups = new Map<string, Container[]>();
    for (const c of containers) {
      if (plannedMap?.[c.id] && c.forwarder) {
        const arr = groups.get(c.forwarder) || [];
        arr.push(c);
        groups.set(c.forwarder, arr);
      }
    }
    return groups;
  }, [containers, plannedMap]);

  const [expandedForwarders, setExpandedForwarders] = useState<
    Record<string, boolean>
  >({});

  const remainingContainers = useMemo(
    () => filteredContainers.filter((c) => !plannedMap?.[c.id]),
    [filteredContainers, plannedMap]
  );

  const statusColorMap: Record<string, string> = {
    прибыл: "border-l-blue-500",
    "в обработке": "border-l-amber-500",
    "готов к отправке": "border-l-emerald-500",
  };
  const getStatusColor = (s: string) =>
    statusColorMap[s] ?? "border-l-gray-300";

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
                  {status === "в обработке" || status === "готов к отправке"
                    ? remainingContainers.length
                    : filteredContainers.length}
                </p>
              </div>
            )}
          </div>
        </PopoverTrigger>
      </Popover>
      <div className="flex-1 min-h-0">
        {status == "готов к отправке" && plannedItems.length > 0 ? (
          <div className="col-span-full mb-2">
            <div className="text-xs text-muted-foreground mb-1">
              Запланированные
            </div>
            <div className="flex flex-col gap-2">
              {plannedItems.map(([forwarderName, time]) => (
                <div key={forwarderName}>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setExpandedForwarders((prev) => ({
                        ...prev,
                        [forwarderName]: !prev[forwarderName],
                      }))
                    }
                    className="w-full flex items-center justify-between gap-2 p-2 bg-muted/5 border border-border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium truncate">
                        {forwarderName}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {plannedGroups.get(forwarderName)?.length ?? 0}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{time}</div>
                  </Button>
                  {expandedForwarders[forwarderName] && (
                    <div className="mt-2 grid lg:grid-cols-2 gap-2">
                      {(plannedGroups.get(forwarderName) || []).map((c) => (
                        <ContainerCard
                          key={c.id}
                          container={c}
                          onClick={onContainerClick}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 overflow-y-auto scrollbar">
          {(status === "в обработке" || status === "готов к отправке"
            ? remainingContainers
            : filteredContainers
          ).map((container) => (
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
                  {Array.from(
                    new Set(
                      (processingContainers ?? containers).map(
                        (c) => c.forwarder
                      )
                    )
                  )
                    .filter(Boolean)
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>

                <label className="text-sm text-muted-foreground">
                  Время отправки (сегодня)
                </label>
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
                      if (typeof onClearPlanned === "function") {
                        onClearPlanned(forwarder);
                      }
                      setForwarder("");
                      setTimeSelected("");
                      setDialogOpen(false);
                    }}
                  >
                    Очистить
                  </Button>
                  <Button
                    disabled={
                      !forwarder || !timeSelected || timeSelected < minTime
                    }
                    onClick={() => {
                      if (!forwarder || !timeSelected) return;
                      const source = processingContainers ?? containers;
                      const matchedIds = source
                        .filter((c) => c.forwarder === forwarder)
                        .map((c) => c.id);
                      if (typeof onApplyPlanned === "function") {
                        onApplyPlanned(matchedIds, forwarder, timeSelected);
                      }
                      setDialogOpen(false);
                      if (typeof onStatusChange === "function") {
                        onStatusChange(matchedIds, "готов к отправке");
                      }
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

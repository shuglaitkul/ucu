"use client";
import { ContainerDetails } from "@/components/planner/components/container-details";
import PlannerHistoryPage from "@/components/planner/planner-history";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Container, initialContainers } from "@/lib/containers";
import { useState } from "react";

export default function MainPage() {
  const [containers] = useState<Container[]>(initialContainers);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null
  );

  return (
    <div>
      <PlannerHistoryPage
        containers={containers}
        onContainerClick={setSelectedContainer}
      />
      <Dialog
        open={!!selectedContainer}
        onOpenChange={() => setSelectedContainer(null)}
      >
        <DialogContent>
          <DialogTitle></DialogTitle>
          {selectedContainer && (
            <ContainerDetails container={selectedContainer} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

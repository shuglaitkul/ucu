"use client";   
import PlannerHistoryPage from "@/components/planner/planner-history";
import { Container, initialContainers } from "@/lib/containers";
import { useState } from "react";

export default function MainPage() {
  const [containers] = useState<Container[]>(initialContainers);

  return (
    <div>
      <PlannerHistoryPage containers={containers} />
    </div>
  );
}

"use client";

import { redirect } from "next/navigation";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user-store";
import { PlusCircle, PlusIcon } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUserStore();
  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Your Diagrams">
        <Button>
          <PlusIcon size={16} className="mr-2" /> New Diagram
        </Button>
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="workflow" />
          <EmptyPlaceholder.Title>No Diagrams Created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any diagrams yet. Start creating diagrams.
          </EmptyPlaceholder.Description>
          <Button variant="outline">
            <PlusIcon size={16} className="mr-2" /> New Diagram
          </Button>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );
}

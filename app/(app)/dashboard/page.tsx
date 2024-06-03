"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, List, PlusIcon, Workflow } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDiagramStore from "@/store/diagram-store";
import useDashboardView from "@/store/dashboard-view-store";
import DiagramsGrid from "@/components/dashboard/diagrams-grid";
import DiagramsList from "@/components/dashboard/diagrams-table";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { IconSpinner } from "@/components/ui/icons";
import { Icons } from "@/components/shared/icons";
import { createNewDiagram } from "@/actions/db-actions";

export default function DashboardPage() {
  const { dashboardType, changeDashboardType } = useDashboardView();
  const { diagrams, isFetching, fetchDiagrams } = useDiagramStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateDiagram = async () => {
    setIsLoading(true);
    await createNewDiagram({
      diagram_name: "Untitled Diagram",
      diagram_language: "mermaid",
    });
    setIsLoading(false);
    fetchDiagrams(); // Ensure diagrams are re-fetched after creation
  };

  useEffect(() => {
    fetchDiagrams();
  }, [fetchDiagrams]);

  const renderLoadingState = () => (
    <DashboardShell>
      <DashboardHeader heading="Your Diagrams">
        <div className="flex flex-row items-center gap-2">
          <Button className="rounded-full" onClick={handleCreateDiagram}>
            {isLoading ? (
              <IconSpinner className="mr-2 size-4" />
            ) : (
              <PlusIcon className="mr-2 size-4" />
            )}
            <span className="hidden md:block"> New Diagram</span>
          </Button>
        </div>
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="workflow" />
          <EmptyPlaceholder.Title className="flex flex-row items-center gap-2">
            <Icons.spinner className="mr-2" />
            Loading...
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Fetching your diagrams
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );

  const renderEmptyState = () => (
    <DashboardShell>
      <DashboardHeader heading="Your Diagrams">
        <div className="flex flex-row items-center gap-2">
          <Button className="rounded-full" onClick={handleCreateDiagram}>
            <PlusIcon size={16} className="mr-2 " />
            <span className="hidden md:block"> New Diagram</span>
          </Button>
        </div>
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="workflow" />
          <EmptyPlaceholder.Title>No Diagrams created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any diagrams yet. Start creating!
          </EmptyPlaceholder.Description>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleCreateDiagram}
          >
            {isLoading ? (
              <IconSpinner className="mr-2 size-4" />
            ) : (
              <PlusIcon className="mr-2 size-4" />
            )}
            <span className="hidden md:block">New Diagram</span>
          </Button>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );

  const renderDiagrams = () => (
    <Tabs defaultValue={dashboardType}>
      <DashboardShell>
        <DashboardHeader heading="Your Diagrams">
          <div className="flex flex-row items-center gap-2">
            <TabsList className="rounded-full">
              <TabsTrigger
                value="grid"
                onClick={() => changeDashboardType("grid")}
                className="rounded-full py-[7px]"
              >
                <LayoutGrid size={16} />
              </TabsTrigger>
              <TabsTrigger
                value="list"
                onClick={() => changeDashboardType("list")}
                className="rounded-full py-[7px]"
              >
                <List size={16} />
              </TabsTrigger>
            </TabsList>
            <Button className="rounded-full" onClick={handleCreateDiagram}>
              {isLoading ? (
                <IconSpinner className="md:mr-2 size-4" />
              ) : (
                <PlusIcon className="md:mr-2 size-4" />
              )}
              <span className="hidden md:block"> New Diagram</span>
            </Button>
          </div>
        </DashboardHeader>
        <div>
          <TabsContent value="grid">
            <DiagramsGrid diagrams={diagrams} />
          </TabsContent>
          <TabsContent value="list">
            <DiagramsList diagrams={diagrams} />
          </TabsContent>
        </div>
      </DashboardShell>
    </Tabs>
  );

  if (isFetching) {
    return renderLoadingState();
  }

  if (!diagrams?.length) {
    return renderEmptyState();
  }

  return renderDiagrams();
}

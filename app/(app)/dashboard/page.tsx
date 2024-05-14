"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, PlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDiagramStore from "@/store/diagram-store";
import { useEffect, useState } from "react";
import useDashboardView from "@/store/dashboard-view-store";
import DiagramsGrid from "@/components/dashboard/diagrams-grid";
import DiagramsList from "@/components/dashboard/diagrams-table";

export default function DashboardPage() {
  const { dashboardType, changeDashboardType } = useDashboardView();
  const { diagrams, fetchDiagrams } = useDiagramStore();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchDiagrams();
  }, []);

  return (
    <Tabs defaultValue={dashboardType}>
      <DashboardShell>
        <DashboardHeader heading="Your Diagrams">
          <div className="flex flex-row items-center gap-2">
            <TabsList className="rounded-full ">
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
            <Button className="rounded-full">
              <PlusIcon size={16} className="mr-2 " /> New Diagram
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
}

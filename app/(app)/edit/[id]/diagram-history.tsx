import { fetchDiagramVersions } from "@/actions/db-actions";
import MermaidPreview from "@/components/dashboard/mermaid-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DiagramVersion, useDiagramVersionStore } from "@/store/editor-store";
import { Eye } from "lucide-react";
import { useState, useEffect, Suspense } from "react";

function DiagramHistory({ diagramId }: { diagramId: string }) {
  const { diagramVersions, setDiagramVersions } = useDiagramVersionStore();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const data = (await fetchDiagramVersions(diagramId)) as DiagramVersion[];
      setDiagramVersions(data);
      setIsFetching(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 overflow-scroll max-h-[calc(100vh-50px)]">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] ">Title</TableHead>
            <TableHead className="text-center">Language</TableHead>

            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diagramVersions.map((version: DiagramVersion) => (
            <TableRow key={version.version_id}>
              <TableCell className="font-medium text-sm  w-full text-wrap text-ellipsis">
                {version.version_name}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{version.diagram_language}</Badge>
              </TableCell>
              <TableCell className="flex flex-row gap-2 items-center">
                <Badge variant="outline">
                  <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger asChild className="cursor-pointer">
                      <Eye className="size-3" />
                    </HoverCardTrigger>
                    <HoverCardContent
                      className=" bg-background p-0 m-0 border-none overflow-hidden"
                      side={"left"}
                    >
                      <Suspense>
                        <MermaidPreview
                          chart={version.diagram_code as string}
                        />
                      </Suspense>
                    </HoverCardContent>
                  </HoverCard>
                </Badge>

                <Badge variant="default" className="cursor-pointer">
                  Restore
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DiagramHistory;

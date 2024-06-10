"use client";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tables } from "@/types/supabase";
import timesago from "@/utils/timesago";
import MermaidPreview from "./mermaid-preview";
import { Suspense, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { DeleteDiagram } from "./delete-diagram";
import { RenameDiagram } from "./rename-diagram";
import Link from "next/link";
import { Dialog, DialogContent } from "../ui/dialog";
import MermaidFullScreen from "@/app/(app)/edit/[id]/mermaid-full-screen";

export type Diagram = Tables<"diagrams">;

interface DiagramsListProps {
  diagrams: Diagram[] | null;
}

const ITEMS_PER_PAGE = 9;

export default function DiagramsGrid({ diagrams }: DiagramsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((diagrams?.length || 0) / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [selectedDiagram, setSelectedDiagram] = useState<string>("");
  const [selectedDiagramName, setSelectedDiagramName] = useState<string | null>(
    ""
  );
  const [fullScreenDialogOpen, setFullScreenDialogOpen] =
    useState<boolean>(false);
  const [selectedDiagramCode, setSelectedDiagramCode] = useState<string>("");

  const currentDiagrams = diagrams?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-6">
        {currentDiagrams.map((diagram) => (
          <Card
            key={diagram.id}
            className=" bg-background  cursor-pointer  shadow-none  rounded-lg"
          >
            <AspectRatio
              ratio={16 / 9}
              onClick={() => router.push(`/edit/${diagram.id}`)}
              className="overflow-hidden p-2"
            >
              <Suspense
                fallback={
                  <Skeleton className="h-full w-full rounded bg-muted/50" />
                }
              >
                <MermaidPreview diagramCode={diagram.code as string} />
              </Suspense>
            </AspectRatio>
            <div className="flex px-6 pb-2 flex-row items-center justify-between gap-2 pt-3">
              <Button
                variant={"link"}
                className="p-0 m-0"
                onClick={() => router.push(`/edit/${diagram.id}`)}
              >
                {diagram.diagram_name}
              </Button>
              <Badge
                variant="outline"
                className="text-muted-foreground font-normal"
              >
                {diagram.diagram_language}
              </Badge>
            </div>
            <div className="flex px-6 flex-row justify-between items-center gap-2 mt-0 my-0 pt-0 pb-2">
              <p className="text-muted-foreground text-sm">
                {timesago(diagram.last_updated_at as string)}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background z-40">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center space-x-2.5"
                    onClick={() => {
                      setSelectedDiagramCode(diagram.code as string);
                      setFullScreenDialogOpen(true);
                    }}
                  >
                    <Maximize2 className="size-3 " />
                    <p className="text-sm">Preview</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2.5"
                    onClick={() => {
                      setSelectedDiagram(diagram.id as string);
                      setRenameDialogOpen(true);
                      setSelectedDiagramName(diagram.diagram_name);
                    }}
                  >
                    <Pencil className="size-3" />
                    <p className="text-sm">Rename</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2.5"
                    onClick={() => {
                      setSelectedDiagram(diagram.id as string);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="size-3 text-red-600 " />
                    <p className="text-sm text-red-600">Delete</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      <div>
        {totalPages > 1 && (
          <div className=" mb-20 flex flex-row items-center justify-between ">
            <Pagination className="flex-end flex w-full justify-end">
              <div>
                <Button variant={"link"} disabled={currentPage === 1}>
                  <Link
                    href={"#"}
                    className="px-0 flex flex-row items-center gap-1"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeft className="size-3 text-muted-foreground" />
                    Previous
                  </Link>
                </Button>
                <div className="flex-1  items-center  inline-block  text-sm text-muted-foreground text-ellipsis">
                  {currentPage} / {totalPages}
                </div>
                <Button variant={"link"} disabled={currentPage === totalPages}>
                  <Link
                    href={"#"}
                    className="px-0 flex flex-row items-center gap-1"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                    <ChevronRight className="size-3 text-muted-foreground" />
                  </Link>
                </Button>
              </div>
            </Pagination>
          </div>
        )}
      </div>

      <DeleteDiagram
        diagramId={selectedDiagram}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />

      <RenameDiagram
        diagramId={selectedDiagram}
        renameDialogOpen={renameDialogOpen}
        setRenameDialogOpen={setRenameDialogOpen}
        diagramName={selectedDiagramName}
      />
      <Dialog
        open={fullScreenDialogOpen}
        onOpenChange={setFullScreenDialogOpen}
      >
        <DialogContent className="w-[90vw] p-0 flex min-w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] overflow-scroll ">
          <MermaidFullScreen code={selectedDiagramCode} />
        </DialogContent>
      </Dialog>
    </>
  );
}

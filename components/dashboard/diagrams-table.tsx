"use client";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tables } from "@/types/supabase";
import { formatDate } from "@/utils/utils";
import timesago from "@/utils/timesago";
import MermaidPreview from "./mermaid-preview";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export type Diagram = Tables<"diagrams">;

// Assuming Diagram is imported from your types
interface DiagramsListProps {
  diagrams: Diagram[] | null;
}

const ITEMS_PER_PAGE = 10;

export default function DiagramsList({ diagrams }: DiagramsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((diagrams?.length || 0) / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentDiagrams = diagrams?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Diagram Name</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Last edited</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDiagrams.map((diagram) => (
            <TableRow key={diagram.id} className="cursor-pointer">
              <TableCell className="font-medium">
                <Button className="" variant={"link"}>
                  {diagram.diagram_name}
                </Button>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{diagram.diagram_language}</Badge>
              </TableCell>
              <TableCell>
                {timesago(diagram.last_updated_at as string)}
              </TableCell>
              <TableCell className="flex flex-row items-center gap-2">
                <HoverCard openDelay={0} closeDelay={0}>
                  <HoverCardTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className=" bg-background p-0 m-0 border-none overflow-hidden"
                    side={"left"}
                  >
                    <Suspense>
                      <MermaidPreview chart={diagram.code as string} />
                    </Suspense>
                  </HoverCardContent>
                </HoverCard>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center space-x-2.5">
                      <Pencil className="size-3" />
                      <p className="text-sm">Edit</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2.5">
                      <Trash2 className="size-3" />
                      <p className="text-sm">Delete</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className=" mb-20 flex flex-row items-center justify-between ">
          <Pagination className="flex-end flex w-full justify-end">
            <PaginationContent>
              <Button variant={"ghost"} disabled={currentPage === 1}>
                <PaginationPrevious
                  className="px-0"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </Button>
              <div className="flex-1  items-center  inline-block  text-sm text-muted-foreground text-ellipsis">
                {currentPage} / {totalPages}
              </div>
              <Button variant={"ghost"} disabled={currentPage === totalPages}>
                <PaginationNext
                  className="px-0"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </Button>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

"use client";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { Tables } from "@/types/database.types";
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

export type Diagram = Tables<"diagrams">;

interface DiagramsListProps {
  diagrams: Diagram[] | null;
}

const ITEMS_PER_PAGE = 6;

export default function DiagramsGrid({ diagrams }: DiagramsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((diagrams?.length || 0) / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const router = useRouter();

  const currentDiagrams = diagrams?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-0">
          {currentDiagrams.map((diagram) => (
            <Card
              key={diagram.id}
              onClick={() => router.push(`/dashboard/${diagram.id}`)}
              className=" bg-background  cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out dark:hover:shadow-neutral-950  rounded-lg"
            >
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden p-2 rounded-lg"
              >
                <Suspense
                  fallback={<Skeleton className="h-64 w-full rounded-lg" />}
                >
                  <MermaidPreview chart={diagram.code as string} />
                </Suspense>
              </AspectRatio>
              <div className="flex px-6 pb-2 flex-row items-center justify-between gap-2 pt-3">
                {diagram.diagram_name}
                <Badge variant="outline">{diagram.diagram_language}</Badge>
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
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center space-x-2.5">
                      <Pencil className="size-3" />
                      <p className="text-sm">Rename</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2.5">
                      <Trash2 className="size-3" />
                      <p className="text-sm">Delete</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
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
    </>
  );
}

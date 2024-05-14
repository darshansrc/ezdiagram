"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteDiagram } from "@/actions/db-actions";
import { IconSpinner } from "../ui/icons";

import useDiagramStore from "@/store/diagram-store";
import { useToast } from "@/components/ui/use-toast";

export function DeleteDiagram({
  diagramId,
  deleteDialogOpen,
  setDeleteDialogOpen,
}: {
  diagramId: string;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
}) {
  //   const router = useRouter();
  const [isRemovePending, startRemoveTransition] = React.useTransition();
  const { removeDiagram } = useDiagramStore();
  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your Diagram and remove your data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full"
              disabled={isRemovePending}
              onClick={(event) => {
                event.preventDefault();
                // @ts-ignore
                startRemoveTransition(async () => {
                  try {
                    await deleteDiagram(diagramId);
                    removeDiagram(diagramId);

                    setDeleteDialogOpen(false);
                  } catch (e) {
                    console.error(e);
                  }
                });
              }}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

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
import {
  deleteDiagram,
  updateDiagramName as updateName,
} from "@/actions/db-actions";
import { IconSpinner } from "../ui/icons";

import useDiagramStore from "@/store/diagram-store";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";

export function RenameDiagram({
  diagramId,
  renameDialogOpen,
  setRenameDialogOpen,
  diagramName,
}: {
  diagramId: string;
  renameDialogOpen: boolean;
  setRenameDialogOpen: (open: boolean) => void;
  diagramName: string | null;
}) {
  //   const router = useRouter();
  const [isRemovePending, startRemoveTransition] = React.useTransition();
  const { updateDiagramName, removeDiagram } = useDiagramStore();
  const { toast } = useToast();
  const [newName, setNewName] = React.useState<string>("");

  console.log(diagramId, diagramName);

  return (
    <>
      <AlertDialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Diagram</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                className="rounded-full"
                defaultValue={diagramName as string}
                onChange={(e) => setNewName(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full "
              disabled={isRemovePending}
              onClick={(event) => {
                event.preventDefault();
                // @ts-ignore
                startRemoveTransition(async () => {
                  try {
                    await updateName(diagramId, newName);
                    updateDiagramName(diagramId, newName);

                    setRenameDialogOpen(false);
                  } catch (e) {
                    console.error(e);
                  }
                });
              }}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

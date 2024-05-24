import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bookmark } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useDiagramCodeStore,
  useDiagramConfigStore,
  useDiagramLanguageStore,
  useDiagramNotesStore,
  useDiagramThemeStore,
} from "@/store/editor-store";
import { saveDiagramVersion } from "@/actions/db-actions";
import { IconSpinner } from "@/components/ui/icons";
import { toast } from "sonner";

const SaveDiagram = ({ diagramId }: { diagramId: string }) => {
  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [versionName, setVersionName] = React.useState(
    `Diagram - ${new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    })}, ${new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })}`
  );

  const { diagramCode } = useDiagramCodeStore();
  const { diagramConfig } = useDiagramConfigStore();
  const { diagramLanguage } = useDiagramLanguageStore();
  const { diagramNotes } = useDiagramNotesStore();
  const { diagramTheme } = useDiagramThemeStore();

  const diagramData: {
    version_name: string;
    diagram_id: string;
    diagram_code: string;
    diagram_config: string;
    diagram_language: string;
    diagram_notes: string;
    diagram_theme: string;
  } = {
    version_name: versionName,
    diagram_id: diagramId,
    diagram_code: diagramCode,
    diagram_config: diagramConfig,
    diagram_language: diagramLanguage,
    diagram_notes: diagramNotes,
    diagram_theme: diagramTheme,
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto gap-1.5 text-sm flex items-center"
        onClick={() => setSaveDialogOpen(true)}
      >
        <Bookmark className="size-3.5" />
        Save
      </Button>
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Diagram</DialogTitle>
            <DialogDescription>
              {/* This action cannot be undone. This will permanently delete your
              account and remove your data from our servers. */}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Diagram Title</Label>
            <Input
              id="name"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                setIsSaving(true);
                await saveDiagramVersion(diagramData);
                setIsSaving(false);
                setSaveDialogOpen(false);
                toast.success("Diagram saved successfully");
              }}
              className="flex flex-row items-center gap-1.5"
            >
              {isSaving && <IconSpinner className="size-3" />}
              {isSaving ? "Saving" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveDiagram;

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

const SaveDiagram = () => {
  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
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
              defaultValue={`Diagram - ${new Date().toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                }
              )}, ${new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}`}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveDiagram;

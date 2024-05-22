import { updateDiagramName } from "@/actions/db-actions";
import { Button } from "@/components/ui/button";
import { IconSpinner } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

interface DiagramNameProps {
  initialDiagramName: string;
  diagramId: string;
}

const DiagramName: React.FC<DiagramNameProps> = ({
  initialDiagramName,
  diagramId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [diagramName, setDiagramName] = useState(initialDiagramName);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagramNameChange = (newName: string) => {
    setDiagramName(newName);
  };

  const handleSaveDiagramName = async () => {
    try {
      setIsLoading(true);
      await updateDiagramName(diagramId, diagramName);
      setIsEditing(false);
      toast.success("Diagram name updated successfully!");
    } catch (error) {
      console.error("Error updating diagram name:", error);
      toast.error("Failed to update diagram name. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDiagramName(initialDiagramName);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex flex-row items-center gap-2">
          <Input
            className="text-sm font-semibold w-fit text-ellipsis shadow-none"
            value={diagramName}
            onChange={(e) => handleDiagramNameChange(e.target.value)}
          />
          <Button
            variant="default"
            disabled={isLoading}
            className="flex flex-row gap-1 items-center"
            onClick={handleSaveDiagramName}
          >
            {isLoading && <IconSpinner className="size-4" />}
            Save
          </Button>
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </div>
      ) : (
        <h2
          onClick={() => setIsEditing(true)}
          className="text-sm font-semibold cursor-pointer"
        >
          {diagramName || ""}
        </h2>
      )}
    </div>
  );
};

export default DiagramName;

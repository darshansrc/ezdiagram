import MermaidPreview from "@/components/dashboard/mermaid-preview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Suspense, useState } from "react";
import MermaidRenderer from "./mermaid-renderer";
import MermaidTemplatePreview from "./mermaid-template-preview";
import { templates } from "./ai-templates";

export function AiTemplateModal() {
  const diagramTypes = [
    "Flowchart",
    "Sequence Diagram",
    "Mindmap",
    "Class Diagram",
    "State Diagram",
    "ER Diagram",
    "C4 Diagram",
    "User Journey",
    "Gantt Diagram",
    "Pie Chart",
    "Quadrant Chart",
    "Requirement Diagram",
    "Git Graph",
    "Timeline",
    "Sankey Diagram",
    "XY Chart",
    "Block Diagram",
  ];

  const [selectedDiagram, setSelectedDiagram] = useState("auto");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleDiagramClick = (diagram) => {
    setSelectedDiagram(diagram);
    setSelectedTemplate(null); // Reset selected template when changing diagram type
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <Dialog>
      <Select value={selectedDiagram}>
        <DialogTrigger asChild>
          <SelectTrigger>
            {selectedTemplate?.name || "Select Diagram Type"}
          </SelectTrigger>
        </DialogTrigger>
      </Select>

      <DialogContent className="min-w-[90vw] max-w-[90vw] min-h-[90vh] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Diagram Template</DialogTitle>
          <DialogDescription>
            Select a template to create a new diagram
          </DialogDescription>
        </DialogHeader>
        <div className="flex relative flex-row items-start gap-4 py-0">
          <ScrollArea className="h-[75vh]  w-64 border-r ">
            <div className="px-4 pt-2 pb-32">
              {diagramTypes.map((diagram) => (
                <div
                  key={diagram}
                  className={`text-sm cursor-pointer p-2 px-4 my-2 rounded-lg ${
                    selectedDiagram === diagram
                      ? "bg-foreground text-white  dark:text-neutral-900"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleDiagramClick(diagram)}
                >
                  {diagram}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex-1 px-4">
            {selectedDiagram !== "auto" && (
              <ScrollArea className="h-[75vh]  ">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4  ">
                  {templates[selectedDiagram]?.map((template) => (
                    <div
                      key={template.name}
                      className={`border flex flex-col justify-center items-center p-4 rounded-lg  cursor-pointer ${
                        selectedTemplate === template
                          ? "border-blue-500 bg-blue-100"
                          : "hover:bg-muted dark:bg-muted/50"
                      }`}
                      onClick={() => handleTemplateClick(template)}
                    >
                      <div className="p-2">
                        <Suspense>
                          <MermaidTemplatePreview
                            diagramCode={template.code}
                            key={template.name}
                          />
                        </Suspense>
                      </div>
                      <h5 className="text-sm font-semibold">{template.name}</h5>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

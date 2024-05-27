import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Suspense, useState } from "react";
import MermaidTemplatePreview from "./mermaid-template-preview";
import { templates, diagramTypes } from "./ai-templates";

export interface AiTemplateModalProps {
  selectedDiagramType: string;
  setSelectedDiagramType: React.Dispatch<React.SetStateAction<string>>;
  templateModalOpen: boolean;
  setTemplateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTemplate: any;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<any>>;
}

export function AiTemplateModal(props: AiTemplateModalProps) {
  const {
    selectedDiagramType,
    setSelectedDiagramType,
    templateModalOpen,
    setTemplateModalOpen,
    selectedTemplate,
    setSelectedTemplate,
  } = props;

  const handleDiagramClick = (diagram: string) => {
    setSelectedDiagramType(diagram);
    setSelectedTemplate(null);
  };

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template);
    setTemplateModalOpen(false);
  };

  return (
    <Dialog open={templateModalOpen} onOpenChange={setTemplateModalOpen}>
      <Select value={selectedDiagramType}>
        <DialogTrigger className="max-w-full" asChild>
          <SelectTrigger>
            {selectedDiagramType} -{" "}
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
                    selectedDiagramType === diagram
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
            {selectedDiagramType !== "auto" && (
              <ScrollArea className="h-[75vh]  ">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4  ">
                  {templates[selectedDiagramType]?.map((template) => (
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

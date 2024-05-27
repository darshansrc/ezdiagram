import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Textarea from "react-textarea-autosize";
import MarkdownPreview from "@uiw/react-markdown-preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IconOpenAI, IconSpinner } from "@/components/ui/icons";
import { Switch } from "@/components/ui/switch";
import { CornerDownLeft } from "lucide-react";
import { useChat } from "ai/react";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { useTheme } from "next-themes";
import { MermaidOutput } from "./mermaid-output";
import { MermaidBlock } from "./mermaid-block";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { AiTemplateModal } from "./ai-template-modal";
import { diagramTypes, templates } from "./ai-templates";

const NewAiDiagram = () => {
  const [explanation, setExplanation] = React.useState("diagram");
  const [diagramSize, setDiagramSize] = useState("auto");
  const [replaceCurrentDiagram, setReplaceCurrentDiagram] =
    React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(
    "anthropic.claude-3-haiku-20240307-v1:0"
  );
  const [selectedDiagramType, setSelectedDiagramType] = useState(
    diagramTypes[0]
  );
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(
    templates.Flowchart[0]
  );

  const SYSTEM_PROMPT = `Generate a mermaid.js diagram code based on the following prompt. You should use the provided template as a starting point.

**Template:**
${
  selectedTemplate?.code
    ? `\`\`\`mermaid\n${selectedTemplate.code}\n\`\`\``
    : "No template provided."
}

**Diagram Size:**
${
  diagramSize !== "auto"
    ? `The diagram size should be: ${diagramSize}`
    : 'No specific size specified (use "auto").'
}

**Your Mermaid.js Code:**
\`\`\`mermaid
// Include your Mermaid.js code here
\`\`\`

**Note** Do not provide any explanation your only output should be mermaid.js code in the above format
`;

  const { messages, input, handleInputChange, isLoading, handleSubmit } =
    useChat({
      api: "/api/claude",
      body: {
        system: SYSTEM_PROMPT,
        explanation,
        model: selectedModel,
        isCompletion: true,
      },
    });
  const { theme } = useTheme();

  return (
    <div className="relative flex flex-col w-full overflow-scroll no-scrollbar max-h-full items-center gap-4 ">
      <form
        className="grid w-full pt-2  items-start gap-6"
        onSubmit={handleSubmit}
      >
        <fieldset className="grid gap-6 rounded-md border p-4">
          <legend className=" px-1 text-sm font-medium">New Diagram</legend>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <Label htmlFor="top-p">Select template</Label>
              <AiTemplateModal
                selectedDiagramType={selectedDiagramType}
                setSelectedDiagramType={setSelectedDiagramType}
                templateModalOpen={templateModalOpen}
                setTemplateModalOpen={setTemplateModalOpen}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="content">Enter Prompt</Label>
              <div className="relative flex items-center justify-center  w-full overflow-hidden   rounded-md border border-input shadow-sm bg-background focus-within:ring-0.5 focus-within:ring-ring ">
                <Textarea
                  tabIndex={0}
                  rows={2}
                  minRows={3}
                  id="prompt"
                  placeholder="Describe your diagram..."
                  className="resize-none bg-background text-sm border-0 max-h-60 overflow-y-scroll no-scrollbar focus-within:outline-none p-2 h-12  w-full px-3 shadow-none focus-visible:ring-0"
                  value={input}
                  onChange={handleInputChange}
                  name="prompt"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger
                  id="model"
                  className="items-center [&_[data-description]]:hidden "
                >
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="anthropic.claude-3-haiku-20240307-v1:0">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icons.anthropic className="size-4" />
                      <div className="grid gap-0.5">
                        <p>
                          Claude 3{" "}
                          <span className="font-medium text-foreground">
                            Haiku
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Light & fast
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="anthropic.claude-3-sonnet-20240229-v1:0">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icons.anthropic className="size-4" />
                      <div className="grid gap-0.5">
                        <p>
                          Claude 3{" "}
                          <span className="font-medium text-foreground">
                            Sonnet
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Hard-working
                        </p>
                      </div>
                    </div>
                  </SelectItem>

                  <SelectItem value="gpt-4o">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <IconOpenAI className="size-4" />
                      <div className="grid gap-0.5">
                        <p>
                          GPT-4o
                          <span className="font-medium text-foreground"></span>
                        </p>
                        <p className="text-xs" data-description>
                          Powerful
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* <div className="grid gap-3">
                <Label htmlFor="top-p">Output Type</Label>
                <Select value={explanation} onValueChange={setExplanation}>
                  <SelectTrigger id="explanation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="diagram">Diagram</SelectItem>
                    <SelectItem value="explanation">
                      Diagram with Explanation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="grid gap-3">
                <Label htmlFor="top-k">Diagram Size</Label>
                <Select value={diagramSize} onValueChange={setDiagramSize}>
                  <SelectTrigger
                    id="size"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="auto">auto</SelectItem>
                    <SelectItem value="low">small</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="high">big</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="flex items-center space-x-2 mr-auto">
              <Label htmlFor="new-mode">Replace current diagram</Label>
              <Switch
                id="new-mode"
                checked={replaceCurrentDiagram}
                onCheckedChange={() =>
                  setReplaceCurrentDiagram(!replaceCurrentDiagram)
                }
              />
            </div>

            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              {isLoading && (
                <>
                  <IconSpinner className="size-3.5" />
                  <p>Generating...</p>
                </>
              )}

              {!isLoading && (
                <>
                  <CornerDownLeft className="size-3.5" />
                  <p>Generate</p>
                </>
              )}
            </Button>
          </div>
        </fieldset>
      </form>

      <div className={cn("mb-32 w-full", replaceCurrentDiagram && "hidden")}>
        {messages && messages[messages.length - 1] ? (
          <Suspense>
            <MermaidBlock
              replaceCurrentDiagram={replaceCurrentDiagram}
              isLoading={isLoading}
              code={messages[messages.length - 1].content
                .replace(/^```mermaid\n|```$/g, "")
                .trim()}
            />
          </Suspense>
        ) : (
          <fieldset className="grid gap-6 rounded-md border p-4">
            <legend className=" px-1 text-[12px] font-medium font-sans ">
              Output
            </legend>
            <div className="flex items-center text-sm justify-center w-full h-32 text-muted-foreground">
              No output yet.
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default NewAiDiagram;

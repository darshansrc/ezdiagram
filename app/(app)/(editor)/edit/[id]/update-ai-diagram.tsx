import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { useCompletion } from "ai/react";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MermaidBlock } from "./mermaid-block";
import { nanoid } from "ai";
import { useTheme } from "next-themes";
import { Table } from "@/components/ui/table";

const UpdateAiDiagram = () => {
  const [explanation, setExplanation] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState("gpt-3.5-turbo");
  const { completion, input, handleInputChange, isLoading, handleSubmit } =
    useCompletion({
      api: "/api/completion",
      body: { explanation: explanation, model: selectedModel },
    });
  const { theme } = useTheme();

  return (
    <div className="relative flex flex-col w-full overflow-scroll no-scrollbar max-h-full items-center gap-4 ">
      <form
        className="grid w-full pt-2  items-start gap-6"
        onSubmit={handleSubmit}
      >
        <fieldset className="grid gap-6 rounded-md border p-4">
          <legend className=" px-1 text-sm font-medium">Update Diagram</legend>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Select template</Label>
                <Input id="top-p" placeholder="flowchart" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Diagram Size</Label>
                <Select defaultValue="auto">
                  <SelectTrigger
                    id="model"
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
            <Label htmlFor="model">Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden "
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="gpt-3.5-turbo">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <IconOpenAI className="size-4" />
                    <div className="grid gap-0.5">
                      <p>
                        GPT-3.5{" "}
                        <span className="font-medium text-foreground">
                          Turbo
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Our fastest model for general use cases.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="gpt-4o">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <IconOpenAI className="size-4" />
                    <div className="grid gap-0.5">
                      <p>
                        GPT-4o
                        <span className="font-medium text-foreground"></span>
                      </p>
                      <p className="text-xs" data-description>
                        Performance and speed for efficiency.
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row items-center">
            <div className="flex items-center space-x-2 mr-auto">
              <Label htmlFor="airplane-mode">Explanation</Label>
              <Switch
                id="airplane-mode"
                checked={explanation}
                onCheckedChange={() => setExplanation(!explanation)}
              />
            </div>

            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              {isLoading && <IconSpinner className="size-3.5" />}
              {isLoading ? "Generating..." : "Generate"}
              {!isLoading && <CornerDownLeft className="size-3.5" />}
            </Button>
          </div>
        </fieldset>
      </form>

      <fieldset className="flex flex-row min-w-full rounded-md border p-4 mb-32">
        <legend className=" px-1 text-sm font-medium">Output</legend>
        {completion ? (
          <MemoizedReactMarkdown
            className="text-sm w-full"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 text-sm last:mb-0">{children}</p>;
              },

              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return match && match[1] === "mermaid" ? (
                  <div className="pb-4">
                    <MermaidBlock
                      key={nanoid()}
                      code={String(children).replace(/\n$/, "")}
                      className={className}
                    />
                  </div>
                ) : (
                  <div data-color-mode={theme} className="my-1">
                    <MarkdownPreview
                      source={`\`\`\`${match && match[1]}\n${String(
                        children
                      ).replace(/\n$/, "")}\n\`\`\``}
                    />
                  </div>
                );
              },
            }}
          >
            {completion}
          </MemoizedReactMarkdown>
        ) : (
          <div className="flex items-center text-sm justify-center w-full h-32 text-muted-foreground">
            No output yet.
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default UpdateAiDiagram;

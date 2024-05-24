import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAITabStore } from "@/store/editor-store";
import {
  BotMessageSquare,
  CornerDownLeft,
  MessageSquareCode,
  Mic,
  Paperclip,
  Plus,
  RefreshCcw,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IconOpenAI } from "@/components/ui/icons";
import { Switch } from "@/components/ui/switch";
import Chat from "./ai-chat";

const AIEditor = () => {
  const { currentAITab, setCurrentAITab } = useAITabStore();
  return (
    <Tabs
      defaultValue={currentAITab}
      value={currentAITab}
      className="min-w-full p-2 rounded-full"
    >
      <TabsList className="grid w-full grid-cols-3  rounded-xl">
        <TabsTrigger
          value="new"
          onClick={() => setCurrentAITab("new")}
          className="flex flex-row items-center gap-1 rounded-xl"
        >
          <Plus className="size-3" />
          New
        </TabsTrigger>
        <TabsTrigger
          value="update"
          onClick={() => setCurrentAITab("update")}
          className="flex flex-row items-center gap-1 rounded-xl"
        >
          <RefreshCcw className="size-3" />
          Update
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setCurrentAITab("chat")}
          value="chat"
          className="flex flex-row items-center gap-1 rounded-xl"
        >
          <BotMessageSquare className="size-3" />
          Chat
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="new"
        className="relative w-full h-[calc(100vh-110px)]"
      >
        <div className="relative flex flex-col w-full items-center gap-8 ">
          <form className="grid w-full pt-2  items-start gap-6">
            <fieldset className="grid gap-6 rounded-md border p-4">
              <legend className=" px-1 text-sm font-medium">New Diagram</legend>
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
                        <SelectValue placeholder="Select  size" />
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
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe your diagram..."
                    className="min-h-[9.5rem]"
                  />
                </div>
                <Label htmlFor="model">Model</Label>
                <Select>
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden "
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="genesis">
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
                    <SelectItem value="explorer">
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
                  <Label htmlFor="airplane-mode">Explaination</Label>
                  <Switch id="airplane-mode" />
                </div>

                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Generate
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
      </TabsContent>

      <TabsContent value="chat" className="relative h-[calc(100vh-110px)]">
        <Chat />
      </TabsContent>
    </Tabs>
  );
};

export default AIEditor;

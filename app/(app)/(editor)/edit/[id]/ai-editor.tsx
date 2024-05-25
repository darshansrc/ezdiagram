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
import NewAiDiagram from "./new-ai-diagram";
import UpdateAiDiagram from "./update-ai-diagram";

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
        <NewAiDiagram />
      </TabsContent>

      <TabsContent
        value="update"
        className="relative w-full h-[calc(100vh-110px)]"
      >
        <UpdateAiDiagram />
      </TabsContent>

      <TabsContent value="chat" className="relative h-[calc(100vh-110px)]">
        <Chat />
      </TabsContent>
    </Tabs>
  );
};

export default AIEditor;

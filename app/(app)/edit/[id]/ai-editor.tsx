import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAITabStore } from "@/store/editor-store";
import { BotMessageSquare, Plus, RefreshCcw } from "lucide-react";
import Chat from "./ai-chat";
import NewAiDiagram from "./new-ai-diagram";
import UpdateAiDiagram from "./update-ai-diagram";

const AIEditor = ({ diagramId }: { diagramId: string }) => {
  const { currentAITab, setCurrentAITab } = useAITabStore();
  return (
    <Tabs
      defaultValue={currentAITab}
      value={currentAITab}
      className="min-w-full p-2 rounded-full"
    >
      <TabsList className="grid w-full grid-cols-3  rounded-lg">
        <TabsTrigger
          value="new"
          onClick={() => setCurrentAITab("new")}
          className="flex flex-row items-center gap-1 rounded-lg"
        >
          <Plus className="size-3" />
          New
        </TabsTrigger>
        <TabsTrigger
          value="update"
          onClick={() => setCurrentAITab("update")}
          className="flex flex-row items-center gap-1 rounded-lg"
        >
          <RefreshCcw className="size-3" />
          Update
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setCurrentAITab("chat")}
          value="chat"
          className="flex flex-row items-center gap-1 rounded-lg"
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
        <Chat diagramId={diagramId} />
      </TabsContent>
    </Tabs>
  );
};

export default AIEditor;

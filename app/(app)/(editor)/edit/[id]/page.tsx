"use client";
import {
  Bookmark,
  Code2,
  Settings,
  Settings2,
  Share,
  Sparkles,
  StickyNote,
  Workflow,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { useTabStore } from "@/store/editor-store";
import CodeEditor from "./code-editor";
import DiagramCanvas from "./diagram-canvas";
import { useMounted } from "@/hooks/use-mounted";
import AIEditor from "./ai-editor";
import ConfigEditor from "./config-editor";

import DiagramNotes from "./diagram-notes";

function EditorDashboard({ params }: { params: { id: string } }) {
  const { currentTab, setCurrentTab } = useTabStore();

  const mounted = useMounted();

  const handleTabClick = (
    tab: "ai" | "code" | "config" | "notes" | "saved" | "settings"
  ) => {
    setCurrentTab(tab);
  };

  const renderTabContent = (
    currentTab: "ai" | "code" | "config" | "notes" | "saved" | "settings"
  ) => {
    switch (currentTab) {
      case "ai":
        return <AIEditor />;
      case "code":
        return <CodeEditor />;
      case "config":
        return <ConfigEditor />;
      case "notes":
        return <DiagramNotes />;
      case "saved":
        return <div>Saved</div>;
      case "settings":
        return <div>Settings</div>;
      default:
        return <div>AI</div>;
    }
  };

  if (mounted)
    return (
      <div className="grid h-screen w-full pl-[50px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r bg-background">
          <div className="border-b p-2 max-h-[50px]">
            <Button variant="outline" size="icon" aria-label="Home">
              <Workflow className="size-5" />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-md ${
                      currentTab === "ai" ? "bg-muted" : ""
                    }`}
                    aria-label="Playground"
                    onClick={() => handleTabClick("ai")}
                  >
                    <Sparkles className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  AI
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg ${
                      currentTab === "code" ? "bg-muted" : ""
                    }`}
                    aria-label="API"
                    onClick={() => handleTabClick("code")}
                  >
                    <Code2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Code
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg ${
                      currentTab === "config" ? "bg-muted" : ""
                    }`}
                    aria-label="Documentation"
                    onClick={() => handleTabClick("config")}
                  >
                    <Settings2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Config
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg ${
                      currentTab === "notes" ? "bg-muted" : ""
                    }`}
                    aria-label="Documentation"
                    onClick={() => handleTabClick("notes")}
                  >
                    <StickyNote className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Notes
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg ${
                      currentTab === "saved" ? "bg-muted" : ""
                    }`}
                    aria-label="Documentation"
                    onClick={() => handleTabClick("saved")}
                  >
                    <Bookmark className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Saved
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg ${
                      currentTab === "settings" ? "bg-muted" : ""
                    }`}
                    aria-label="Settings"
                    onClick={() => handleTabClick("settings")}
                  >
                    <Settings className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10   flex min-h-[50px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-sm font-semibold">Playground</h1>

            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm "
            >
              <Share className="size-3.5" />
              Share
            </Button>
          </header>
          <main className="flex gap-4 overflow-auto h-full   ">
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full"
            >
              <ResizablePanel defaultSize={40} maxSize={50} minSize={30}>
                {renderTabContent(currentTab)}
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60}>
                <DiagramCanvas />
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </div>
      </div>
    );
}

export default EditorDashboard;

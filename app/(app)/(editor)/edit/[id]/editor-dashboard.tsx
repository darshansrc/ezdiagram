"use client";
import {
  Bookmark,
  Cloud,
  CloudDownload,
  Code2,
  FileText,
  Settings,
  Settings2,
  Share,
  Sparkles,
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
import {
  Tab,
  useDiagramCodeStore,
  useDiagramConfigStore,
  useDiagramNotesStore,
  useIsSavingStore,
  useTabStore,
} from "@/store/editor-store";
import CodeEditor from "./code-editor";
import DiagramCanvas from "./diagram-canvas";
import { useMounted } from "@/hooks/use-mounted";
import AIEditor from "./ai-editor";
import ConfigEditor from "./config-editor";
import DiagramNotes from "./diagram-notes";
import { Diagram } from "@/actions/db-actions";
import { useEffect } from "react";
import DiagramName from "./diagram-name";
import { Badge } from "@/components/ui/badge";
import { IconSpinner } from "@/components/ui/icons";
import { Icons } from "@/components/shared/icons";
import DiagramHistory from "./diagram-history";
import SaveDiagram from "./save-diagram";

const navItems = [
  {
    label: "AI",
    icon: <Sparkles className="size-5" />,
    tab: "ai",
  },
  {
    label: "Code",
    icon: <Code2 className="size-5" />,
    tab: "code",
  },
  {
    label: "Config",
    icon: <Settings2 className="size-5" />,
    tab: "config",
  },
  {
    label: "Notes",
    icon: <FileText className="size-5" />,
    tab: "notes",
  },
  {
    label: "Saved",
    icon: <Bookmark className="size-5" />,
    tab: "saved",
  },
  {
    label: "Settings",
    icon: <Settings className="size-5" />,
    tab: "settings",
  },
];

function EditorDashboard({ diagram }: { diagram: Diagram }) {
  const { currentTab, setCurrentTab } = useTabStore();
  const { setDiagramCode } = useDiagramCodeStore();
  const { setDiagramConfig } = useDiagramConfigStore();
  const { setDiagramNotes } = useDiagramNotesStore();
  const { isSaving } = useIsSavingStore();

  useEffect(() => {
    setDiagramCode(diagram.code || "");
    setDiagramConfig(diagram.config || "");
    setDiagramNotes(diagram.diagram_notes || "");
  }, []);

  const mounted = useMounted();

  const renderTabContent = (currentTab: Tab) => {
    switch (currentTab) {
      case "ai":
        return <AIEditor />;
      case "code":
        return <CodeEditor diagramId={diagram.id} />;
      case "config":
        return <ConfigEditor diagramId={diagram.id} />;
      case "notes":
        return <DiagramNotes diagramId={diagram.id} />;
      case "saved":
        return <DiagramHistory diagramId={diagram.id} />;
      case "settings":
        return <div>Settings</div>;
      default:
        return <div>AI</div>;
    }
  };

  if (mounted)
    return (
      <div className="grid fixed top-0 left-0  bg-background h-screen w-full pl-[50px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r bg-background">
          <div className="border-b p-2 max-h-[50px]">
            <Button variant="outline" size="icon" aria-label="Home">
              <Workflow className="size-5" />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <TooltipProvider delayDuration={0}>
              {navItems.map((item) => (
                <Tooltip key={item.tab}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-md ${
                        currentTab === item.tab ? "bg-muted" : ""
                      }`}
                      aria-label={item.label}
                      onClick={() => setCurrentTab(item?.tab as Tab)}
                    >
                      {item.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10   flex min-h-[50px] items-center gap-1 border-b bg-background px-4">
            <div className="flex flex-row gap-2 items-center">
              <DiagramName
                initialDiagramName={diagram.diagram_name}
                diagramId={diagram.id}
              />
              <Badge variant="secondary">
                {isSaving ? (
                  <div className="flex flex-row items-center gap-1 text-sm text-muted-foreground">
                    <IconSpinner className="size-3" /> saving
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-1 text-sm text-muted-foreground">
                    <Icons.cloudChecked className="size-3 " /> saved
                  </div>
                )}
              </Badge>
            </div>
            <div className="ml-auto gap-1.5 text-sm flex items-center">
              <ModeToggle />
              <SaveDiagram diagramId={diagram.id} />
              <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1.5 text-sm flex items-center"
              >
                <Share className="size-3.5" />
                Share
              </Button>
            </div>
          </header>
          <main className="flex gap-4 overflow-auto h-full">
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

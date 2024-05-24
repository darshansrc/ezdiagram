import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import mermaid from "mermaid";
import useSvgStore from "@/store/svg-store";
import { useChat } from "ai/react";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BetweenHorizontalStart, Maximize2 } from "lucide-react";
import MermaidFullScreen from "./mermaid-full-screen";
import { useDiagramCodeStore } from "@/store/editor-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { nanoid } from "ai";

export const MermaidBlock = ({ code, children = [], className, ...props }) => {
  const { isLoading } = useChat();
  const { setDiagramCode } = useDiagramCodeStore();

  const demoid = useRef(`dome${nanoid()}`);
  const { svg: svgStore, setSvg: setSvgStore } = useSvgStore();
  const { theme } = useTheme();

  const [container, setContainer] = useState(null);

  const handleReplace = () => {
    setDiagramCode(code);
    toast.success("Diagram code has been replaced!");
  };

  const reRender = async () => {
    if (container) {
      try {
        mermaid.initialize({
          theme: theme === "dark" ? "dark" : "default",
        });
        const str = await mermaid.render(demoid.current, code);
        container.innerHTML = str.svg;
        setSvgStore(str.svg);
      } catch (error) {
        container.innerHTML = `${svgStore}`;
        console.error(error);
      }
    }
  };

  useEffect(() => {
    reRender();
  }, [container, code, theme, demoid, isLoading]);

  const refElement = useCallback((node) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  return (
    <>
      <div className="flex relative flex-col items-center border justify-center dark:bg-neutral-900 rounded-lg p-2">
        <Fragment>
          <code id={demoid.current} />
          <code ref={refElement} data-name="mermaid" />
        </Fragment>
        <div className="absolute top-1 right-1 ">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"ghost"}
                  size="icon"
                  className="focus-within:outline-none focus:outline-none"
                  onClick={handleReplace}
                >
                  <BetweenHorizontalStart className="size-3 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Replace</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Dialog>
            <DialogTrigger className=" focus-within:outline-none focus:outline-none">
              <Button
                variant={"ghost"}
                size="icon"
                className="focus-within:outline-none focus:outline-none"
              >
                <Maximize2 className="size-3 text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] p-0 flex min-w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] overflow-scroll ">
              <MermaidFullScreen code={code} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

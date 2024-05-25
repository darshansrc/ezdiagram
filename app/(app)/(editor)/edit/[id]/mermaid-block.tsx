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
import {
  BetweenHorizontalStart,
  Check,
  Copy,
  CopyCheck,
  Maximize2,
} from "lucide-react";
import MermaidFullScreen from "./mermaid-full-screen";
import { useDiagramCodeStore } from "@/store/editor-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { nanoid } from "ai";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export const MermaidBlock = ({ code, children = [], className, ...props }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const demoid = useRef(`dome${nanoid()}`);
  const { svg: svgStore, setSvg: setSvgStore } = useSvgStore();
  const { setDiagramCode } = useDiagramCodeStore();
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
        // setDiagramCode(code);
      } catch (error) {
        container.innerHTML = `${svgStore}`;
        console.error(error);
      }
    }
  };

  useEffect(() => {
    reRender();
  }, [container, code, theme, demoid]);

  const refElement = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(code);
    toast.success("Mermaid code copied to clipboard!");
  };

  return (
    <>
      <div className="flex relative flex-col bg-muted   border py-6 pt-12 min-w-full mx-auto  dark:bg-neutral-900 rounded-md p-2">
        <Fragment>
          <code id={demoid.current} className="text-[0px] mx-auto" />
          <code
            ref={refElement}
            data-name="mermaid"
            className="text-[0px] mx-auto"
          />
        </Fragment>
        <div className="absolute top-1 right-1 ">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"ghost"}
                  className="focus-within:outline-none focus:outline-none flex flex-row gap-1  items-center "
                  onClick={handleReplace}
                >
                  <BetweenHorizontalStart className="size-3 text-muted-foreground" />{" "}
                  <p className="text-[10px]">Replace</p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Replace</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"ghost"}
                  size="icon"
                  className="focus-within:outline-none focus:outline-none"
                  onClick={onCopy}
                >
                  {isCopied ? (
                    <Check className="size-3 text-muted-foreground" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Code</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
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
              </TooltipTrigger>
              <TooltipContent>Full Screen</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};

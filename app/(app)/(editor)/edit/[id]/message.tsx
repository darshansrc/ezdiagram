"use client";

import { Message } from "ai/react";
import { IconUser } from "@/components/ui/icons";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { BotIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { FC, memo, Suspense } from "react";
import { Icons } from "@/components/shared/icons";
import { MermaidBlock } from "./mermaid-block";
import ReactMarkdown, { Options } from "react-markdown";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { nanoid } from "ai";

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex flex-row-reverse gap-2 items-start ">
      <div className="flex size-[28px] shrink-0 select-none items-center justify-center rounded-full border bg-background shadow-sm">
        <IconUser className="text-muted-foreground" />
      </div>
      <div className=" flex-end  space-y-2 overflow-hidden flex  max-w-[75%] flex-col gap-2 rounded-xl px-3  py-2 text-sm  bg-muted ">
        {children}
      </div>
    </div>
  );
}

export function BotMessage({
  text,
  isLoading,
}: {
  text: string;
  isLoading?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <div className="group relative flex  items-start md:-ml-12">
      <div className="flex size-[28px] rounded-full shrink-0 select-none items-center justify-center  border bg-background  shadow-sm">
        <BotIcon className="size-4" />
      </div>
      <div className="ml-2 flex-1 space-y-2 overflow-hidden  flex  max-w-[88%] flex-col gap-2 rounded-lg px-1 py-1 text-sm ">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-sm text-black dark:text-white"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            code({
              children,
              inline,
              className,
              ...props
            }: {
              children: React.ReactNode;
              inline?: boolean;
              className?: string;
              props?: any;
            }) {
              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              const match = /language-(\w+)/.exec(className || "");
              return match && match[1] === "mermaid" ? (
                <MermaidBlock
                  isLoading={isLoading}
                  replaceCurrentDiagram={false}
                  code={String(children).replace(/\n$/, "")}
                />
              ) : (
                <div data-color-mode={theme}>
                  <MarkdownPreview
                    className=" text-black dark:text-white font-inter"
                    source={`\`\`\`${match && match[1]}\n${String(
                      children
                    ).replace(/\n$/, "")}\n\`\`\``}
                  />
                </div>
              );
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[28px] rounded-full shrink-0 select-none items-center justify-center  border bg-background  shadow-sm">
        <BotIcon className="size-4" />
      </div>
      <div className="ml-4 flex-1  overflow-hidden  flex  flex-col gap-2 rounded-lg py-1 text-sm ">
        <Icons.spinner className="animate-spin" />
      </div>
    </div>
  );
}

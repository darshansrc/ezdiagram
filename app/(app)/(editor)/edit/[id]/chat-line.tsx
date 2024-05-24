"use client";

import { Message } from "ai/react";

import { IconOpenAI, IconSpinner, IconUser } from "@/components/ui/icons";

// import MermaidRaw from "@/app/(app)/c/MermaidRaw";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Bot } from "lucide-react";
import { useTheme } from "next-themes";
// import { CodeBlock } from "@/components/chat/codeblock";
import { MemoizedReactMarkdown } from "./markdown";
import MermaidPreview from "@/components/dashboard/mermaid-preview";
import { Suspense } from "react";
import { Icons } from "@/components/shared/icons";
import MermaidChatPreview from "./mermaid-chat-preview";

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

export function BotMessage({ text }: { text: string }) {
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/;
  const mermaidMatch = text.match(mermaidRegex);
  const { theme } = useTheme();

  return (
    <div className="group relative flex  items-start md:-ml-12">
      <div className="flex size-[28px] rounded-full shrink-0 select-none items-center justify-center  border bg-background  shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-2 flex-1 space-y-2 overflow-hidden  flex  max-w-[80%] flex-col gap-2 rounded-lg px-1 py-1 text-sm ">
        <div data-color-mode={theme}>
          <MarkdownPreview
            className="no-scrollbar "
            source={text}
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              backgroundColor:
                theme === "dark" ? "rgb(23, 23, 23)" : "rgb(255 255 255)",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          />
          {mermaidMatch && (
            <Suspense>
              <MermaidChatPreview
                chart={mermaidMatch ? mermaidMatch[1] : ""}
                isLoading={false}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[28px] rounded-full shrink-0 select-none items-center justify-center  border bg-background  shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1  overflow-hidden  flex  flex-col gap-2 rounded-lg py-1 text-sm ">
        <Icons.spinner className="animate-spin" />
      </div>
    </div>
  );
}
export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

interface ChatLineProps extends Partial<Message> {
  hasResponseStarted: boolean;
  isLoading: boolean;
}

export function ChatLine({
  role = "assistant",
  content,

  hasResponseStarted,
  isLoading,
}: ChatLineProps) {
  const { theme } = useTheme();
  if (!content) {
    return null;
  }
  const formattedMessage = convertNewLines(content);

  return (
    <div className=" my-4 w-full pl-[50px]">
      {role === "assistant" ? (
        <Suspense fallback={<div></div>}>
          <BotMessage text={content} />
        </Suspense>
      ) : (
        <UserMessage>{formattedMessage}</UserMessage>
      )}
    </div>
  );
}

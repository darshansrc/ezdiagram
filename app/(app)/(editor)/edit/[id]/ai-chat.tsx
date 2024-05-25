"use client";
import React, { useState, useEffect } from "react";
import { BotMessage, SpinnerMessage, UserMessage } from "./message";
import { Separator } from "@/components/ui/separator";
import { useChat } from "ai/react";
import {
  ArrowUp,
  CircleArrowRight,
  CornerDownLeft,
  Mic,
  Paperclip,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Message } from "ai";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import useSvgStore from "@/store/svg-store";

const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content: "Hello! How can I assist you with your diagram today?  ",
  },
];

export default function Chat() {
  const [prompt, setPrompt] = useState<string>("");
  const [initialChats, setInitialChats] = useState<Message[]>([]);
  const [hasResponseStarted, setHasResponseStarted] = useState(false);
  const { setSvg } = useSvgStore();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setInitialChats(chat);
  //       console.log("chat", chat);
  //       scrollDown();
  //     };
  //     fetchData();
  //   }, [chat, diagramId]);

  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/prompt",
      initialMessages: initialMessages,
      onResponse: () => {
        setHasResponseStarted(true);
      },
      onFinish: () => {
        setHasResponseStarted(false);
        setSvg("");
        // fetchChat(diagramId);
      },
      onError: (error) =>
        toast.error(
          error.message || "An error occurred. Please try again later."
        ),
    });

  useEffect(() => {
    setPrompt(input);
  }, [input]);

  useEffect(() => {
    scrollDown();
  }, [messages]);

  function scrollDown() {
    var myDiv = document.getElementById("chatbox");
    if (myDiv) {
      myDiv.scrollTop = myDiv.scrollHeight;
    }
  }

  useEffect(() => {
    if (isLoading) scrollDown();
  });

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === "Return") && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const { theme } = useTheme();

  return (
    <>
      <div className="relative h-[calc(100vh-108px)] ">
        <div
          id="chatbox"
          className="relative h-full overflow-y-scroll no-scrollbar pb-32 pl-[50px] pt-4 "
        >
          {messages.length != 0 ? (
            messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <UserMessage>{m.content}</UserMessage>
                ) : (
                  <BotMessage text={m.content} isLoading={isLoading} />
                )}

                <div className="my-4" />
              </div>
            ))
          ) : (
            <div></div>
          )}
          <div> {isLoading && !hasResponseStarted && <SpinnerMessage />}</div>
        </div>

        <div className="absolute bottom-0 left-0 w-full pb-0 bg-background  flex justify-center items-center flex-col">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center justify-center  w-full overflow-hidden p-1.5  rounded-3xl border bg-background focus-within:ring-0.5 focus-within:ring-ring "
          >
            <Textarea
              tabIndex={0}
              onKeyDown={handleKeyDown}
              id="message"
              value={input}
              onChange={handleInputChange}
              rows={1}
              placeholder="Type your message..."
              className="resize-none bg-background text-sm border-0 max-h-60 overflow-y-scroll no-scrollbar focus-within:outline-none p-2 h-12 font-medium w-full px-12 shadow-none focus-visible:ring-0"
            />
            <div className="flex absolute top-[50%] translate-y-[-50%] left-1 p-1 items-center ">
              <Button variant="ghost" size="icon" className=" rounded-full">
                <Paperclip className="size-4    " />
              </Button>
            </div>
            <div className="flex absolute top-[50%] translate-y-[-50%]  right-1 p-1 items-center ">
              <Button
                disabled={!input}
                type="submit"
                size="icon"
                className=" rounded-full"
              >
                <ArrowUp className="size-4 font-bold" />
              </Button>
            </div>
          </form>
          <p className="text-muted-foreground text-[10px] py-2 font-medium w-full text-center">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </>
  );
}

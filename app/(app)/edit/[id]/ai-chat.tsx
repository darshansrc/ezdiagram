"use client";
import React, { useState, useEffect } from "react";
import { BotMessage, SpinnerMessage, UserMessage } from "./message";
import { useChat } from "ai/react";
import { ArrowUp, Paperclip, Settings, Sparkle } from "lucide-react";
import { toast } from "react-hot-toast";
import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import useSvgStore from "@/store/svg-store";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useDiagramCodeStore } from "@/store/editor-store";
import useChatStore from "@/store/chat-store";
import { Message } from "ai";

export default function Chat({ diagramId }: { diagramId: string }) {
  const [hasResponseStarted, setHasResponseStarted] = useState(false);
  const [chatType, setChatType] = useState("current");
  const { setSvg } = useSvgStore();
  const { diagramCode } = useDiagramCodeStore();
  const { chats, addChat, getChats } = useChatStore();

  const SYSTEM_PROMPT = `${
    chatType === "current"
      ? `Your task is to help user update or explain mermaid.js diagram based on the current code: ${diagramCode}`
      : `You are an expert in mermaid.js and tasked with translating user requirements into technical specifications for creating mermaid.js diagrams to code. You can chat with user if user doesn't ask for a diagram`
  }:`;

  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/claude",
      initialMessages: getChats(diagramId),
      body: {
        system: SYSTEM_PROMPT,
        model: "anthropic.claude-3-haiku-20240307-v1:0",
      },

      onResponse: () => {
        setHasResponseStarted(true);
      },
      onFinish: (message: Message) => {
        setHasResponseStarted(false);
        setSvg("");
        addChat(diagramId, message.content, message.role);
      },
      onError: (error) =>
        toast.error(
          error.message || "An error occurred. Please try again later."
        ),
    });

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
      addChat(diagramId, input, "user");
      handleSubmit(e);
    }
  };

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
              {/* <Button variant="ghost" size="icon" className=" rounded-full">
                <Paperclip className="size-4    " />
              </Button> */}
              <Select value={chatType} onValueChange={setChatType}>
                <SelectTrigger asChild>
                  <Button variant="ghost" size="icon" className=" rounded-full">
                    <Sparkle className="size-4 text-muted-foreground    " />
                  </Button>
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="current">
                    Chat with current diagram
                  </SelectItem>
                  <SelectItem value="new">Normal Chat</SelectItem>
                </SelectContent>
              </Select>
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

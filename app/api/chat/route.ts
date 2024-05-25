import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    // system: "you are an expert in writing mermaid.js diagrams",
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}

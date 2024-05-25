import { StreamingTextResponse, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  console.log("req", req);
  const {
    prompt,
    explanation,
    model,
  }: { prompt: string; explanation: boolean; model: string } = await req.json();

  const result = await streamText({
    model: openai(model ? model : "gpt-3.5-turbo"),
    system: `you are an expert in writing mermaid.js diagrams`,
    prompt: `${prompt} ${"  "} ${
      explanation
        ? "Also provide an explanation of the diagram below the diagram code."
        : "Do not provide explantion only provide diagram"
    }`,
  });

  return new StreamingTextResponse(result.toAIStream());
}

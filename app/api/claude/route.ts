import { AnthropicStream, StreamingTextResponse } from "ai";
import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";

const client = new AnthropicBedrock({
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsRegion: process.env.AWS_REGION || "ap-southeast-2",
});

export async function POST(req: Request) {
  try {
    const { messages, system, model, isCompletion } = await req.json();
    console.log(messages, system, model);
    const message = await client.messages.create({
      model: model ? model : "anthropic.claude-3-haiku-20240307-v1:0",
      max_tokens: 1024,
      stream: true,
      system: system
        ? system
        : "You are an expert in mermaid.js and tasked with translating user requirements into technical specifications for creating mermaid.js diagrams to code. You can chat with user if user doesn't ask for a diagram",
      messages: isCompletion ? [messages.slice(-1)[0]] : messages,
    });
    return new StreamingTextResponse(AnthropicStream(message));
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

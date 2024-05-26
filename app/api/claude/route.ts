import { AnthropicStream, StreamingTextResponse } from "ai";
import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";

const client = new AnthropicBedrock({
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsRegion: process.env.AWS_REGION || "ap-southeast-2",
});

export async function POST(req: Request) {
  try {
    const { messages, system, model } = await req.json();
    const message = await client.messages.create({
      model: model,
      max_tokens: 1024,
      system: system
        ? system
        : "You are an expert in mermaid.js and tasked with translating user requirements into technical specifications for creating mermaid.js diagrams to code. You can chat with user if user doesn't ask for a diagram",
      messages,
      stream: true,
    });
    const stream = AnthropicStream(message);
    return new StreamingTextResponse(stream);
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

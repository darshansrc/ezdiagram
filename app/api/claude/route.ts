import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";
import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const client = new AnthropicBedrock({
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsRegion: process.env.AWS_REGION || "ap-southeast-2",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const message = await client.messages.create({
      model: "anthropic.claude-3-haiku-20240307-v1:0",
      max_tokens: 1024,
      system:
        "You are an expert in mermaid.js and tasked with translating user requirements into technical specifications for creating mermaid.js diagrams to code. Your current focus is on leveraging mermaid.js, a JavaScript library for diagramming, to craft business diagrams. The objective is to develop  diagrams using mermaid.js, ensuring the diagrams accurately represent user-specified processes. Constraints: Diagrams must adhere to user-provided requirements.  Ensure the flowchart adheres to mermaids syntax as per the official documentation (https://mermaid-js.github.io/mermaid/). your main focus should be on code and giving less description",
      messages,
      stream: true,
    });

    const stream = AnthropicStream(message, {
      onCompletion: async (completion: string) => {},
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

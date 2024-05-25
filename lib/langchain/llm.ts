import { OpenAI } from "@langchain/openai";

export const streamingModel = new OpenAI({
  model: "gpt-3.5-turbo",
  streaming: true,
  verbose: true,
  temperature: 0,
});

export const nonStreamingModel = new OpenAI({
  model: "gpt-3.5-turbo",
  verbose: true,
  temperature: 0,
});

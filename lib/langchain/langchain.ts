import { ConversationalRetrievalQAChain } from "langchain/chains";
import { getVectorStore } from "./vector-store";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./prompt-templates";

type callChainArgs = {
  question: string;
  chatHistory: string;
  chatId: string;
};

export async function callChain({ question, chatHistory }: callChainArgs) {
  try {
    // Open AI recommendation
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const vectorStore = await getVectorStore();

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        returnSourceDocuments: true, //default 4
        questionGeneratorChainOptions: {
          llm: nonStreamingModel,
        },
      }
    );

    // Question using chat-history
    // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
    chain.call(
      {
        question: sanitizedQuestion,
        chat_history: chatHistory,
      },
      [handlers]
    );

    // Return the readable stream
    return new StreamingTextResponse(stream, {}, data);
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}

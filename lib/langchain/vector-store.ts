import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

export async function getVectorStore() {
  const pinecone = new Pinecone();

  const pineconeIndex = pinecone.Index("mermaid");

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
    }),
    { pineconeIndex }
  );

  return vectorStore;
}

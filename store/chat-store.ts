import { Message } from "ai";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ChatStore {
  chats: Record<string, Message[]>; // A dictionary to hold chats for each diagram
  addChat: (diagramId: string, content: string, role: Message["role"]) => void;
  getChats: (diagramId: string) => Message[]; // Function to get all chats for a specific diagram
}

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: {},
      addChat: (diagramId, content, role) => {
        const newMessage: Message = {
          id: String(Date.now()),
          content,
          role,
          createdAt: new Date(),
        };

        set((state) => {
          // Get the current chat for the diagram, or an empty array if it doesn't exist
          const currentChats = state.chats[diagramId] || [];
          // Update the state with the new message appended to the correct diagram's chat
          return {
            chats: {
              ...state.chats,
              [diagramId]: [...currentChats, newMessage],
            },
          };
        });
      },
      getChats: (diagramId) => {
        return get().chats[diagramId] || [];
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useChatStore;

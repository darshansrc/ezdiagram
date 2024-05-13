import { getAllDiagrams } from "@/actions/db-actions";
import { Tables } from "@/types/database.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Diagram = Tables<"diagrams">;

interface DiagramStore {
  diagrams: Diagram[] | null;
  fetchDiagrams: () => void;
}

const useDiagramStore = create<DiagramStore>()(
  persist(
    (set) => ({
      diagrams: [],
      fetchDiagrams: async () => {
        try {
          const data = await getAllDiagrams();
          set({ diagrams: data });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "diagram-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDiagramStore;

import { getAllDiagrams } from "@/actions/db-actions";
import { Tables } from "@/types/database.types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Diagram = Tables<"diagrams">;

interface DiagramStore {
  diagrams: Diagram[] | null;
  fetchDiagrams: () => void;
  removeDiagram: (id: string) => void;
}

const useDiagramStore = create<DiagramStore>()(
  persist(
    (set, get) => ({
      diagrams: [],
      fetchDiagrams: async () => {
        try {
          const data = await getAllDiagrams();
          set({ diagrams: data });
        } catch (error) {
          console.error(error);
        }
      },
      removeDiagram: (id: string) => {
        const currentDiagrams = get().diagrams;
        if (currentDiagrams) {
          const newDiagrams = currentDiagrams.filter(
            (diagram) => diagram.id !== id
          );
          set({ diagrams: newDiagrams });
          toast("Diagram deleted successfully!");
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

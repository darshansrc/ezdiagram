import { getAllDiagrams } from "@/actions/db-actions";
import { Tables } from "@/types/database.types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Diagram = Tables<"diagrams">;

interface DiagramStore {
  diagrams: Diagram[] | null;
  isFetching: boolean; // Add this line
  fetchDiagrams: () => void;
  removeDiagram: (id: string) => void;
  updateDiagramName: (id: string, newName: string) => void;
}

const useDiagramStore = create<DiagramStore>()(
  persist(
    (set, get) => ({
      diagrams: [],
      isFetching: false, // Initialize isFetching to false
      fetchDiagrams: async () => {
        try {
          set({ isFetching: true }); // Set isFetching to true before fetching
          const data = await getAllDiagrams();
          set({ diagrams: data, isFetching: false }); // Set diagrams and isFetching to false after fetching
        } catch (error) {
          console.error(error);
          set({ isFetching: false }); // Set isFetching to false in case of error
        }
      },
      removeDiagram: (id: string) => {
        const currentDiagrams = get().diagrams;
        if (currentDiagrams) {
          const newDiagrams = currentDiagrams.filter(
            (diagram) => diagram.id !== id
          );
          set({ diagrams: newDiagrams });
          toast(" Diagram deleted successfully!");
        }
      },
      updateDiagramName: (id: string, newName: string) => {
        const currentDiagrams = get().diagrams;
        if (currentDiagrams) {
          const updatedDiagrams = currentDiagrams.map((diagram) => {
            if (diagram.id === id) {
              return { ...diagram, diagram_name: newName };
            }
            return diagram;
          });
          set({ diagrams: updatedDiagrams });
          toast("Diagram updated successfully!");
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

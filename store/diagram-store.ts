import { getAllDiagrams } from "@/actions/db-actions";
import { Tables } from "@/types/supabase";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StateCreator } from "zustand/vanilla";

type Diagram = Tables<"diagrams">;

interface DiagramStore {
  diagrams: Diagram[] | null;
  isFetching: boolean;
  fetchDiagrams: () => Promise<void>;
  removeDiagram: (id: string) => void;
  updateDiagramName: (id: string, newName: string) => void;
}

const createDiagramStore: StateCreator<DiagramStore> = (set, get) => ({
  diagrams: [],
  isFetching: false,
  fetchDiagrams: async () => {
    try {
      set({ isFetching: true });
      const data = await getAllDiagrams();
      set({ diagrams: data, isFetching: false });
    } catch (error) {
      console.error(error);
      set({ isFetching: false });
    }
  },
  removeDiagram: (id: string) => {
    const currentDiagrams = get().diagrams;
    if (currentDiagrams) {
      const newDiagrams = currentDiagrams.filter(
        (diagram) => diagram.id !== id
      );
      set({ diagrams: newDiagrams });
      toast.success("Diagram deleted successfully!");
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
      toast.success("Diagram updated successfully!");
    }
  },
});

const useDiagramStore = create<DiagramStore>()(
  persist(createDiagramStore, {
    name: "diagram-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useDiagramStore;

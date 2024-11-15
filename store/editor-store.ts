import { Tables } from "@/types/supabase";
import { BackgroundVariant } from "reactflow";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Tab = "ai" | "code" | "config" | "notes" | "saved" | "settings";

interface TabStore {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

export const useTabStore = create(
  persist<TabStore>(
    (set) => ({
      currentTab: "ai",
      setCurrentTab: (tab) => set({ currentTab: tab }),
    }),
    {
      name: "tab-store", // unique name for the store
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface AITabStore {
  currentAITab: "new" | "update" | "chat";
  setCurrentAITab: (tab: "new" | "update" | "chat") => void;
}

export const useAITabStore = create(
  persist<AITabStore>(
    (set) => ({
      currentAITab: "new",
      setCurrentAITab: (tab) => set({ currentAITab: tab }),
    }),
    {
      name: "ai-tab-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface DiagramCodeStore {
  diagramCode: string;
  setDiagramCode: (code: string) => void;
}

export const useDiagramCodeStore = create<DiagramCodeStore>((set) => ({
  diagramCode: "",
  setDiagramCode: (code) => set({ diagramCode: code }),
}));

interface DiagramConfigStore {
  diagramConfig: string;
  setDiagramConfig: (config: string) => void;
}

export const useDiagramConfigStore = create<DiagramConfigStore>((set) => ({
  diagramConfig: `\
---
config:
 
---
  `,
  setDiagramConfig: (config) => set({ diagramConfig: config }),
}));

interface DiagramNotesStore {
  diagramNotes: string;
  setDiagramNotes: (notes: string) => void;
}

export const useDiagramNotesStore = create<DiagramNotesStore>((set) => ({
  diagramNotes: "",
  setDiagramNotes: (notes) => set({ diagramNotes: notes }),
}));

interface DiagramThemeStore {
  diagramTheme: string;
  setDiagramTheme: (theme: string) => void;
}

export const useDiagramThemeStore = create<DiagramThemeStore>((set) => ({
  diagramTheme: "default",
  setDiagramTheme: (theme) => set({ diagramTheme: theme }),
}));

interface DiagramLanguageStore {
  diagramLanguage: "mermaid" | "plantuml";
  setDiagramLanguage: (language: "mermaid" | "plantuml") => void;
}

export const useDiagramLanguageStore = create<DiagramLanguageStore>((set) => ({
  diagramLanguage: "mermaid",
  setDiagramLanguage: (language) => set({ diagramLanguage: language }),
}));

interface ReactFlowBackgroundStore {
  reactFlowBackground: BackgroundVariant;
  setReactFlowBackground: (variant: BackgroundVariant) => void;
}

export const useReactFlowBackground = create(
  persist<ReactFlowBackgroundStore>(
    (set) => ({
      reactFlowBackground: BackgroundVariant.Dots,
      setReactFlowBackground: (variant: BackgroundVariant) =>
        set({ reactFlowBackground: variant }),
    }),
    {
      name: "react-flow-background", // unique name for the store
      storage: createJSONStorage(() => localStorage), // storage to use for persisting the store
    }
  )
);

interface isSavingStore {
  isSaving: boolean;
  setIsSaving: (open: boolean) => void;
}

export const useIsSavingStore = create<isSavingStore>((set) => ({
  isSaving: false,
  setIsSaving: (open: boolean) => set({ isSaving: open }),
}));

export type DiagramVersion = Tables<"diagram_versions">;

interface diagramVersionStore {
  diagramVersions: DiagramVersion[];
  setDiagramVersions: (versions: DiagramVersion[]) => void;
}

export const useDiagramVersionStore = create<diagramVersionStore>((set) => ({
  diagramVersions: [],
  setDiagramVersions: (versions) => set({ diagramVersions: versions }),
}));

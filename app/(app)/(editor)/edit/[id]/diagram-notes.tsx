import { updateDiagramNotes } from "@/actions/db-actions";
import { useDiagramNotesStore, useIsSavingStore } from "@/store/editor-store";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";

export default function DiagramNotes({ diagramId }: { diagramId: string }) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");
  const { theme } = useTheme();
  const previousUpdateRef = useRef<Block[] | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setIsSaving } = useIsSavingStore();
  const [shouldSave, setShouldSave] = useState<boolean>(false);
  const { diagramNotes, setDiagramNotes } = useDiagramNotesStore();
  async function saveToStorage(jsonBlocks: Block[]) {
    setDiagramNotes(JSON.stringify(jsonBlocks));
    if (previousUpdateRef.current === jsonBlocks) return;

    previousUpdateRef.current = jsonBlocks;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(async () => {
      if (shouldSave) {
        setIsSaving(true);
        await updateDiagramNotes(diagramId, JSON.stringify(jsonBlocks));
        setIsSaving(false);
        setShouldSave(false);
        timeoutIdRef.current = null;
      }
    }, 2000);
  }

  useEffect(() => {
    setInitialContent(
      diagramNotes ? (JSON.parse(diagramNotes) as PartialBlock[]) : undefined
    );
    console.log(diagramNotes);
  }, []);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  // Renders the editor instance.
  return (
    <div className="h-[calc(100vh-50px)] w-full pt-8 overflow-scroll dark:bg-[#1f1f1f]">
      <BlockNoteView
        editor={editor}
        data-theming-css-demo
        className="font-inter"
        theme={
          theme === "dark" ? "dark" : theme === "light" ? "light" : "light"
        }
        onChange={() => {
          saveToStorage(editor.document);
          setShouldSave(true);
        }}
      />
    </div>
  );
}

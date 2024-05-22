import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function DiagramNotes({ diagramId }: { diagramId: string }) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const { theme } = useTheme();

  async function saveToStorage(jsonBlocks: Block[]) {
    // Save contents to local storage. You might want to debounce this or replace
    // with a call to your API / database.
    localStorage.setItem(diagramId, JSON.stringify(jsonBlocks));
  }

  async function loadFromStorage() {
    // Gets the previously stored editor contents.
    const storageString = localStorage.getItem(diagramId);
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  }

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
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
    <div className="h-[calc(100vh-50px)]  w-full pt-8 overflow-scroll dark:bg-[#1f1f1f]  ">
      <BlockNoteView
        editor={editor}
        data-theming-css-demo
        className="font-inter"
        theme={
          theme === "dark" ? "dark" : theme === "light" ? "light" : "light"
        }
        onChange={() => {
          saveToStorage(editor.document);
        }}
      />
    </div>
  );
}

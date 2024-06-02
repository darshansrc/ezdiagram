import React, { useRef } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { useDiagramCodeStore } from "@/store/editor-store";
import { useTheme } from "next-themes";
import initEditor from "monaco-mermaid";

const MonacoEditor = () => {
  const { diagramCode, setDiagramCode } = useDiagramCodeStore();
  const editorRef = useRef<any>(null);
  const { theme } = useTheme();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setDiagramCode(value);
    }
  };

  loader.init().then((monaco) => {
    monaco.languages.register({ id: "mermaid" });

    monaco.languages.setMonarchTokensProvider("mermaid", {
      tokenizer: {
        root: [
          [
            /\b(?:graph|sequenceDiagram|gantt|classDiagram|stateDiagram|pie|erDiagram|mindmap)\b/,
            "keyword",
          ],
          [/[{}[\]()]/, "@brackets"],
          [/[-+=><]+/, "operator"],
          [/[A-Za-z_$][\w$]*/, "identifier"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
          [/\s+/, "white"],
        ],
      },
    });

    if (theme === "dark") {
      monaco.editor.defineTheme("mermaidTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#171717",
        },
      });
    } else {
      monaco.editor.defineTheme("mermaidTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#ffffff",
        },
      });
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <Editor
        className="h-[calc(100vh-50px)]"
        defaultLanguage="mermaid"
        defaultValue={diagramCode}
        theme={"mermaidTheme"}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MonacoEditor;

import { useDiagramCodeStore, useIsSavingStore } from "@/store/editor-store";
import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import { useTheme } from "next-themes";
import { updateDiagramCode } from "@/actions/db-actions";
import { toast } from "react-hot-toast";

const CodeEditor = ({ diagramId }: { diagramId: string }) => {
  const { diagramCode, setDiagramCode } = useDiagramCodeStore();
  const { theme } = useTheme();
  const previousUpdateRef = useRef<string | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setIsSaving } = useIsSavingStore();
  const [shouldSave, setShouldSave] = useState<boolean>(false);

  const debouncedUpdate = () => {
    if (previousUpdateRef.current === diagramCode) return;
    previousUpdateRef.current = diagramCode;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(async () => {
      if (shouldSave) {
        setIsSaving(true);
        await updateDiagramCode(diagramId, diagramCode);
        setIsSaving(false);
        setShouldSave(false);
      }

      timeoutIdRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    debouncedUpdate();
  }, [diagramCode]);

  return (
    <div className=" h-full w-full flex relative flex-col">
      <CodeMirror
        value={diagramCode}
        minHeight="100%"
        minWidth="100%"
        placeholder={"Start typing your mermaid.js code here..."}
        className="w-full h-[calc(100vh-50px)] border-none no-scrollbar active:outline-none text-[12px] "
        lang="mermaid"
        extensions={[langs.mermaid()]}
        onChange={(value) => {
          setDiagramCode(value);
          setShouldSave(true);
        }}
        height="100%"
        theme={
          theme === "dark"
            ? githubDarkInit({
                settings: {
                  caret: "rgb(180 180 180)",
                  fontFamily: "monospace",
                  background: "rgb(31, 31, 31)",
                  gutterBackground: "rgb(31, 31, 31)",
                  lineHighlight: "#33333360",
                  selection: "#036dd626",
                },
              })
            : githubLightInit({
                settings: {
                  caret: "rgb(90 90 90)",
                  fontFamily: "monospace",
                  background: "rgb(255, 255, 255)",
                  gutterBackground: "rgb(255, 255, 255)",
                  lineHighlight: "#e8e8e850",
                  selection: "#036dd626",
                  gutterBorder: "#ffffff01",
                },
              })
        }
      />
    </div>
  );
};

export default CodeEditor;

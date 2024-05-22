import { useDiagramConfigStore } from "@/store/editor-store";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import { useTheme } from "next-themes";

const ConfigEditor = () => {
  const { diagramConfig, setDiagramConfig } = useDiagramConfigStore();
  const { theme } = useTheme();
  return (
    <div className=" h-full w-full flex relative flex-col">
      <CodeMirror
        value={diagramConfig}
        minHeight="100%"
        minWidth="100%"
        className="w-full h-[calc(100vh-50px)] border-none active:outline-none   text-[12px] "
        lang="mermaid"
        extensions={[langs.mermaid()]}
        onChange={setDiagramConfig}
        height="100%"
        theme={
          theme === "dark"
            ? githubDarkInit({
                settings: {
                  caret: "rgb(180 180 180)",
                  fontFamily: "monospace",
                  background: "rgb(23, 23, 23)",
                  gutterBackground: "rgb(23, 23, 23)",
                  lineHighlight: "#28282850",
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

export default ConfigEditor;

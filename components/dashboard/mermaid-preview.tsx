"use client";

import React, { useEffect, memo, useState, useCallback, useRef } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { randomUUID } from "crypto";
import {
  useDiagramConfigStore,
  useDiagramThemeStore,
} from "@/store/editor-store";
import { nanoid } from "ai";

interface MermaidPreviewProps {
  diagramCode: string;
}

const MermaidPreview = memo(async ({ diagramCode }: MermaidPreviewProps) => {
  const [container, setContainer] = useState<HTMLElement>();
  const { diagramConfig } = useDiagramConfigStore();

  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      darkMode: theme === "dark" ? true : false,
      theme: theme === "dark" ? "dark" : "default",
    });

    const reRender = async () => {
      const chart = diagramConfig + `\n` + diagramCode;

      if (container && diagramCode !== "") {
        try {
          const id = nanoid();
          const str = await mermaid.render(`mermaid-${id}`, chart);
          container.innerHTML = str.svg;
        } catch (error) {
          container.innerHTML = `<pre>${error}</pre>`;
        }
      }
    };
    reRender();
  }, [diagramCode, theme, container, diagramConfig]);

  const refElement = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  return (
    <div
      ref={refElement}
      data-name="mermaid"
      className="flex justify-center w-full h-full bg-muted/50 rounded p-1 "
    />
  );
});
MermaidPreview.displayName = "MermaidPreview";
export default MermaidPreview;

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

interface MermaidRendererProps {
  diagramCode: string;
}

const MermaidRenderer = memo(({ diagramCode }: MermaidRendererProps) => {
  const [container, setContainer] = useState<HTMLElement>();
  const { diagramConfig } = useDiagramConfigStore();

  const { diagramTheme } = useDiagramThemeStore();

  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      darkMode: theme === "dark" ? true : false,
      theme: diagramTheme,
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
  }, [diagramCode, theme, container, diagramTheme, diagramConfig]);

  const refElement = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  return (
    <div
      ref={refElement}
      data-name="mermaid"
      className="flex justify-center w-full h-full min-w-[60vw]"
    />
  );
});
MermaidRenderer.displayName = "MermaidRenderer";
export default MermaidRenderer;

"use client";

import React, { useEffect, memo } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidPreviewProps {
  chart: string | undefined;
}

const MermaidPreview = memo(async ({ chart }: MermaidPreviewProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      startOnLoad: true,
    });

    mermaid.contentLoaded();
  }, []);

  return (
    <div className="mermaid  rounded-lg h-64 overflow-hidden max-h-64 bg-muted/50 text-[0px] ">
      {chart}
    </div>
  );
});

export default MermaidPreview;

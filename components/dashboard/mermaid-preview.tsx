"use client";
import React, { Fragment, Suspense, useEffect } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { EmptyPlaceholder } from "../shared/empty-placeholder";
import { useMounted } from "@/hooks/use-mounted";

interface MermaidPreviewProps {
  chart: string | undefined;
}

const MermaidPreview = async ({ chart }: MermaidPreviewProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
    });

    mermaid.contentLoaded();
  }, [theme]);

  return (
    <div className="mermaid  rounded-lg h-64 overflow-hidden max-h-64 bg-muted/50 text-muted/50 ">
      {chart}
    </div>
  );
};

export default MermaidPreview;

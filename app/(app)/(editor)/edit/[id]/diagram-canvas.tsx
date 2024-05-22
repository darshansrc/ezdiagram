import {
  useDiagramCodeStore,
  useDiagramConfigStore,
  useDiagramThemeStore,
  useReactFlowBackground,
} from "@/store/editor-store";
import "reactflow/dist/style.css";
import { useTheme } from "next-themes";
import React, { Suspense, useState } from "react";
import MermaidRenderer from "./mermaid-renderer";
import {
  useNodesState,
  Background,
  ReactFlow,
  BackgroundVariant,
} from "reactflow";
import ZoomControls from "./zoom-controls";

const DiagramCanvas = () => {
  const { theme } = useTheme();
  const { diagramCode } = useDiagramCodeStore();

  const { reactFlowBackground, setReactFlowBackground } =
    useReactFlowBackground();
  const [panZoom, setPanZoom] = useState<boolean>(true);
  const [fullScreenModalOpen, setFullScreenModalOpen] =
    useState<boolean>(false);

  const MermaidNode = () => {
    return diagramCode && <MermaidRenderer diagramCode={diagramCode} />;
  };

  const initialNodes = [
    {
      id: "1",
      type: "svgNode",
      width: 1200,
      height: 1200,
      position: { x: 0, y: 64 },
      data: { label: "Mermaid" },
    },
  ];

  const [nodes] = useNodesState(initialNodes);

  const nodeTypes = {
    svgNode: MermaidNode,
  };

  return (
    <div className="h-[calc(100vh-50px)] ">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        snapToGrid
        className="flex items-center justify-center w-full h-full"
        selectionOnDrag={false}
        nodesDraggable={false}
      >
        <ZoomControls
          panZoom={panZoom}
          setPanZoom={setPanZoom}
          setFullScreenModalOpen={setFullScreenModalOpen}
          backgroundVariant={reactFlowBackground}
          setBackgroundVariant={setReactFlowBackground}
        />
        {
          <Background
            gap={10}
            color={
              reactFlowBackground === BackgroundVariant.Dots
                ? theme === "dark"
                  ? "rgb(40 40 40)"
                  : "rgb(230 230 230)"
                : theme === "dark"
                ? "rgb(28 28 28)"
                : "rgb(250 250 250)"
            }
            variant={reactFlowBackground}
          />
        }
      </ReactFlow>
    </div>
  );
};

export default DiagramCanvas;

import "reactflow/dist/style.css";
import MermaidRenderer from "./mermaid-renderer";
import {
  useNodesState,
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
} from "reactflow";
import MermaidPreviewRenderer from "./mermaid-preview-renderer";

const MermaidFullScreen = ({ code }: { code: string }) => {
  const MermaidNode = () => {
    return code && <MermaidPreviewRenderer diagramCode={code} />;
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
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        className="flex items-center justify-center w-full h-full"
        selectionOnDrag={false}
        nodesDraggable={false}
      >
        <Controls showInteractive={false} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={0.5} />
      </ReactFlow>
    </div>
  );
};

export default MermaidFullScreen;

import "reactflow/dist/style.css";
import MermaidRenderer from "./mermaid-renderer";
import {
  useNodesState,
  ReactFlow,
  Background,
  BackgroundVariant,
} from "reactflow";

const MermaidFullScreen = ({ code }: { code: string }) => {
  const MermaidNode = () => {
    return code && <MermaidRenderer diagramCode={code} />;
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
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MermaidFullScreen;

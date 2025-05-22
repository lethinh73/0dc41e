// components/FlowCanvas.jsx
import { ReactFlow, Background } from "@xyflow/react";

const FlowGraph = ({
  nodes,
  edges,
  forms,
  onNodesChange,
  onEdgesChange,
  nodeTypes,
}) => {
  console.log("forms", forms);

  return (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    nodeTypes={nodeTypes}
    defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
    minZoom={0.2}
    maxZoom={4}
    style={{ background: "lightgreen" }}
    attributionPosition="top-right"
    fitView
    fitViewOptions={{ padding: 0.5 }}
  >
    <Background />
  </ReactFlow>
)};

export default FlowGraph;

import { useNodesState, useEdgesState } from "@xyflow/react";
import CustomFormNode from "./components/CustomFormNode";
import FlowGraph from "./components/FlowGraph";
import processGraphData from "./lib/processGraphData.js";
import "@xyflow/react/dist/style.css";
import { useState } from "react";

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [forms, setForms] = useState([]);

  processGraphData(setNodes, setEdges, setForms);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <FlowGraph
        nodes={nodes}
        edges={edges}
        forms={forms}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{ form: CustomFormNode }}
      />
    </div>
  );
};

export default App;

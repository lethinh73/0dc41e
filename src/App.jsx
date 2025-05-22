// App.jsx
import { useNodesState, useEdgesState } from "@xyflow/react";
import CustomFormNode from "./components/CustomFormNode";
import FlowGraph from "./components/FlowGraph";
import processGraphData from "./lib/processGraphData.js";
import "@xyflow/react/dist/style.css";
import { useState, useMemo } from "react";
import PrefillMappingDisplay from "./components/PrefillMappingDisplay";
import PrefillConfigurationModal from "./components/PrefillConfigurationModal";
import { getDependentForms } from "./lib/graphUtils";

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null); // This is the NODE ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToConfigure, setFieldToConfigure] = useState(null);

  processGraphData(setNodes, setEdges, setForms);

  const selectedForm = useMemo(() => {
    if (!selectedFormId) return null;
    const selectedNode = nodes.find(node => node.id === selectedFormId);
    if (!selectedNode || !selectedNode.data.component_id) return null;
    return forms.find(form => form.id === selectedNode.data.component_id);
  }, [forms, selectedFormId, nodes]);

  // This handler will now be passed to FlowGraph's onNodeClick
  const handleNodeClick = (event, node) => { // React Flow passes event and node object
    setSelectedFormId(node.id); // Set the selected node's ID
    setIsModalOpen(false);
    setFieldToConfigure(null);
    console.log("Node clicked:", node.id); // For debugging
  };

  const handleClearPrefill = (formId, fieldName) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              prefillMappings: {
                ...form.prefillMappings,
                [fieldName]: undefined,
              },
            }
          : form
      )
    );
  };

  const handleFieldClickToConfigure = (fieldName) => {
    setFieldToConfigure(fieldName);
    setIsModalOpen(true);
  };

  const handlePrefillSelection = (
    formId,
    fieldName,
    sourceType,
    sourceData
  ) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              prefillMappings: {
                ...form.prefillMappings,
                [fieldName]: { sourceType, ...sourceData },
              },
            }
          : form
      )
    );
    setIsModalOpen(false);
    setFieldToConfigure(null);
  };

  const availablePrefillSources = useMemo(() => {
    if (!selectedForm) return {};

    const dependentNodeIds = getDependentForms(selectedFormId, nodes, edges);

    const getFormDetailsFromNodeId = (nodeId) => {
      const node = nodes.find(n => n.id === nodeId);
      if (!node || !node.data.component_id) return null;
      return forms.find(f => f.id === node.data.component_id);
    };

    const directDependencies = dependentNodeIds.direct
      .map(getFormDetailsFromNodeId)
      .filter(Boolean);

    const transitiveDependencies = dependentNodeIds.transitive
      .map(getFormDetailsFromNodeId)
      .filter(Boolean);

    const globalData = [
      { name: "Global_UserEmail", value: "user@example.com" },
      { name: "Global_OrgName", value: "My Organization" },
    ];

    return {
      directDependencies,
      transitiveDependencies,
      globalData,
    };
  }, [selectedForm, selectedFormId, nodes, edges, forms]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ height: "100%", width: "calc(100% - 350px)", padding: 5 }}>
        <FlowGraph
          nodes={nodes}
          edges={edges}
          forms={forms}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={{ form: CustomFormNode }} // Pass CustomFormNode directly
          onNodeClick={handleNodeClick} // Pass the handler here!
        />
      </div>

      <div
        style={{
          height: "100%",
          width: "350px",
          padding: 5,
          overflowY: "auto",
          backgroundColor: "#f0f0f0",
          borderLeft: "1px solid #ccc",
        }}
      >
        {selectedForm ? (
          <>
            <PrefillMappingDisplay
              form={selectedForm}
              onClearPrefill={handleClearPrefill}
              onFieldClick={handleFieldClickToConfigure}
            />
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "20%" }}>
            <h3>Click a form node to view its details and prefill configuration.</h3>
          </div>
        )}
      </div>

      {isModalOpen && selectedForm && fieldToConfigure && (
        <PrefillConfigurationModal
          form={selectedForm}
          field={fieldToConfigure}
          availableSources={availablePrefillSources}
          onSelectPrefill={handlePrefillSelection}
          onClose={() => {
            setIsModalOpen(false);
            setFieldToConfigure(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
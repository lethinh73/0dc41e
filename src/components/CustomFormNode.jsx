// CustomFormNode.jsx
import {
  Handle,
  Position,
} from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

// Custom Form Node Component
// No longer needs 'onNodeClick' prop or onClick on its div
const CustomFormNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        background: "#EAEFEF",
        border: "1px solid",
        borderRadius: 10,
        width: 150,
        cursor: "pointer", // Keep cursor to indicate it's clickable
      }}
    >
      <Handle type="target" position={Position.Left} />
        <div style={{ display: "flex", justifyContent: "start", alignItems: "center", fontFamily: "sans-serif" }}>
          <FontAwesomeIcon icon={faTable} style={{ marginRight: 5, fontSize: 2 + "em" }} />
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left", marginLeft: 5 }}>
            <div style={{ fontSize: 0.8 + "em", color: "#888" }}>
              {data.type || "Form"}
            </div>
            <div style={{ fontWeight: "bold" }}>{data.label || "Unnamed Form"}</div>
          </div>
        </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomFormNode;
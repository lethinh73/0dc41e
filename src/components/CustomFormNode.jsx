// CustomFormNode.jsx
import {
  Handle,
  Position,
} from "@xyflow/react";
import formIcon from "../assets/table-solid.svg";

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
          <img
            src={formIcon}
            alt="Form Icon"
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
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
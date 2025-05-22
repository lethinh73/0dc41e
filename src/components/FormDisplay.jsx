// components/FormDisplay.jsx
import React from "react";

const FormDisplay = ({ form }) => {
  if (!form) {
    return null;
  }

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        backgroundColor: "white",
        marginBottom: 20, // Space between this and prefill display
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h2>Form: {form.name}</h2>
      <p>ID: {form.id}</p>
      <p>Description: {form.description || "N/A"}</p>

      <h4>Form Fields:</h4>
      {form.fields && form.fields.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {form.fields.map((field) => (
            <li
              key={field.name}
              style={{
                padding: "5px 0",
                borderBottom: "1px dashed #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{field.name}</span>
              {/* You could add more details here, e.g., field type from field_schema.properties */}
              <span style={{ fontSize: "0.8em", color: "#666" }}>
                {form.field_schema?.properties?.[field.name]?.avantos_type ||
                  "unknown type"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No fields defined for this form.</p>
      )}
    </div>
  );
};

export default FormDisplay;

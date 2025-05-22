import React from "react";

const PrefillConfigurationModal = ({
  form,
  field,
  availableSources,
  onSelectPrefill,
  onClose,
}) => {
  const handleSourceSelection = (
    sourceType,
    sourceFormId,
    sourceFieldName,
    sourceName
  ) => {
    onSelectPrefill(form.id, field, sourceType, {
      sourceFormId,
      sourceFieldName,
      sourceName,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 8,
          width: "50%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "none",
            border: "none",
            fontSize: "1.5em",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h3>
          Select Prefill Source for "{field}" on "{form.name}"
        </h3>

        <h4>Form Fields (Direct Dependencies)</h4>
        {availableSources.directDependencies &&
        availableSources.directDependencies.length > 0 ? (
          <ul>
            {availableSources.directDependencies.map((depForm) => (
              <li key={depForm.id} style={{ marginBottom: 5 }}>
                <strong>Form {depForm.name}:</strong>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  {depForm.fields &&
                    depForm.fields.map((depField) => (
                      <li key={`${depForm.id}-${depField.name}`}>
                        <button
                          onClick={() =>
                            handleSourceSelection(
                              "formField",
                              depForm.id,
                              depField.name,
                              null
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: "#007bff",
                          }}
                        >
                          {depField.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No direct dependencies with fields found.</p>
        )}

        <h4>Form Fields (Transitive Dependencies)</h4>
        {availableSources.transitiveDependencies &&
        availableSources.transitiveDependencies.length > 0 ? (
          <ul>
            {availableSources.transitiveDependencies.map((depForm) => (
              <li key={depForm.id} style={{ marginBottom: 5 }}>
                <strong>Form {depForm.name}:</strong>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  {depForm.fields &&
                    depForm.fields.map((depField) => (
                      <li key={`${depForm.id}-${depField.name}`}>
                        <button
                          onClick={() =>
                            handleSourceSelection(
                              "formField",
                              depForm.id,
                              depField.name,
                              null
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: "#007bff",
                          }}
                        >
                          {depField.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transitive dependencies with fields found.</p>
        )}

        <h4>Global Data</h4>
        {availableSources.globalData &&
        availableSources.globalData.length > 0 ? (
          <ul>
            {availableSources.globalData.map((globalItem) => (
              <li key={globalItem.name}>
                <button
                  onClick={() =>
                    handleSourceSelection(
                      "globalData",
                      null,
                      null,
                      globalItem.name
                    )
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff",
                  }}
                >
                  {globalItem.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No global data available.</p>
        )}
      </div>
    </div>
  );
};

export default PrefillConfigurationModal;

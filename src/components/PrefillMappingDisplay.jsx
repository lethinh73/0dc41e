const PrefillMappingDisplay = ({ form, onClearPrefill, onFieldClick }) => {
  if (!form) return null;

  const { id: formId, name: formName, fields, prefillMappings = {} } = form;

  return (
    <div
      style={{
        marginTop: 20,
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        width: "80%",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>Prefill Configuration for {formName}</h3>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {fields.length === 0 ? (
          <p>This form has no fields to configure.</p>
        ) : (
          fields.map((field) => {
            const mapping = prefillMappings[field.name];
            const hasPrefill = !!mapping;

            return (
              <div
                key={field.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px dashed #eee",
                }}
              >
                <span style={{ fontWeight: "bold", flexGrow: 1 }}>
                  {field.name}
                </span>
                {hasPrefill ? (
                  <span style={{ color: "#555", marginRight: 10 }}>
                    Prefilled from:{" "}
                    {mapping.sourceType === "formField"
                      ? `Form ${mapping.sourceFormId}.${mapping.sourceFieldName}`
                      : `Global Data: ${mapping.sourceName}`}
                  </span>
                ) : (
                  <span
                    onClick={() => onFieldClick(field.name)}
                    style={{
                      color: "#007bff",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                  >
                    Edit
                  </span>
                )}
                {hasPrefill && (
                  <button
                    onClick={() => onClearPrefill(formId, field.name)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      fontSize: "1em",
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PrefillMappingDisplay;

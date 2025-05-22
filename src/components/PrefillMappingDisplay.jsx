import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
library.add(faDatabase);

const PrefillMappingDisplay = ({ form, onClearPrefill, onFieldClick }) => {
  if (!form) return null;

  const { id: formId, name: formName, fields, prefillMappings = {} } = form;

  // Placeholder for the toggle switch functionality as seen in the image
  // You might want to implement actual state for this if it controls prefill enablement
  const [prefillEnabled, setPrefillEnabled] = useState(true); // Example state

  return (
    <div className="mt-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Prefill</h3>
        {/* Toggle switch placeholder */}
        <div className="flex items-center">
          <span className="text-gray-600 text-sm mr-2">
            Prefill fields for this form
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={prefillEnabled}
              onChange={() => setPrefillEnabled(!prefillEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {fields.length === 0 ? (
          <p className="text-gray-600 text-center py-4">
            This form has no fields to configure.
          </p>
        ) : (
          fields.map((field) => {
            const mapping = prefillMappings[field.name];
            const hasPrefill = !!mapping;

            return (
              <div
                key={field.name}
                className={`flex items-center justify-between px-4 py-3 mb-2 rounded-md transition-all duration-200
                  ${
                    hasPrefill
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-100 border border-gray-300 border-dashed"
                  }
                `}
              >
                <div className="flex items-center flex-grow">
                  <FontAwesomeIcon icon="fa-solid fa-database" />
                  <span className="font-medium text-gray-700 ml-2">
                    {field.name}
                  </span>
                </div>

                {hasPrefill ? (
                  <span className="text-gray-600 text-sm flex-grow text-right pr-2">
                    {mapping.sourceType === "formField"
                      ? `Form ${form.name}.${mapping.sourceFieldName}`
                      : `Global Data: ${mapping.sourceName}`}
                  </span>
                ) : (
                  <button
                    onClick={() => onFieldClick(field.name)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm px-3 py-1 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                )}

                {hasPrefill && (
                  <button
                    onClick={() => onClearPrefill(formId, field.name)}
                    className="ml-2 p-1 text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full transition-colors"
                    aria-label="Clear prefill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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

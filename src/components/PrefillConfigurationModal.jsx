import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PrefillConfigurationModal = ({
  form,
  field,
  availableSources,
  onSelectPrefill,
  onClose,
}) => {
  const [openSections, setOpenSections] = useState({}); // State to manage open/close for accordion
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

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

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Basic filtering for demonstration
  const filterFields = (fields) => {
    if (!searchTerm) return fields;
    return fields.filter((f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-2xl max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-light leading-none focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Select data element to map
        </h3>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-4">
          {" "}
          {/* Scrollable content */}
          {/* Action Properties */}
          <div className="mb-3">
            <button
              onClick={() => toggleSection("actionProperties")}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-700">
                Action Properties
              </span>
              {openSections.actionProperties ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </button>
            {openSections.actionProperties && (
              <ul className="pl-4 pt-2 pb-2 bg-gray-50 border-t border-gray-200 rounded-b-md">
                {/* Mock global data for Action Properties */}
                {availableSources.globalData
                  .filter((item) => item.name.startsWith("Action")) // Filter if you want to show specific global data here
                  .map((item) => (
                    <li key={item.name} className="py-1">
                      <button
                        onClick={() =>
                          handleSourceSelection(
                            "globalData",
                            null,
                            null,
                            item.name
                          )
                        }
                        className="text-blue-600 hover:underline text-sm focus:outline-none"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                {availableSources.globalData.filter((item) =>
                  item.name.startsWith("Action")
                ).length === 0 && (
                  <li className="text-gray-500 text-sm py-1">
                    No Action Properties found.
                  </li>
                )}
              </ul>
            )}
          </div>
          {/* Client Organization Properties */}
          <div className="mb-3">
            <button
              onClick={() => toggleSection("clientOrgProperties")}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-700">
                Client Organization Properties
              </span>
              {openSections.clientOrgProperties ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </button>
            {openSections.clientOrgProperties && (
              <ul className="pl-4 pt-2 pb-2 bg-gray-50 border-t border-gray-200 rounded-b-md">
                {/* Mock global data for Client Org Properties */}
                {availableSources.globalData
                  .filter((item) => item.name.startsWith("Global_Org")) // Filter for client org properties
                  .map((item) => (
                    <li key={item.name} className="py-1">
                      <button
                        onClick={() =>
                          handleSourceSelection(
                            "globalData",
                            null,
                            null,
                            item.name
                          )
                        }
                        className="text-blue-600 hover:underline text-sm focus:outline-none"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                {availableSources.globalData.filter((item) =>
                  item.name.startsWith("Global_Org")
                ).length === 0 && (
                  <li className="text-gray-500 text-sm py-1">
                    No Client Organization Properties found.
                  </li>
                )}
              </ul>
            )}
          </div>
          {/* Form Fields (Direct Dependencies) */}
          <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
            Form Fields (Direct Dependencies)
          </h4>
          {availableSources.directDependencies &&
          availableSources.directDependencies.length > 0 ? (
            availableSources.directDependencies.map((depForm) => (
              <div key={depForm.id} className="mb-3">
                <button
                  onClick={() => toggleSection(`direct-${depForm.id}`)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-700">
                    Form {depForm.name}
                  </span>
                  {openSections[`direct-${depForm.id}`] ? (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} />
                  )}
                </button>
                {openSections[`direct-${depForm.id}`] && (
                  <ul className="pl-4 pt-2 pb-2 bg-gray-50 border-t border-gray-200 rounded-b-md">
                    {filterFields(depForm.fields).length > 0 ? (
                      filterFields(depForm.fields).map((depField) => (
                        <li
                          key={`${depForm.id}-${depField.name}`}
                          className="py-1"
                        >
                          <button
                            onClick={() =>
                              handleSourceSelection(
                                "formField",
                                depForm.id,
                                depField.name,
                                null
                              )
                            }
                            className="text-blue-600 hover:underline text-sm focus:outline-none"
                          >
                            {depField.name}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-sm py-1">
                        No fields found or match search.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm mb-4">
              No direct dependencies with fields found.
            </p>
          )}
          {/* Form Fields (Transitive Dependencies) */}
          <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
            Form Fields (Transitive Dependencies)
          </h4>
          {availableSources.transitiveDependencies &&
          availableSources.transitiveDependencies.length > 0 ? (
            availableSources.transitiveDependencies.map((depForm) => (
              <div key={depForm.id} className="mb-3">
                <button
                  onClick={() => toggleSection(`transitive-${depForm.id}`)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-700">
                    Form {depForm.name}
                  </span>
                  {openSections[`transitive-${depForm.id}`] ? (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} />
                  )}
                </button>
                {openSections[`transitive-${depForm.id}`] && (
                  <ul className="pl-4 pt-2 pb-2 bg-gray-50 border-t border-gray-200 rounded-b-md">
                    {filterFields(depForm.fields).length > 0 ? (
                      filterFields(depForm.fields).map((depField) => (
                        <li
                          key={`${depForm.id}-${depField.name}`}
                          className="py-1"
                        >
                          <button
                            onClick={() =>
                              handleSourceSelection(
                                "formField",
                                depForm.id,
                                depField.name,
                                null
                              )
                            }
                            className="text-blue-600 hover:underline text-sm focus:outline-none"
                          >
                            {depField.name}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-sm py-1">
                        No fields found or match search.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm mb-4">
              No transitive dependencies with fields found.
            </p>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors mr-2"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              /* Implement SELECT logic if needed, or remove if selection happens on field click */
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrefillConfigurationModal;

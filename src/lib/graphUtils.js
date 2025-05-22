/**
 * Traverses the graph to find direct and transitive dependencies of a given form.
 *
 * @param {string} formId The ID of the form for which to find dependencies.
 * @param {Array<Object>} nodes All nodes in the graph.
 * @param {Array<Object>} edges All edges in the graph.
 * @returns {{direct: string[], transitive: string[]}} An object containing arrays of direct and transitive dependency IDs.
 */
export const getDependentForms = (formId, nodes, edges) => {
  const directDependencies = new Set();
  const transitiveDependencies = new Set();
  const visited = new Set();

  // Helper function for DFS
  const findDependenciesDFS = (currentFormId, isDirect = true) => {
    if (visited.has(currentFormId)) {
      return;
    }
    visited.add(currentFormId);

    // Find all forms that have an edge pointing TO currentFormId
    const incomingEdges = edges.filter((edge) => edge.target === currentFormId);

    for (const edge of incomingEdges) {
      const sourceFormId = edge.source;
      if (sourceFormId !== formId) { // Don't include the form itself
        if (isDirect) {
          directDependencies.add(sourceFormId);
        } else {
          transitiveDependencies.add(sourceFormId);
        }
        // Recursively find dependencies of the source form
        findDependenciesDFS(sourceFormId, false); // All subsequent dependencies are transitive
      }
    }
  };

  findDependenciesDFS(formId, true);

  // Remove direct dependencies from transitive if they somehow ended up there
  directDependencies.forEach(dep => transitiveDependencies.delete(dep));


  return {
    direct: Array.from(directDependencies),
    transitive: Array.from(transitiveDependencies),
  };
};
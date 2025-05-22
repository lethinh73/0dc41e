import { useEffect } from "react";
import { fetchData } from "../lib/fetchData.js";

const processGraphData = (setNodes, setEdges, setForms) => {
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchData(
          "http://localhost:3000/api/v1/1/actions/blueprints/test/graph/graph"
        );

        const { nodes, edges, forms: fetchedForms } = data; // Renamed to avoid conflict

        // Create a map for quick lookup of form details by their ID
        const formDetailsMap = new Map();
        fetchedForms.forEach((form) => {
          // Extract field names from field_schema.properties
          const fields = form.field_schema && form.field_schema.properties
            ? Object.keys(form.field_schema.properties).map(fieldName => ({ name: fieldName }))
            : [];
          formDetailsMap.set(form.id, { ...form, fields });
        });

        // Process nodes to include label and actual form fields
        const processedNodes = nodes.map((node) => {
          const formDetails = formDetailsMap.get(node.data.component_id);
          return {
            ...node,
            data: {
              ...node.data,
              label: node.data.name || "Unnamed Node",
              // Attach the fields directly to the node's data for easy access
              fields: formDetails ? formDetails.fields : [],
            },
          };
        });

        // Ensure edges have unique IDs
        const processedEdges = edges.map((edge, index) => ({
          ...edge,
          id: edge.id || `${edge.source}-${edge.target}-${index}`,
        }));

        // Initialize prefillMappings for each form in the state
        const initialFormsWithPrefill = fetchedForms.map(form => ({
          ...form,
          prefillMappings: {}, // Initialize empty prefill mappings
          // Also attach fields here for the forms state itself
          fields: formDetailsMap.get(form.id)?.fields || [],
        }));


        setNodes(processedNodes);
        setEdges(processedEdges);
        setForms(initialFormsWithPrefill); // Set the augmented forms data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [setNodes, setEdges, setForms]);
};

export default processGraphData;
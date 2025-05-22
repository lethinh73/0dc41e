import { useEffect } from "react";
import { fetchData } from "../lib/fetchData.js";

const processGraphData = (setNodes, setEdges, setForms) => {
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchData(
          "http://localhost:3000/api/v1/1/actions/blueprints/test/graph/graph"
        );

        const { nodes, edges, forms } = data;

        // Process nodes to include label
        const processedNodes = nodes.map((node) => ({
          ...node,
          data: { ...node.data, label: node.data.name || "Unnamed Node" },
        }));

        // Ensure edges have unique IDs
        const processedEdges = edges.map((edge, index) => ({
          ...edge,
          id: edge.id || `${edge.source}-${edge.target}-${index}`,
        }));

        setNodes(processedNodes);
        setEdges(processedEdges);
        setForms(forms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [setNodes, setEdges, setForms]);
};

export default processGraphData;

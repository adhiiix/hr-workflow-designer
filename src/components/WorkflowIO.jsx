// src/components/WorkflowIO.jsx
import React from "react";

export default function WorkflowIO({ nodes, edges, setNodes, setEdges }) {
  const handleExport = () => {
    const data = {
      nodes,
      edges,
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "workflow.json";
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
        } else {
          alert("Invalid workflow file!");
        }
      } catch (err) {
        alert("Could not read JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="panel-section">
      <h3>Import / Export</h3>

      <button onClick={handleExport}>Download Workflow</button>

      <label style={{ marginTop: 12, display: "block", fontSize: 13 }}>
        Load Workflow JSON
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          style={{ marginTop: 6 }}
        />
      </label>
    </div>
  );
}

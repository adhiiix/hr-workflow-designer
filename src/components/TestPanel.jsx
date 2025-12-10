// src/components/TestPanel.jsx
import React, { useState } from "react";
import { simulateWorkflow } from "../api/mockApi";

export default function TestPanel({ nodes, edges }) {
  const [log, setLog] = useState([]);

  const handleTest = async () => {
    // Basic validation before simulation
    if (!nodes.length) {
      setLog(["ERROR: No nodes in workflow."]);
      return;
    }

    if (!nodes.some((n) => n.type === "start")) {
      setLog(["ERROR: Workflow needs a Start node."]);
      return;
    }

    if (!nodes.some((n) => n.type === "end")) {
      setLog(["ERROR: Workflow needs an End node."]);
      return;
    }

    // Run the simulation
    const result = await simulateWorkflow({ nodes, edges });
    setLog(result.log);
  };

  return (
    <div className="panel-section">
      <h3>Test / Sandbox</h3>

      <p style={{ fontSize: 12, marginBottom: 8 }}>
        Click "Run Simulation" to simulate the workflow from Start to End.
      </p>

      <button onClick={handleTest}>Run Simulation</button>

      <div
        className="log-box"
        style={{
          marginTop: 12,
          padding: 10,
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 6,
          height: 180,
          overflowY: "auto",
        }}
      >
        {log.length === 0 ? (
          <p style={{ fontSize: 12, color: "#666" }}>
            Execution log will appear here.
          </p>
        ) : (
          <>
            <strong style={{ fontSize: 12 }}>Execution Log:</strong>
            <ol style={{ fontSize: 12, paddingLeft: 18 }}>
              {log.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

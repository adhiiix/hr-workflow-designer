// src/components/nodes/EndNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function EndNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #e74c3c",
        borderRadius: 6,
        background: "#fdecea",
        minWidth: 120,
        color: "#000",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Only incoming handle (end of flow) */}
      <Handle type="target" position={Position.Top} />

      <strong>End</strong>
      <div style={{ fontSize: 12, marginTop: 4 }}>
        {data.message || "End of workflow"}
      </div>
    </div>
  );
}

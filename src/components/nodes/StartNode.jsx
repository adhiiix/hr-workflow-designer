// src/components/nodes/StartNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function StartNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #2ecc71",
        borderRadius: 6,
        background: "#eafaf1",
        minWidth: 160,
        color: "#000",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Only outgoing handle (start of flow) */}
      <Handle type="source" position={Position.Bottom} />

      <strong>Start</strong>
      <div style={{ fontSize: 12, marginTop: 4 }}>
        {data.title || "Start Node"}
      </div>
    </div>
  );
}

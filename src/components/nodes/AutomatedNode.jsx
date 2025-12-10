// src/components/nodes/AutomatedNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function AutomatedNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #e67e22",
        borderRadius: 6,
        background: "#fdf2e9",
        minWidth: 190,
        color: "#000",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <strong>{data.title || "Automated Step"}</strong>
      <div style={{ fontSize: 11, marginTop: 4 }}>
        {data.actionLabel ? `Action: ${data.actionLabel}` : "No action selected"}
      </div>
    </div>
  );
}

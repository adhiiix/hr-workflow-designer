// src/components/nodes/ApprovalNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function ApprovalNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #9b59b6",
        borderRadius: 6,
        background: "#f5ecff",
        minWidth: 120,
        color: "#000",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <strong>{data.title || "Approval"}</strong>
      <div style={{ fontSize: 11, marginTop: 4 }}>
        {data.approverRole ? `Role: ${data.approverRole}` : "No role set"}
      </div>
    </div>
  );
}

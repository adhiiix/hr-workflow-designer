// src/components/nodes/TaskNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function TaskNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #3498db",
        borderRadius: 6,
        background: "#ecf5fc",
        minWidth: 180,
        color: "#000",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Incoming and outgoing handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <strong>{data.title || "Task"}</strong>
      <div style={{ fontSize: 11, marginTop: 4 }}>
        {data.assignee ? `Assignee: ${data.assignee}` : "No assignee"}
      </div>
    </div>
  );
}

// src/components/Sidebar.jsx
import React from "react";

const items = [
  { label: "Start Node", type: "start" },
  { label: "Task Node", type: "task" },
  { label: "Approval Node", type: "approval" },
  { label: "Automated Step Node", type: "automated" },
  { label: "End Node", type: "end" },
];

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar">
      <h3>Nodes</h3>
      {items.map((item) => (
        <div
          key={item.type}
          className="sidebar-item"
          draggable
          onDragStart={(event) => onDragStart(event, item.type)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

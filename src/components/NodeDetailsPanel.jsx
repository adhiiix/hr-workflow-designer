// src/components/NodeDetailsPanel.jsx
import React from "react";

export default function NodeDetailsPanel({
  selectedNode,
  updateNodeData,
  deleteNode,
}) {
  if (!selectedNode) {
    return (
      <div className="panel-section">
        <h3>Node Details</h3>
        <p style={{ fontSize: 12, color: "#666" }}>
          Select a node on the canvas to edit its settings.
        </p>
      </div>
    );
  }

  const { id, type, data } = selectedNode;

  const handleChange = (field) => (e) => {
    updateNodeData(id, { [field]: e.target.value });
  };

  const labelMap = {
    start: "Start",
    task: "Task",
    approval: "Approval",
    automated: "Automated Step",
    end: "End",
  };

  const title = labelMap[type] || "Node";

  return (
    <div className="panel-section">
      <h3>Edit Node: {title}</h3>

      {/* START NODE */}
      {type === "start" && (
        <>
          <label>Start Title</label>
          <input
            type="text"
            value={data.title || ""}
            onChange={handleChange("title")}
          />
        </>
      )}

      {/* TASK NODE */}
      {type === "task" && (
        <>
          <label>Task Title</label>
          <input
            type="text"
            value={data.title || ""}
            onChange={handleChange("title")}
          />

          <label>Description</label>
          <textarea
            rows={3}
            value={data.description || ""}
            onChange={handleChange("description")}
          />

          <label>Assignee</label>
          <input
            type="text"
            value={data.assignee || ""}
            onChange={handleChange("assignee")}
          />

          <label>Due Date</label>
          <input
            type="date"
            value={data.dueDate || ""}
            onChange={handleChange("dueDate")}
          />
        </>
      )}

      {/* APPROVAL NODE */}
      {type === "approval" && (
        <>
          <label>Approval Title</label>
          <input
            type="text"
            value={data.title || ""}
            onChange={handleChange("title")}
          />

          <label>Approver Role</label>
          <input
            type="text"
            value={data.approverRole || ""}
            onChange={handleChange("approverRole")}
          />

          <label>Notes / Description</label>
          <textarea
            rows={3}
            value={data.description || ""}
            onChange={handleChange("description")}
          />
        </>
      )}

      {/* AUTOMATED NODE */}
      {type === "automated" && (
        <>
          <label>Step Title</label>
          <input
            type="text"
            value={data.title || ""}
            onChange={handleChange("title")}
          />

          <label>Action Label</label>
          <input
            type="text"
            value={data.actionLabel || ""}
            onChange={handleChange("actionLabel")}
          />

          <label>Details</label>
          <textarea
            rows={3}
            value={data.description || ""}
            onChange={handleChange("description")}
          />
        </>
      )}

      {/* END NODE */}
      {type === "end" && (
        <>
          <label>End Message</label>
          <textarea
            rows={3}
            value={data.message || ""}
            onChange={handleChange("message")}
          />
        </>
      )}

      {/* Divider */}
      <hr style={{ margin: "14px 0" }} />

      {/* ✅ Delete node button */}
      <button
        type="button"
        onClick={deleteNode}
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid #e74c3c",
          background: "#fdecea",
          color: "#c0392b",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Delete Node
      </button>
    </div>
  );
}

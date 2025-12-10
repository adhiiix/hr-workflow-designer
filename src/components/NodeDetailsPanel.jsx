// src/components/NodeDetailsPanel.jsx
import React, { useEffect, useState } from "react";
import { getAutomations } from "../api/mockApi";

// ---------- START NODE FORM ----------
function StartForm({ node, onChange }) {
  return (
    <>
      <p style={{ fontSize: 12, marginBottom: 6 }}>
        This is the entry point of the workflow.
      </p>
      <label>Start Title</label>
      <input
        placeholder="e.g. New Employee Onboarding starts"
        value={node.data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />
    </>
  );
}

// ---------- TASK NODE FORM ----------
function TaskForm({ node, onChange }) {
  return (
    <>
      <p style={{ fontSize: 12, marginBottom: 6 }}>
        A human task that someone in HR/Manager needs to complete.
      </p>
      <label>Task Title</label>
      <input
        placeholder="e.g. Collect joining documents"
        value={node.data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />

      <label>Description</label>
      <textarea
        rows={3}
        placeholder="Short description of what needs to be done"
        value={node.data.description || ""}
        onChange={(e) => onChange({ description: e.target.value })}
      />

      <label>Assignee (Who will do this?)</label>
      <input
        placeholder="e.g. adithyan, HR executive, manager"
        value={node.data.assignee || ""}
        onChange={(e) => onChange({ assignee: e.target.value })}
      />

      <label>Due Date</label>
      <input
        type="date"
        value={node.data.dueDate || ""}
        onChange={(e) => onChange({ dueDate: e.target.value })}
      />
    </>
  );
}

// ---------- APPROVAL NODE FORM ----------
function ApprovalForm({ node, onChange }) {
  return (
    <>
      <p style={{ fontSize: 12, marginBottom: 6 }}>
        A step where a manager / HR needs to approve or reject something.
      </p>

      <label>Approval Title</label>
      <input
        placeholder="e.g. Manager approval for leave"
        value={node.data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />

      <label>Approver Role</label>
      <input
        placeholder='e.g. "Manager", "HRBP", "Director"'
        value={node.data.approverRole || ""}
        onChange={(e) => onChange({ approverRole: e.target.value })}
      />

      <label>Auto-approve Threshold</label>
      <input
        type="number"
        placeholder="e.g. 2 (auto-approve after 2 days)"
        value={node.data.threshold || ""}
        onChange={(e) => onChange({ threshold: e.target.value })}
      />
    </>
  );
}

// ---------- AUTOMATED NODE FORM ----------
function AutomatedForm({ node, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAutomations().then(setOptions);
  }, []);

  const handleActionChange = (e) => {
    const id = e.target.value;
    const selected = options.find((o) => o.id === id);
    if (!selected) return;
    const paramsState = {};
    selected.params.forEach((p) => {
      paramsState[p] = node.data.params?.[p] || "";
    });
    onChange({
      actionId: selected.id,
      actionLabel: selected.label,
      params: paramsState,
    });
  };

  const currentAction =
    options.find((o) => o.id === node.data.actionId) || null;

  return (
    <>
      <p style={{ fontSize: 12, marginBottom: 6 }}>
        A system step that runs automatically (like sending email).
      </p>

      <label>Step Title</label>
      <input
        placeholder="e.g. Send welcome email"
        value={node.data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />

      <label>Select Automated Action</label>
      <select
        value={node.data.actionId || ""}
        onChange={handleActionChange}
      >
        <option value="">Select Action</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>

      {currentAction &&
        currentAction.params.map((p) => (
          <div key={p}>
            <label>{p}</label>
            <input
              placeholder={`Enter value for "${p}"`}
              value={node.data.params?.[p] || ""}
              onChange={(e) =>
                onChange({
                  params: {
                    ...(node.data.params || {}),
                    [p]: e.target.value,
                  },
                })
              }
            />
          </div>
        ))}
    </>
  );
}

// ---------- END NODE FORM ----------
function EndForm({ node, onChange }) {
  return (
    <>
      <p style={{ fontSize: 12, marginBottom: 6 }}>
        Final step of the workflow – what message should be shown?
      </p>

      <label>End Message</label>
      <textarea
        rows={2}
        placeholder="e.g. Onboarding completed successfully"
        value={node.data.message || ""}
        onChange={(e) => onChange({ message: e.target.value })}
      />

      <label style={{ marginTop: 10 }}>
        <input
          type="checkbox"
          checked={!!node.data.summary}
          onChange={(e) => onChange({ summary: e.target.checked })}
          style={{ marginRight: 6 }}
        />
        Generate summary report at the end
      </label>
    </>
  );
}

// ---------- MAIN PANEL ----------
export default function NodeDetailsPanel({ selectedNode, updateNodeData }) {
  if (!selectedNode) {
    return (
      <div className="panel-section">
        <h3>Node Details</h3>
        <p>Select a node in the canvas to edit its settings.</p>
        <p style={{ fontSize: 12, marginTop: 8, color: "#555" }}>
          Tip: Drag a node from the left sidebar, drop it on the canvas,
          then click it.
        </p>
      </div>
    );
  }

  const handleChange = (partial) => {
    updateNodeData(selectedNode.id, partial);
  };

  let content = null;
  switch (selectedNode.type) {
    case "start":
      content = <StartForm node={selectedNode} onChange={handleChange} />;
      break;
    case "task":
      content = <TaskForm node={selectedNode} onChange={handleChange} />;
      break;
    case "approval":
      content = <ApprovalForm node={selectedNode} onChange={handleChange} />;
      break;
    case "automated":
      content = <AutomatedForm node={selectedNode} onChange={handleChange} />;
      break;
    case "end":
      content = <EndForm node={selectedNode} onChange={handleChange} />;
      break;
    default:
      content = <p>No form for this node type.</p>;
  }

  return (
    <div className="panel-section">
      <h3>
        Edit Node:{" "}
        <span style={{ textTransform: "capitalize" }}>
          {selectedNode.type}
        </span>
      </h3>
      {content}
    </div>
  );
}

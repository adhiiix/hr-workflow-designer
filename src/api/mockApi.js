// src/api/mockApi.js

/**
 * Simulates walking through the workflow from Start → End
 * following the first outgoing edge each time.
 */
export async function simulateWorkflow({ nodes, edges }) {
  const log = [];

  if (!nodes.length) {
    log.push("No nodes in workflow.");
    return { log };
  }

  // 1. Find the Start node
  const startNode = nodes.find((n) => n.type === "start");
  if (!startNode) {
    log.push("ERROR: Workflow has no Start node.");
    return { log };
  }

  // Keep track of visited nodes to detect loops
  const visited = new Set();
  let current = startNode;

  while (current) {
    if (visited.has(current.id)) {
      log.push("ERROR: Loop detected in workflow.");
      break;
    }
    visited.add(current.id);

    // 2. Add log entry based on node type
    switch (current.type) {
      case "start":
        log.push("Start: " + (current.data.title || "Workflow begins."));
        break;

      case "task":
        log.push(
          "Task: " +
            (current.data.title || "Task") +
            (current.data.assignee
              ? ` → Assignee: ${current.data.assignee}`
              : "")
        );
        break;

      case "approval":
        log.push(
          "Approval: " +
            (current.data.title || "Approval step") +
            (current.data.approverRole
              ? ` → Approver Role: ${current.data.approverRole}`
              : "")
        );
        break;

      case "automated":
        log.push(
          "Automated Step: " +
            (current.data.title || "Automation") +
            (current.data.actionLabel
              ? ` → Action: ${current.data.actionLabel}`
              : "")
        );
        break;

      case "end":
        log.push("End: " + (current.data.message || "Workflow completed."));
        break;

      default:
        log.push("Visited node: " + current.id);
    }

    // 3. Find the next node (follow first outgoing edge)
    const outgoing = edges.filter((e) => e.source === current.id);
    if (!outgoing.length) break; // no more connections

    const nextEdge = outgoing[0];
    const nextNode = nodes.find((n) => n.id === nextEdge.target);

    if (!nextNode) {
      log.push("ERROR: Edge points to missing node " + nextEdge.target);
      break;
    }

    current = nextNode;
  }

  return { log };
}

/**
 * Mock API for Automated Step Node actions
 */
export async function getAutomations() {
  return [
    { id: "sendEmail", label: "Send Email" },
    { id: "assignTask", label: "Assign Task" },
    { id: "triggerWebhook", label: "Trigger Webhook" },
  ];
}

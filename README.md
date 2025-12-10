# HR Workflow Designer

This is a prototype HR workflow designer built using **React**, **Vite**, and **React Flow**.  
It allows HR teams to visually design onboarding flows using drag-and-drop nodes, configure node details in a side panel, run a simple simulation, and import/export workflows as JSON.

---

## 1. Architecture

### 1.1 High-Level Overview

The application is a **single-page React app** structured into three main areas:

- **Left Sidebar** – palette of available node types
- **Center Canvas** – React Flow canvas used to draw the workflow
- **Right Panel** – node configuration, test/sandbox, and import/export tools

The app uses **React Flow** for graph management (nodes + edges), and a small **mock API layer** to simulate workflow execution.

### 1.2 Key Technologies

- **React 18 + Vite** – fast dev environment and SPA bundling
- **React Flow** – graph editor (nodes, edges, drag & drop)
- **JavaScript / JSX, CSS** – components and styling

### 1.3 Important Files & Folders

- `src/App.jsx`  
  - Main layout (header, sidebar, canvas, right panel)  
  - Manages `nodes`, `edges`, selected node state  
  - Integrates React Flow and wires events (onDrop, onConnect, onNodeClick, etc.)

- `src/components/Sidebar.jsx`  
  - Renders draggable node types (Start, Task, Approval, Automated Step, End)  
  - Uses HTML5 drag & drop; when dropped on React Flow, a new node is created.

- `src/components/nodes/`  
  - `StartNode.jsx`  
  - `TaskNode.jsx`  
  - `ApprovalNode.jsx`  
  - `AutomatedNode.jsx`  
  - `EndNode.jsx`  
  Each file defines the visual appearance and basic content of a custom node type.

- `src/components/NodeDetailsPanel.jsx`  
  - Shows a form for the currently selected node.  
  - Fields change based on node type: Task, Approval, Automated, End, etc.  
  - On change, it updates node `data` via callbacks from `App.jsx`.  
  - Includes a **"Delete Node"** button which removes the node and any connected edges.

- `src/components/TestPanel.jsx`  
  - Provides a **Test / Sandbox** area with a `Run Simulation` button.  
  - When clicked, it calls the mock API with the current `nodes` and `edges`.  
  - Displays a step-by-step execution log for the workflow.

- `src/components/WorkflowIO.jsx`  
  - Handles **Import / Export** of the workflow as JSON.  
  - Export: downloads `{ nodes, edges }` as a file.  
  - Import: loads a JSON file and restores the canvas state.

- `src/api/mockApi.js`  
  - Contains a simple **mock API** used by `TestPanel`.  
  - Accepts the current workflow graph and returns a simulated execution log  
    (e.g., "Start Node executed", "Task: Collect Documents completed", etc.).

---

## 2. How to Run the Project

### 2.1 Prerequisites

- Node.js (LTS) installed
- npm (comes with Node)

### 2.2 Local Setup

```bash
# Clone the repository
git clone https://github.com/adhiiix/hr-workflow-designer.git

cd hr-workflow-designer

# Install dependencies
npm install

# Start the development server
npm run dev

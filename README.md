# HR Workflow Designer – Visual Workflow Builder (React + React Flow)

This project is a **visual workflow designer** built using **React**, **Vite**, and **React Flow**.  
Users can drag-and-drop HR workflow nodes such as Start, Task, Approval, Automated Step, and End to design a complete onboarding workflow.  
Each node includes a configuration form, and the entire workflow can be **simulated**, **exported**, and **imported**.

This submission satisfies all required deliverables:  
✔ React app using Vite  
✔ Custom React Flow nodes  
✔ Node configuration/editing panel  
✔ Mock API for workflow simulation  
✔ Workflow Test/Sandbox panel  
✔ README explaining architecture & design decisions  

---

## 🚀 1. Project Features

### ⭐ Visual Workflow Canvas  
- Drag nodes from the sidebar  
- Drop them onto the canvas  
- Connect them using React Flow edges  
- Move/position nodes freely  

### ⭐ Node Configuration Panel  
Each node type has its own form:

- **Start Node:** Start title  
- **Task Node:** Title, description, assignee, due date  
- **Approval Node:** Approver role, notes  
- **Automated Step Node:** Action label, details  
- **End Node:** Final completion message  

### ⭐ Delete Node  
A "Delete Node" button appears when selecting a node, removing the node and all its connected edges.

### ⭐ Workflow Simulation (Mock API)  
Click **Run Simulation** to:
- Process the workflow step-by-step  
- View execution logs  
- Validate connectivity  

### ⭐ Import / Export Workflow  
- Export workflow as a JSON file  
- Import previously saved workflows  
- Ideal for submission, testing, or restoring work  

---

# 🛠 2. Architecture Overview

The application is split into three functional sections:

### 🧩 2.1 React Flow Canvas  
Located in the center — displays nodes and edges.  
Responsible for drag-and-drop, connections, and visualization.

### 🧩 2.2 Left Sidebar  
Sidebar items are draggable.  
When dropped on the canvas, a new node is created at that position.

### 🧩 2.3 Right Panel  
Three functional blocks:  
1. **Node Details Panel**  
2. **Workflow Simulation Panel**  
3. **Import/Export Panel**

---

## 📁 3. Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main layout, state management, canvas logic |
| `src/components/Sidebar.jsx` | Drag-and-drop node palette |
| `src/components/NodeDetailsPanel.jsx` | Node editing form + delete node |
| `src/components/TestPanel.jsx` | Simulation/Test environment |
| `src/components/WorkflowIO.jsx` | JSON import/export of workflows |
| `src/api/mockApi.js` | Mock API to simulate workflow execution |
| `src/components/nodes/*.jsx` | Custom node components |

---

# ▶️ 4. How to Run the Project

### 4.1 Install Dependencies
```bash
npm install



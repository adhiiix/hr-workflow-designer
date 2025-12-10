# HR Workflow Designer

A fully interactive HR Workflow Designer built using **React**, **Vite**, and **React Flow**.  
This tool allows HR teams to visually design onboarding workflows using drag-and-drop nodes, edit node details, simulate workflows, and import/export workflow configurations.

---

## ✨ 1. Features

### 🎯 Workflow Canvas (React Flow)
- Drag-and-drop nodes onto the canvas  
- Nodes snap into structured grid layout  
- Connect nodes using arrows to build workflow paths  
- Custom-designed Start, Task, Approval, Automated Step, and End nodes  

### 📝 Node Editing Panel
Each node has a right-side editing panel allowing users to update:
- Title  
- Description  
- Assignee / Approver role  
- Dates or details (depending on node type)  
- **Delete Node** action  

### 🧪 Test / Sandbox Simulation Panel
- Preview and run a step-by-step workflow simulation  
- Shows execution flow from Start → End  
- Displays each step in readable log format  

### 🔄 Import / Export JSON
- Export current workflow structure as JSON  
- Import saved workflows back into the designer  

### 🧪 Mock API Integration
- Simulated backend response for workflow execution  
- No real backend required  

### 📸 Screenshots Included
A `/screenshots` folder is included for documentation.

---

## 🏗 2. Architecture Overview

src/
│
├── api/
│ └── mockApi.js # Mock backend simulation
│
├── components/
│ ├── nodes/ # Custom node components
│ │ ├── StartNode.jsx
│ │ ├── TaskNode.jsx
│ │ ├── ApprovalNode.jsx
│ │ ├── AutomatedNode.jsx
│ │ └── EndNode.jsx
│ │
│ ├── Sidebar.jsx # Node palette for drag-and-drop
│ ├── NodeDetailsPanel.jsx # Right-side form for editing nodes
│ ├── TestPanel.jsx # Workflow simulation UI
│ └── WorkflowIO.jsx # Import/Export functionality
│
├── App.jsx # Main layout + React Flow logic
├── App.css # Global styling
└── main.jsx # Application entry point



### 🧠 Core Design Decisions
1. **React Flow** chosen for professional-grade workflow diagrams  
2. **Right-side editing panel** ensures minimal canvas clutter  
3. **Mock API** keeps project self-contained  
4. **Delete Node button** placed in edit panel to avoid accidental deletion  
5. **Color-coded nodes** to differentiate workflow stages  
6. **Screenshots folder** for assignment documentation  

---

## 📁 3. Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main layout, state management, canvas logic |
| `src/components/Sidebar.jsx` | Drag-and-drop node palette |
| `src/components/NodeDetailsPanel.jsx` | Node editing + delete functionality |
| `src/components/TestPanel.jsx` | Simulation/Test environment |
| `src/components/WorkflowIO.jsx` | JSON import/export |
| `src/api/mockApi.js` | Mock backend simulation |
| `src/components/nodes/*.jsx` | Custom node UI components |

---

# 🚀 4. How to Run the Project

## **4.1 Install Dependencies**

Install required node modules using:

```bash
npm install
```

---

## **4.2 Start the Development Server**

Run the Vite dev server:

```bash
npm run dev
```

This will start the project at:

👉 http://localhost:5173/

---

# 📘 5. How the Workflow Simulation Works

The mock API simulates workflow execution:

- Takes current nodes + edges  
- Starts at Start Node  
- Follows edges sequentially  
- Logs each executed step  
- Returns simulation log to Test Panel
  
'''md
This provides a realistic preview of HR automation.

---

# 🧩 6. **Design Considerations**

## **UI / UX Choices**
- Clean layout inspired by modern HR SaaS tools  
- Centralized workflow canvas to focus user attention  
- Right-side editing panel for clarity and reduced clutter  
- Soft, readable pastel colors for each node type  
- Larger, accessible fonts and spacing for usability  
- Drag-and-drop interactions simplified to be beginner-friendly  

## **Technical Choices**
- **Vite** for lightning-fast development server  
- **React Flow** for stable, scalable workflow rendering  
- **Mock API** to avoid backend complexity  
- **Component-based architecture** for clean separation of logic  
- **JSON import/export** ensures portability of workflows  

---

# 🚧 7. **What Was Completed**

### ✔ Fully Implemented Features
- Interactive **React Flow canvas**  
- **Five custom HR nodes**  
  - Start  
  - Task  
  - Approval  
  - Automated Step  
  - End  
- Right-side **node editing forms**  
- **Delete node** functionality in edit panel  
- Workflow **simulation engine + Test Sandbox**  
- **JSON import/export**  
- Top **header bar UI** for professionalism  
- `/screenshots` folder added for documentation  
- Clean, modular project structure  
- Styled UI with consistent colors and spacing  

---

# 🔮 8. **What Could Be Added With More Time**

### 🚀 Future Enhancements (Not Implemented Yet)
- Conditional branching (Yes / No flows)  
- Parallel approval paths  
- Auto-arrange layout / smart alignment  
- Workflow version history  
- Real backend with database (Firebase / Supabase)  
- User authentication and roles  
- Animated execution path visualization  
- Multi-select, copy-paste, keyboard shortcuts  
- Export workflow as **PNG / PDF**  

---

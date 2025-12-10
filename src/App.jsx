// src/App.jsx
import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import "./App.css";

import Sidebar from "./components/Sidebar";
import NodeDetailsPanel from "./components/NodeDetailsPanel";
import TestPanel from "./components/TestPanel";
import WorkflowIO from "./components/WorkflowIO";

import StartNode from "./components/nodes/StartNode";
import TaskNode from "./components/nodes/TaskNode";
import ApprovalNode from "./components/nodes/ApprovalNode";
import AutomatedNode from "./components/nodes/AutomatedNode";
import EndNode from "./components/nodes/EndNode";

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const initialNodes = [];
const initialEdges = [];

function Flow() {
  const reactFlowWrapper = useRef(null);
  const reactFlow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // connect nodes with edges
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
          },
          eds
        )
      ),
    [setEdges]
  );

  // select node
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  // click on empty space → clear selection
  const onPaneClick = () => {
    setSelectedNode(null);
  };

  // allow drag from sidebar
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // drop from sidebar into canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlow.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {},
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlow, setNodes]
  );

  // update node data from right panel
  const updateNodeData = (id, partialData) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...partialData } }
          : node
      )
    );

    if (selectedNode?.id === id) {
      setSelectedNode((n) => ({ ...n, data: { ...n.data, ...partialData } }));
    }
  };

  // ✅ delete selected node + its edges
  const deleteSelectedNode = () => {
    if (!selectedNode) return;

    const idToDelete = selectedNode.id;

    setNodes((nodes) => nodes.filter((n) => n.id !== idToDelete));
    setEdges((edges) =>
      edges.filter(
        (e) => e.source !== idToDelete && e.target !== idToDelete
      )
    );
    setSelectedNode(null);
  };

  return (
    <div className="app-root">
      {/* 🔝 Top title bar */}
      <header className="app-header">
        <h2>
          HR Workflow Designer <span>• Prototype Tool</span>
        </h2>
      </header>

      {/* Left sidebar */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* Middle: canvas */}
      <main
        className="canvas-wrapper"
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </main>

      {/* Right side panel */}
      <section className="right-panel">
        <NodeDetailsPanel
          selectedNode={selectedNode}
          updateNodeData={updateNodeData}
          deleteNode={deleteSelectedNode}
        />
        <TestPanel nodes={nodes} edges={edges} />
        <WorkflowIO
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </section>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

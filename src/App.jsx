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

import Sidebar from "./components/Sidebar";
import NodeDetailsPanel from "./components/NodeDetailsPanel";
import TestPanel from "./components/TestPanel";
import WorkflowIO from "./components/WorkflowIO";

import StartNode from "./components/nodes/StartNode";
import TaskNode from "./components/nodes/TaskNode";
import ApprovalNode from "./components/nodes/ApprovalNode";
import AutomatedNode from "./components/nodes/AutomatedNode";
import EndNode from "./components/nodes/EndNode";

import "./App.css";

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const initialNodes = [];

function Flow() {
  const reactFlowWrapper = useRef(null);
  const reactFlow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // ✅ Correct drop using React Flow's coordinate system
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      // position relative to the canvas wrapper
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

      setNodes((nodes) => [...nodes, newNode]);
    },
    [reactFlow, setNodes]
  );

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

  return  (
    <div className="app-root">
      <Sidebar />

      <div className="canvas-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <div className="right-panel">
        <NodeDetailsPanel
          selectedNode={selectedNode}
          updateNodeData={updateNodeData}
        />
        <TestPanel nodes={nodes} edges={edges} />
        <WorkflowIO
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
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

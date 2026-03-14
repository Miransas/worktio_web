/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 100, y: 100 }, 
    data: { label: 'Gemini AI' },
    style: { background: '#1e1e2e', color: '#cdd6f4', border: '1px solid #cba6f7', borderRadius: '8px', padding: '10px' } 
  },
  { 
    id: '2', 
    position: { x: 400, y: 150 }, 
    data: { label: 'Gmail Send' },
    style: { background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '8px', padding: '10px' } 
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '80vh' }} className="bg-[#09090b] rounded-xl border border-zinc-800 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode="dark" // Worktio ruhuna uygun karanlık mod!
      >
        <Background color="#27272a" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
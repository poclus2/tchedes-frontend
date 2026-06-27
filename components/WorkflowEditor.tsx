"use client";

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start (Hosted Link)' },
    position: { x: 250, y: 50 },
    style: { border: '2px solid #0052FF', borderRadius: '8px', padding: '10px', fontWeight: 'bold' }
  },
  {
    id: 'doc-upload',
    data: { label: 'Document Upload (ID)' },
    position: { x: 250, y: 150 },
    style: { borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'selfie',
    data: { label: 'Biometric Liveness' },
    position: { x: 250, y: 250 },
    style: { borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'decision',
    type: 'output',
    data: { label: 'Final Decision' },
    position: { x: 250, y: 350 },
    style: { border: '2px solid #10B981', borderRadius: '8px', padding: '10px', fontWeight: 'bold' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'start', target: 'doc-upload', animated: true },
  { id: 'e2-3', source: 'doc-upload', target: 'selfie', animated: true },
  { id: 'e3-4', source: 'selfie', target: 'decision' },
];

export default function WorkflowEditor({ workflowId }: { workflowId: string }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleSave = async () => {
    console.log("Saving workflow:", { workflowId, nodes, edges });
    alert("Workflow graph saved successfully!");
  };

  return (
    <div className="h-[700px] w-full border border-border rounded-xl bg-white dark:bg-zinc-950 shadow-sm overflow-hidden flex flex-col relative">
      <div className="border-b border-border p-4 flex justify-between items-center bg-gray-50 dark:bg-zinc-900 z-10">
        <div>
            <h3 className="font-semibold">Workflow Graph Editor</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Drag nodes to rearrange, pull from handles to connect.</p>
        </div>
        <div className="space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-zinc-800 border border-border rounded-md text-sm hover:bg-gray-50 dark:hover:bg-zinc-700">Add Step</button>
            <button onClick={handleSave} className="px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded-md text-sm hover:opacity-90">Save Workflow</button>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-50/50 dark:bg-zinc-950/50">
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomNode } from "./CustomNode";
import { FlowControls } from "./FlowControls";
import { useNodeManagement } from "../hooks/useNodeManagement";
import { useFlowProcessing } from "../hooks/useFlowProcessing";
import { ApiKeyInput } from "./ApiKeyInput";
import { ModelNameInput } from "./ModelNameInput";

export const FlowEditor: React.FC = () => {
  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
  } = useNodeManagement();

  const { processFlow, stopFlow, isProcessing } = useFlowProcessing(
    nodes,
    edges,
    setNodes
  );

  const [mounted, setMounted] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <ApiKeyInput />
      <ModelNameInput />
      <FlowControls
        showAddOptions={showAddOptions}
        setShowAddOptions={setShowAddOptions}
        handleAddNode={handleAddNode}
        processFlow={processFlow}
        isProcessing={isProcessing}
        stopFlow={stopFlow} // pass the new stopFlow prop
        mounted={mounted}
      />

      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ customNode: CustomNode }}
          defaultEdgeOptions={{
            style: { strokeWidth: 8 },
          }}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowEditor;

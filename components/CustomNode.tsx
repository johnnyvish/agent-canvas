import React, { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { NodeForm } from "./NodeForm";
import { NodeOutput } from "./NodeOutput";
import { NodeData } from "../types/flowTypes";

type CustomNodeProps = {
  id: string;
  data: NodeData;
  selected: boolean;
};

export const CustomNode: React.FC<CustomNodeProps> = ({
  id,
  data,
  selected,
}) => {
  const [systemPrompt, setSystemPrompt] = useState(data.systemPrompt);
  const [userQuery, setUserQuery] = useState(data.userQuery || "");

  // use ReactFlow's setNodes to update the global node state
  const { setNodes } = useReactFlow();

  const updateNodeData = (changes: Partial<NodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...changes } } : node
      )
    );
  };

  useEffect(() => {
    setSystemPrompt(data.systemPrompt);
    setUserQuery(data.userQuery || "");
  }, [data.systemPrompt, data.userQuery]);

  return (
    <div
      className={`w-60 p-4 bg-gray-800 text-white flex flex-col items-center justify-center shadow-2xl rounded-2xl cursor-pointer gap-6 relative 
        ${
          data.isProcessing
            ? "border-2 border-blue-500"
            : data.error
            ? "border-2 border-red-500"
            : selected
            ? "border-2 border-yellow-500"
            : "border-2 border-transparent"
        }`}
    >
      {!data.isRoot && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#555", width: 20, height: 20 }}
        />
      )}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555", width: 20, height: 20 }}
      />

      <div className="absolute top-3 right-3">
        <div
          className={`w-4 h-4 rounded-full ${
            data.isProcessing
              ? "bg-blue-500 animate-pulse"
              : data.error
              ? "bg-red-500"
              : data.output
              ? "bg-green-500"
              : "bg-gray-600"
          }`}
        />
      </div>

      <h1 className="font-bold">{data.label}</h1>

      <NodeForm
        data={data}
        systemPrompt={systemPrompt}
        userQuery={userQuery}
        setSystemPrompt={setSystemPrompt}
        setUserQuery={setUserQuery}
        updateNodeData={updateNodeData}
      />

      <NodeOutput data={data} />
    </div>
  );
};

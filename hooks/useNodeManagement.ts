import { useCallback } from "react";
import {
  Node,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import { NodeData } from "@/types/flowTypes";

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    type: "customNode",
    position: { x: 200, y: 50 },
    data: {
      label: "Root Node",
      systemPrompt: "You are a helpful assistant.",
      userQuery: "What are the implications of AI?",
      isRoot: true,
      output: "",
      isProcessing: false,
    },
  },
];

const initialEdges: Edge[] = [];

export const useNodeManagement = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge: Edge = {
        id: `e${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        type: "default",
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const handleAddNode = useCallback(
    (isRoot: boolean) => {
      const id = (nodes.length + 1).toString();
      const newNode: Node<NodeData> = {
        id,
        type: "customNode",
        position: {
          x: Math.random() * 500 + 50,
          y: Math.random() * 500 + 50,
        },
        data: {
          label: isRoot ? "Root Node" : "New Node",
          systemPrompt: isRoot
            ? "You are a helpful assistant."
            : "Default prompt",
          isRoot,
          output: "",
          isProcessing: false,
        },
      };
      setNodes((ns) => [...ns, newNode]);
    },
    [nodes, setNodes]
  );

  return {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
  };
};

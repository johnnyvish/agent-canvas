// types.ts
type NodeData = {
  label: string;
  systemPrompt: string;
  userQuery?: string;
  isRoot: boolean;
  output?: string;
  isProcessing?: boolean;
  error?: string;
};

type LLMResponse = {
  output: string;
  error?: string;
};

// llmService.ts
const simulateLLMResponse = async (
  systemPrompt: string,
  input: string
): Promise<LLMResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate response
  return {
    output: `Simulated response for input: "${input}" with system prompt: "${systemPrompt}"`,
  };
};

// useFlowEditorLogic.tsx
import { useCallback, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  getOutgoers,
} from "@xyflow/react";

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

export default function useFlowEditorLogic() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isProcessing, setIsProcessing] = useState(false);

  // Process a single node
  const processNode = async (
    node: Node<NodeData>,
    input: string
  ): Promise<string> => {
    // Update node to show processing state
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: { ...n.data, isProcessing: true, error: undefined },
            }
          : n
      )
    );

    try {
      const response = await simulateLLMResponse(node.data.systemPrompt, input);

      // Update node with response
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: {
                  ...n.data,
                  output: response.output,
                  isProcessing: false,
                },
              }
            : n
        )
      );

      return response.output;
    } catch (error) {
      // Update node with error
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: {
                  ...n.data,
                  error: "Error processing node",
                  isProcessing: false,
                },
              }
            : n
        )
      );
      throw error;
    }
  };

  // Process the entire flow starting from root nodes
  const processFlow = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Find all root nodes
      const rootNodes = nodes.filter((node) => node.data.isRoot);

      // Process each root node and its descendants
      for (const rootNode of rootNodes) {
        await processNodeAndDescendants(rootNode);
      }
    } catch (error) {
      console.error("Error processing flow:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Recursively process a node and its descendants
  const processNodeAndDescendants = async (node: Node<NodeData>) => {
    // Get the input for this node
    const input = node.data.isRoot
      ? node.data.userQuery || ""
      : node.data.output || "";

    // Process the current node
    const output = await processNode(node, input);

    // Get all outgoing nodes
    const outgoers = getOutgoers(node, nodes, edges);

    // Process all outgoing nodes
    for (const outgoer of outgoers) {
      await processNodeAndDescendants(outgoer as Node<NodeData>);
    }

    return output;
  };

  // Rest of your existing functions...
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
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
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
    processFlow,
    isProcessing,
  };
}

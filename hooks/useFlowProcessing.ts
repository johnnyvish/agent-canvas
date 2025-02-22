import { useState, useRef } from "react";
import { Node, Edge, getOutgoers } from "@xyflow/react";
import { NodeData } from "../types/flowTypes";
import { useNodeProcessing } from "./useNodeProcessing";

export const useFlowProcessing = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const cancelProcessingRef = useRef(false);
  const { processNode } = useNodeProcessing(setNodes);

  const processNodeAndDescendants = async (
    node: Node<NodeData>,
    input?: string
  ) => {
    // If processing has been cancelled, stop immediately.
    if (cancelProcessingRef.current) return;

    const effectiveInput = node.data.isRoot
      ? node.data.userQuery || ""
      : input || "";
    const output = await processNode(node, effectiveInput);

    // Check cancellation between nodes.
    if (cancelProcessingRef.current) return;

    const outgoers = getOutgoers(node, nodes, edges);
    for (const outgoer of outgoers) {
      await processNodeAndDescendants(outgoer as Node<NodeData>, output);
      if (cancelProcessingRef.current) break;
    }

    return output;
  };

  const processFlow = async () => {
    if (isProcessing) return;
    cancelProcessingRef.current = false;
    setIsProcessing(true);

    try {
      // Reset all node states before processing.
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            output: "",
            error: undefined,
            isProcessing: false,
          },
        }))
      );

      const rootNodes = nodes.filter((node) => node.data.isRoot);
      // Process all root nodes concurrently.
      await Promise.all(
        rootNodes.map((rootNode) => processNodeAndDescendants(rootNode))
      );
    } catch (error) {
      console.error("Error processing flow:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // New stopFlow function to cancel processing.
  const stopFlow = () => {
    cancelProcessingRef.current = true;
    setIsProcessing(false);
  };

  return { processFlow, stopFlow, isProcessing };
};

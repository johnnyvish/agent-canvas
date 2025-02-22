import { Node } from "@xyflow/react";
import { NodeData } from "../types/flowTypes";
import { getLLMResponse } from "@/services/llmService";
import { useConfiguration } from "@/contexts/ConfigurationContext";

export const useNodeProcessing = (
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>
) => {
  const { apiKey, model } = useConfiguration();
  const processNode = async (
    node: Node<NodeData>,
    input: string
  ): Promise<string> => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id
          ? { ...n, data: { ...n.data, isProcessing: true, error: undefined } }
          : n
      )
    );

    try {
      const response = await getLLMResponse(
        model,
        apiKey,
        node.data.systemPrompt,
        input
      );
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

  return { processNode };
};

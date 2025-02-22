export type NodeData = {
  label: string;
  systemPrompt: string;
  userQuery?: string;
  isRoot: boolean;
  output?: string;
  isProcessing?: boolean;
  error?: string;
};

export type LLMResponse = {
  output: string;
  error?: string;
};

import React from "react";
import { NodeData } from "../types/flowTypes";

type NodeFormProps = {
  data: NodeData;
  systemPrompt: string;
  userQuery: string;
  setSystemPrompt: (value: string) => void;
  setUserQuery: (value: string) => void;
  updateNodeData: (changes: Partial<NodeData>) => void;
};

export const NodeForm: React.FC<NodeFormProps> = ({
  data,
  systemPrompt,
  userQuery,
  setSystemPrompt,
  setUserQuery,
  updateNodeData,
}) => (
  <>
    <div className="flex flex-col justify-center items-center w-full gap-2">
      <h2 className="text-md font-semibold">System Prompt</h2>
      <textarea
        value={systemPrompt}
        onChange={(e) => {
          const newPrompt = e.target.value;
          setSystemPrompt(newPrompt);
          updateNodeData({ systemPrompt: newPrompt });
        }}
        className="w-full h-24 rounded-lg text-black text-sm px-2 py-2 resize-none"
      />
    </div>

    {data.isRoot && (
      <div className="flex flex-col justify-center items-center w-full gap-2">
        <h2 className="text-md font-semibold">User Query</h2>
        <textarea
          value={userQuery}
          onChange={(e) => {
            const newQuery = e.target.value;
            setUserQuery(newQuery);
            updateNodeData({ userQuery: newQuery });
          }}
          className="w-full h-24 rounded-lg text-black text-sm px-2 py-2 resize-none"
        />
      </div>
    )}
  </>
);

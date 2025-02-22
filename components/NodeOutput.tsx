import React from "react";
import { NodeData } from "../types/flowTypes";

type NodeOutputProps = {
  data: NodeData;
};

export const NodeOutput: React.FC<NodeOutputProps> = ({ data }) => (
  <div className="flex flex-col justify-center items-center w-full gap-2">
    <h2 className="text-md font-semibold">Output</h2>
    <textarea
      value={data.output || ""}
      readOnly
      className={`w-full h-24 rounded-lg text-black text-sm px-2 py-2 resize-none overflow-auto
        ${data.error ? "bg-red-100" : "bg-white"}`}
    />
    {data.error && <p className="text-red-500 text-sm">{data.error}</p>}
  </div>
);

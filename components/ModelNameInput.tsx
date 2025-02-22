import React, { useState, useEffect } from "react";
import { useConfiguration } from "@/contexts/ConfigurationContext";

// List of LLM text model options
const modelOptions = [
  "gpt-4o",
  "chatgpt-4o-latest",
  "gpt-4o-mini",
  "o1",
  "o1-mini",
  "o1-preview",
  "o3-mini",
  "gpt-4-turbo",
  "gpt-4",
  "gpt-3.5-turbo",
];

export const ModelNameInput: React.FC = () => {
  const { model, setModel } = useConfiguration();
  const [selectedModel, setSelectedModel] = useState(model);

  useEffect(() => {
    setSelectedModel(model);
  }, [model]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    setModel(newModel);
  };

  return (
    <div className="absolute z-20 top-16 right-0 m-4 flex items-center gap-4">
      <div className="relative">
        <select
          value={selectedModel}
          onChange={handleChange}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          {modelOptions.map((modelName) => (
            <option key={modelName} value={modelName}>
              {modelName}
            </option>
          ))}
        </select>
        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 7.548l4.484 4.482 4.484-4.482L16 8.632l-6 6-6-6z" />
          </svg>
        </div>
      </div>
      <span className="text-gray-800 w-20">Model</span>
    </div>
  );
};

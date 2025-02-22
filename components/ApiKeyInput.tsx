import React, { useState, useEffect } from "react";
import { useConfiguration } from "@/contexts/ConfigurationContext";

export const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useConfiguration();
  const [inputValue, setInputValue] = useState(apiKey);

  // Keep the input in sync with the context's apiKey value.
  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey]);

  // Automatically update the context's apiKey whenever the input value changes.
  useEffect(() => {
    setApiKey(inputValue);
  }, [inputValue, setApiKey]);

  return (
    <div className="absolute z-20 top-4 right-0 m-4 flex items-center gap-4">
      <input
        type="password"
        placeholder="Enter your OpenAI API key"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-4 py-2 rounded-xl border"
      />
      <span className="text-gray-800 w-20">API Key</span>
    </div>
  );
};

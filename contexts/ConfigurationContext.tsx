"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

interface ConfigurationContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (model: string) => void;
}

const ConfigurationContext = createContext<
  ConfigurationContextType | undefined
>(undefined);

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4o-mini"); // default model

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    const storedModel = localStorage.getItem("model");
    if (storedModel) {
      setModel(storedModel);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    if (model) {
      localStorage.setItem("model", model);
    }
  }, [model]);

  return (
    <ConfigurationContext.Provider
      value={{ apiKey, setApiKey, model, setModel }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = (): ConfigurationContextType => {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};

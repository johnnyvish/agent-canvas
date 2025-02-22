import OpenAI from "openai";
import { LLMResponse } from "@/types/flowTypes";

export const getLLMResponse = async (
  model: string,
  apiKey: string,
  systemPrompt: string,
  input: string
): Promise<LLMResponse> => {
  if (!apiKey) {
    return { output: "", error: "No API key provided." };
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
    });

    const output = response.choices[0]?.message?.content || "";
    return { output };
  } catch (error) {
    console.error("Error fetching LLM response:", error);
    return { output: "", error: "Failed to fetch response from LLM." };
  }
};

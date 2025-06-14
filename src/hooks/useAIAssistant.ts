
import { useState } from "react";

// Keys for localStorage
const OPENAI_API_KEY = "openai_api_key";
const PERPLEXITY_API_KEY = "perplexity_api_key";
const PROVIDER_KEY = "ai_provider";

export type AIProvider = "openai" | "perplexity";

export function useAIAssistant() {
  // API keys and provider
  const [openaiApiKey, setOpenaiApiKeyState] = useState<string>(() =>
    localStorage.getItem(OPENAI_API_KEY) || ""
  );
  const [perplexityApiKey, setPerplexityApiKeyState] = useState<string>(() =>
    localStorage.getItem(PERPLEXITY_API_KEY) || ""
  );
  const [provider, setProviderState] = useState<AIProvider>(() =>
    (localStorage.getItem(PROVIDER_KEY) as AIProvider) || "openai"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyIsInvalid, setKeyIsInvalid] = useState(false);

  // API key setters, with storage
  function saveOpenaiApiKey(key: string) {
    setOpenaiApiKeyState(key);
    localStorage.setItem(OPENAI_API_KEY, key);
    setKeyIsInvalid(false);
    setError(null);
  }
  function savePerplexityApiKey(key: string) {
    setPerplexityApiKeyState(key);
    localStorage.setItem(PERPLEXITY_API_KEY, key);
    setKeyIsInvalid(false);
    setError(null);
  }
  function saveProvider(provider: AIProvider) {
    setProviderState(provider);
    localStorage.setItem(PROVIDER_KEY, provider);
    setError(null);
    setKeyIsInvalid(false);
  }

  async function sendQuestion(question: string): Promise<string> {
    setError(null);
    setKeyIsInvalid(false);

    setIsLoading(true);
    let result = "";
    if (provider === "openai") {
      if (!openaiApiKey) {
        setError("No OpenAI API key set");
        setKeyIsInvalid(true);
        setIsLoading(false);
        return "";
      }
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are Aura, a friendly security assistant. Speak conversationally and answer any cyber security, app, or device safety questions clearly for everyday users.",
              },
              {
                role: "user",
                content: question,
              },
            ],
            max_tokens: 180,
          }),
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Invalid OpenAI API key.");
            setKeyIsInvalid(true);
          } else if (res.status === 429) {
            setError(
              "OpenAI: Rate limit exceeded. Try a different key or check usage at platform.openai.com/usage."
            );
            setKeyIsInvalid(true);
          } else {
            setError("Error from OpenAI: " + res.statusText);
          }
          setIsLoading(false);
          return "";
        }

        const data = await res.json();
        result =
          data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : "Sorry, I couldn't get an answer. Please try again.";
        setKeyIsInvalid(false);
      } catch (e) {
        setError("Network error. Please check your connection.");
        setIsLoading(false);
        return "";
      }
    } else if (provider === "perplexity") {
      if (!perplexityApiKey) {
        setError("No Perplexity API key set");
        setKeyIsInvalid(true);
        setIsLoading(false);
        return "";
      }
      try {
        // Perplexity call
        const res = await fetch(
          "https://api.perplexity.ai/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${perplexityApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.1-sonar-small-128k-online",
              messages: [
                {
                  role: "system",
                  content:
                    "You are Aura, a friendly security assistant. Speak conversationally and answer any cyber security, app, or device safety questions clearly for everyday users.",
                },
                {
                  role: "user",
                  content: question,
                },
              ],
              temperature: 0.2,
              top_p: 0.9,
              max_tokens: 400,
              return_images: false,
              return_related_questions: false,
              search_domain_filter: ["perplexity.ai"],
              search_recency_filter: "month",
              frequency_penalty: 1,
              presence_penalty: 0,
            }),
          }
        );
        if (!res.ok) {
          if (res.status === 401) {
            setError("Invalid Perplexity API key.");
            setKeyIsInvalid(true);
          } else if (res.status === 429) {
            setError(
              "Perplexity: Rate limit exceeded. Check your plan or use a different key."
            );
            setKeyIsInvalid(true);
          } else {
            setError("Error from Perplexity: " + res.statusText);
          }
          setIsLoading(false);
          return "";
        }
        const data = await res.json();
        result =
          data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : "Sorry, I couldn't get an answer. Please try again.";
        setKeyIsInvalid(false);
      } catch (e) {
        setError("Network error (Perplexity). Please check your connection.");
        setIsLoading(false);
        return "";
      }
    } else {
      setError("Invalid provider choice.");
      setIsLoading(false);
      return "";
    }
    setIsLoading(false);
    return result;
  }

  return {
    openaiApiKey,
    perplexityApiKey,
    provider,
    setOpenaiApiKey: saveOpenaiApiKey,
    setPerplexityApiKey: savePerplexityApiKey,
    setProvider: saveProvider,
    isLoading,
    error,
    keyIsInvalid,
    sendQuestion,
  };
}


import { useState } from "react";

// Store and retrieve API key from localStorage safely
const API_KEY_KEY = "openai_api_key";

export function useOpenAIChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem(API_KEY_KEY) || "";
  });
  const [error, setError] = useState<string | null>(null);

  // Save key in localStorage when set
  function saveApiKey(key: string) {
    setApiKey(key);
    localStorage.setItem(API_KEY_KEY, key);
  }

  async function sendQuestion(question: string): Promise<string> {
    setError(null);

    if (!apiKey) {
      setError("No OpenAI API key set");
      return "";
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
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
          setError("Invalid API key.");
        } else if (res.status === 429) {
          setError("Rate limit exceeded. Try again later.");
        } else {
          setError("Error from OpenAI: " + res.statusText);
        }
        setIsLoading(false);
        return "";
      }

      const data = await res.json();
      const answer =
        data.choices && data.choices[0]?.message?.content
          ? data.choices[0].message.content.trim()
          : "Sorry, I couldn't get an answer. Please try again.";
      setIsLoading(false);
      return answer;
    } catch (e) {
      setError("Network error. Please check your connection.");
      setIsLoading(false);
      return "";
    }
  }

  return {
    apiKey,
    setApiKey: saveApiKey,
    isLoading,
    error,
    sendQuestion,
  };
}

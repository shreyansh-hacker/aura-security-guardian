import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { useAIAssistant, AIProvider } from "../hooks/useAIAssistant";

const providerNames = {
  openai: "OpenAI",
  perplexity: "Perplexity"
};

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    {
      from: "bot",
      text: "Hi! I'm your AI security assistant. Ask me anything about device, app, or online safety.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isKeyDialog, setIsKeyDialog] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [localProvider, setLocalProvider] = useState<AIProvider>("openai");
  const [keyError, setKeyError] = useState<string | null>(null);
  const {
    openaiApiKey,
    perplexityApiKey,
    provider,
    setOpenaiApiKey,
    setPerplexityApiKey,
    setProvider,
    isLoading,
    error,
    keyIsInvalid,
    sendQuestion,
  } = useAIAssistant();

  // Keep local selection in sync with provider (for the dialog radio buttons)
  useEffect(() => {
    setLocalProvider(provider);
  }, [provider]);

  // Show the key dialog if the API key is missing or invalid
  useEffect(() => {
    let missing =
      (provider === "openai" && !openaiApiKey) ||
      (provider === "perplexity" && !perplexityApiKey);
    if (keyIsInvalid || (missing && !isKeyDialog)) {
      setIsKeyDialog(true);
      setKeyError(
        error ||
          `Please enter a valid ${providerNames[provider]} API key.`
      );
    }
    // Only clear error if not invalid
    if (!keyIsInvalid && isKeyDialog) setKeyError(null);
    // eslint-disable-next-line
  }, [keyIsInvalid, openaiApiKey, perplexityApiKey, error, provider]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;
    setMessages((m) => [...m, { from: "user", text: input.trim() }]);
    if (
      (provider === "openai" && !openaiApiKey) ||
      (provider === "perplexity" && !perplexityApiKey)
    ) {
      setIsKeyDialog(true);
      setInput("");
      return;
    }
    const question = input.trim();
    setInput("");
    setMessages((m) => [
      ...m,
      { from: "bot", text: "Thinking..." },
    ]);
    const answer = await sendQuestion(question);
    setMessages((m) => [
      ...m.slice(0, -1),
      {
        from: "bot",
        text: answer || error || "Sorry, there was a problem. Try again.",
      },
    ]);
  }

  function handleKeySave() {
    if (!keyInput.trim()) return;
    if (localProvider === "openai") {
      setOpenaiApiKey(keyInput.trim());
    } else {
      setPerplexityApiKey(keyInput.trim());
    }
    setIsKeyDialog(false);
    setKeyInput("");
    setKeyError(null);
  }

  function handleOpenKeyDialog() {
    setIsKeyDialog(true);
    setKeyInput("");
    setKeyError(null);
  }

  // Switch provider from input radio
  function handleSwitchProvider(newProvider: AIProvider) {
    setLocalProvider(newProvider);
    setProvider(newProvider);
    setKeyInput(""); // clear any existing input
  }

  return (
    <div className="rounded-3xl shadow-lg border border-blue-100 overflow-hidden max-w-full">
      <div className="bg-gradient-to-tr from-blue-400 via-blue-100 to-white px-6 py-3 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-600" />
        <h3 className="font-semibold text-lg text-blue-900">Security Chatbot</h3>
        <button
          className="ml-auto text-xs px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium"
          onClick={handleOpenKeyDialog}
          disabled={isLoading}
          aria-label="Change API Key"
        >
          API Key
        </button>
        {/* Provider switch (toggle) */}
        <div className="ml-3 flex items-center gap-2">
          <button
            className={`text-xs px-2 rounded transition-all ${
              provider === "openai"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => handleSwitchProvider("openai")}
            disabled={provider === "openai" || isLoading}
            aria-label="Use OpenAI"
          >
            OpenAI
          </button>
          <button
            className={`text-xs px-2 rounded transition-all ${
              provider === "perplexity"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => handleSwitchProvider("perplexity")}
            disabled={provider === "perplexity" || isLoading}
            aria-label="Use Perplexity"
          >
            Perplexity
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 h-64 overflow-y-auto mb-2 space-y-1 scrollbar-thin scrollbar-thumb-blue-100">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2
              ${msg.from === "bot"
                ? "justify-start text-blue-700"
                : "justify-end text-gray-800"}`}
          >
            {msg.from === "bot" ? (
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 drop-shadow" />
                <span className={`text-sm rounded-xl px-2 py-1 ${msg.text === "Thinking..." ? "italic opacity-60" : ""}`}>
                  {msg.text}
                </span>
              </span>
            ) : (
              <span className="text-sm bg-blue-100 px-3 py-1 rounded-xl">{msg.text}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1 px-4 pb-3">
        <input
          className="border px-3 py-2 rounded-xl flex-1"
          placeholder="Type your security question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={isLoading}
        />
        <button
          className={`bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 shadow ${
            isLoading || !input.trim() ? "opacity-60" : ""
          }`}
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>

      {/* API Key Dialog */}
      {isKeyDialog && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full">
            <div className="mb-3 font-bold text-lg">Enter your API Key</div>
            <div className="mb-2 flex gap-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="provider"
                  checked={localProvider === "openai"}
                  onChange={() => handleSwitchProvider("openai")}
                />
                <span className="ml-1">OpenAI</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="provider"
                  checked={localProvider === "perplexity"}
                  onChange={() => handleSwitchProvider("perplexity")}
                />
                <span className="ml-1">Perplexity</span>
              </label>
            </div>
            <input
              className="border px-2 py-2 rounded w-full mb-3"
              placeholder={
                localProvider === "openai"
                  ? "sk-..." // OpenAI example
                  : "pk-..." // Perplexity example
              }
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={handleKeySave}
                disabled={!keyInput.trim()}
              >
                Save
              </button>
              {!keyIsInvalid && (
                <button
                  className="bg-gray-200 px-3 py-1 rounded"
                  onClick={() => {
                    setIsKeyDialog(false);
                    setKeyInput("");
                    setKeyError(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {localProvider === "openai" ? (
                <>
                  Your key will be stored safely in your browser.&nbsp;
                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Get OpenAI Key
                  </a>
                </>
              ) : (
                <>
                  Your key will be stored safely in your browser.&nbsp;
                  <a
                    href="https://platform.perplexity.ai/settings/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Get Perplexity Key
                  </a>
                </>
              )}
            </div>
            {keyError && (
              <div className="mt-3 text-red-600 text-xs">{keyError}</div>
            )}
          </div>
        </div>
      )}

      {/* General Error message */}
      {error && !isKeyDialog && !keyIsInvalid && (
        <div className="text-red-600 mt-3 text-sm px-4">{error}</div>
      )}
      <div className="text-xs px-4 pb-2 text-gray-400">
        Powered by {providerNames[provider]}.<br />
        Use your own API key (see settings).
      </div>
    </div>
  );
}

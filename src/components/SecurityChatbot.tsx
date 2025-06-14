
import { useState } from "react";
import { Shield } from "lucide-react";
import { useOpenAIChat } from "../hooks/useOpenAI";

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "bot", text: "Hi! I'm your AI security assistant. Ask me anything about device, app, or online safety." },
  ]);
  const [input, setInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const {
    apiKey,
    setApiKey,
    isLoading,
    error,
    sendQuestion,
  } = useOpenAIChat();
  const [isKeyDialog, setIsKeyDialog] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;
    setMessages((m) => [...m, { from: "user", text: input.trim() }]);
    if (!apiKey) {
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
      ...m.slice(0, -1), // Remove 'Thinking...'
      { from: "bot", text: answer || (error || "Sorry, there was a problem. Try again.") },
    ]);
  }

  function handleKeySave() {
    if (keyInput.trim()) {
      setApiKey(keyInput.trim());
      setKeyInput("");
      setIsKeyDialog(false);
    }
  }

  return (
    <div className="rounded-3xl shadow-lg border border-blue-100 overflow-hidden max-w-full">
      <div className="bg-gradient-to-tr from-blue-400 via-blue-100 to-white px-6 py-3 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-600" />
        <h3 className="font-semibold text-lg text-blue-900">Security Chatbot</h3>
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
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          disabled={isLoading}
        />
        <button
          className={`bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 shadow ${isLoading || !input.trim() ? "opacity-60" : ""}`}
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>

      {/* API Key Dialog */}
      {isKeyDialog && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <div className="mb-2 font-bold text-lg">Enter your OpenAI API Key</div>
            <input
              className="border px-2 py-2 rounded w-full mb-3"
              placeholder="sk-..."
              value={keyInput}
              type="password"
              onChange={e => setKeyInput(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={handleKeySave}
                disabled={!keyInput.trim()}
              >
                Save
              </button>
              <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => { setIsKeyDialog(false); setKeyInput(""); }}
              >
                Cancel
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Your key will be stored safely in your browser.{" "}
              <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                Get API Key
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && !isKeyDialog && (
        <div className="text-red-600 mt-3 text-sm px-4">{error}</div>
      )}
    </div>
  );
}

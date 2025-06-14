import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { useAIAssistant, AIProvider } from "../hooks/useAIAssistant";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const providerNames = {
  openai: "OpenAI",
  perplexity: "Perplexity"
};

// Improved interview steps: "type" = "input" or "options"
const interviewSteps = [
  {
    key: "topic",
    question: "What security issue or topic do you need help with?",
    type: "options",
    options: [
      "Suspicious email",
      "App permissions",
      "Unsafe website",
      "Virus/Malware",
      "Phishing attempt",
      "Lost/Stolen device",
      "Data breach",
      "Other"
    ]
  },
  {
    key: "device",
    question: "What device are you using?",
    type: "options",
    options: [
      "iPhone",
      "Android Phone",
      "Windows PC",
      "Mac",
      "Tablet",
      "Other"
    ]
  },
  {
    key: "details",
    question: "Which best describes your concern?",
    type: "options",
    options: [
      "I received a suspicious message or email",
      "An app is acting strangely",
      "A website gave me a warning",
      "I think my device is infected",
      "Account password may be stolen",
      "Other/Not listed"
    ]
  },
  {
    key: "urgency",
    question: "How urgent is this issue?",
    type: "options",
    options: [
      "Not urgent",
      "Somewhat urgent",
      "Very urgent",
      "Emergency"
    ]
  },
];

export default function SecurityChatbot() {
  // Each message: { from: "bot" | "user", text: string }
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isKeyDialog, setIsKeyDialog] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [localProvider, setLocalProvider] = useState<AIProvider>("openai");
  const [keyError, setKeyError] = useState<string | null>(null);

  // Live Answering states
  const [step, setStep] = useState(0); // which interview step we are on
  const [answers, setAnswers] = useState<{ [key: string]: string }>({}); // collect step answers
  const [submitted, setSubmitted] = useState(false);

  const [optionValue, setOptionValue] = useState(""); // for radio/select

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

  // Start the interview if it's the user's first visit
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: `👋 Welcome to LiveAnswering! I'll guide you step-by-step to resolve your security issue. Respond to my questions below.`,
        },
        {
          from: "bot",
          text: interviewSteps[0].question,
        },
      ]);
      setStep(0);
      setAnswers({});
      setSubmitted(false);
    }
  }, [messages.length]);

  // Open API key dialog if needed
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
    if (!keyIsInvalid && isKeyDialog) setKeyError(null);
    // eslint-disable-next-line
  }, [keyIsInvalid, openaiApiKey, perplexityApiKey, error, provider]);

  // Updated useEffect to reset optionValue on step change
  useEffect(() => {
    setOptionValue("");
  }, [step]);

  // Handle input submission in step-by-step mode
  async function handleSend() {
    const currentStep = interviewSteps[step];
    const valueToUse =
      currentStep.type === "options" ? optionValue : input.trim();

    if (!valueToUse || isLoading) return;

    // Add user message
    setMessages((m) => [...m, { from: "user", text: valueToUse }]);

    // Collect answer
    const currentStepKey = currentStep.key;
    const nextStep = step + 1;
    setAnswers((prev) => ({
      ...prev,
      [currentStepKey]: valueToUse,
    }));
    setInput("");
    setOptionValue("");

    // If more steps, ask next question; else, process & summarize/ask AI
    if (nextStep < interviewSteps.length) {
      setStep(nextStep);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { from: "bot", text: interviewSteps[nextStep].question },
        ]);
      }, 350);
    } else {
      // End of interview – process everything
      setStep(nextStep);
      setSubmitted(true);
      setTimeout(async () => {
        // Build a system + user prompt summarizing the answers
        const summaryText = `Thank you! Here's what you've told me:
        
- Topic: ${answers["topic"] ?? input.trim()}
- Device: ${answers["device"] ?? ""}
- Details: ${answers["details"] ?? ""}
- Urgency: ${answers["urgency"] ?? ""}

Summarizing your responses. I will now analyze your situation and provide step-by-step advice.`;

        setMessages((m) => [
          ...m,
          { from: "bot", text: summaryText },
          { from: "bot", text: "Processing your information..." },
        ]);
        // Prepare a full context prompt for the AI
        const fullPrompt = `You are a friendly security assistant. The user has answered these questions:
- Topic: ${answers["topic"] ?? input.trim()}
- Device: ${answers["device"] ?? ""}
- Details: ${answers["details"] ?? ""}
- Urgency: ${answers["urgency"] ?? ""}

Provide a clear, helpful, step-by-step answer and next steps for this user.`;

        const aiReply = await sendQuestion(fullPrompt);
        setMessages((m) => [
          ...m.slice(0, -1), // remove "Processing your information..."
          {
            from: "bot",
            text: aiReply || error || "Sorry, there was a problem. Try again.",
          },
        ]);
      }, 600);
    }
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
        <h3 className="font-semibold text-lg text-blue-900">LiveAnswering</h3>
        <button
          className="ml-auto text-xs px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium"
          onClick={handleOpenKeyDialog}
          disabled={isLoading}
          aria-label="Change API Key"
        >
          API Key
        </button>
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
      {/* Show input only if not finished submitting */}
      {(step < interviewSteps.length && !submitted) && (
        <div className="flex flex-col gap-2 mt-1 px-4 pb-3">
          <RadioGroup
            value={optionValue}
            onValueChange={setOptionValue}
            className="mb-2"
          >
            {interviewSteps[step].options.map((option: string) => (
              <div key={option} className="flex items-center space-x-2 mb-1">
                <RadioGroupItem value={option} id={option} />
                <label
                  htmlFor={option}
                  className="text-sm cursor-pointer select-none"
                >
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
          <button
            className={`bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 shadow ${
              isLoading || !optionValue ? "opacity-60" : ""
            }`}
            onClick={handleSend}
            disabled={isLoading || !optionValue}
          >
            Next
          </button>
        </div>
      )}

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

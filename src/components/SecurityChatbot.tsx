
import { useState } from "react";
import { Shield } from "lucide-react";

const FAQS = [
  {
    keywords: ["phishing", "avoid phishing", "fake sites", "phishing sites"],
    question: "How do I avoid phishing sites?",
    answer: "Never click on unknown or suspicious URLs, especially in messages or emails. Check the sender address and look for typos."
  },
  {
    keywords: ["app safe", "app is safe", "scan app", "apk", "untrusted"],
    question: "How can I check if an app is safe?",
    answer: "Scan apps regularly and avoid installing APK files from untrusted sources."
  },
  {
    keywords: ["real-time protection", "real time protection", "what is real-time", "threats detected"],
    question: "What is real-time protection?",
    answer: "It means threats are detected and blocked as soon as they appear, not just during scans."
  },
  {
    keywords: ["battery draining", "battery drain", "why battery", "background", "push notification"],
    question: "Why is my battery draining fast?",
    answer: "Battery may drain faster if apps run in background, send push notifications, or perform heavy tasks."
  },
];

function findFAQMatch(userInput: string) {
  const input = userInput.toLowerCase();
  for (const faq of FAQS) {
    if (
      faq.keywords.some(kw => input.includes(kw))
      || input === faq.question.toLowerCase()
    ) {
      return faq;
    }
  }
  return null;
}

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<{ from: string, text: string }[]>([
    { from: "bot", text: "Hi! I'm your security assistant. Ask me about threats, safe browsing, battery tips, and more." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages(m => [...m, { from: "user", text: question }]);
    const hit = findFAQMatch(question);

    const answer =
      hit?.answer ||
      "Sorry, I don't know about that yet. Try asking me about phishing, app safety, or battery issues!";
    setTimeout(() => {
      setMessages(m => [...m, { from: "bot", text: answer }]);
    }, 600);
    setInput("");
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Security Chatbot</h3>
      <div className="border rounded-lg shadow-inner bg-gray-50 p-3 h-64 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2
              ${msg.from === "bot"
                ? "justify-start text-blue-700"
                : "justify-end text-gray-800"}`}
          >
            {msg.from === "bot" &&
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-sm">{msg.text}</span>
              </span>}
            {msg.from === "user" &&
              <span className="text-sm bg-blue-100 px-3 py-1 rounded-xl">{msg.text}</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <input
          className="border px-3 py-2 rounded flex-1"
          placeholder="Type your security question"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 shadow"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}


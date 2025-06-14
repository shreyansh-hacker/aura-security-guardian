
import { useState } from "react";
import { Shield } from "lucide-react";

const FAQS = [
  { question: "How do I avoid phishing sites?", answer: "Never click on unknown or suspicious URLs, especially in messages or emails. Check the sender address and look for typos." },
  { question: "How can I check if an app is safe?", answer: "Scan apps regularly and avoid installing APK files from untrusted sources." },
  { question: "What is real-time protection?", answer: "It means threats are detected and blocked as soon as they appear, not just during scans." },
  { question: "Why is my battery draining fast?", answer: "Battery may drain faster if apps run in background, send push notifications, or perform heavy tasks." },
];

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<{ from: string, text: string }[]>([
    { from: "bot", text: "Hi! I'm your security assistant. Ask me about threats, safe browsing, battery tips, and more." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "user", text: input }]);
    // basic keyword match for demo
    const key = input.toLowerCase();
    const hit = FAQS.find(f => key.includes(f.question.toLowerCase().slice(0, 7)));
    const answer =
      hit?.answer ||
      "Sorry, I don't know about that yet. Try asking another security-related question!";
    setTimeout(() => {
      setMessages(m => [...m, { from: "bot", text: answer }]);
    }, 700);
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
              ${msg.from === "bot" ? "text-blue-700" : "justify-end text-gray-800"}`}
          >
            {msg.from === "bot" && <Shield className="w-4 h-4" />} <span className="text-sm">{msg.text}</span>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover-scale shadow"
          onClick={handleSend}
          disabled={!input}
        >
          Send
        </button>
      </div>
    </div>
  );
}

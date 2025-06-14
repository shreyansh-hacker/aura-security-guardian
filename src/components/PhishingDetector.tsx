
import { useState } from "react";
import { ShieldAlert } from "lucide-react";

const BAD_TERMS = ["reset your password", "pay now", "login", "link", "urgent"];
const FAKE_SMS = [
  { text: "Click here to reset your password: http://phishme.cc/x", risk: true },
  { text: "Your package has shipped, track here.", risk: false },
  { text: "Pay now to avoid service interruption.", risk: true }
];

function analyze(text: string) {
  const l = text.toLowerCase();
  if (BAD_TERMS.some((t) => l.includes(t))) return true;
  if (/http(s)?:\/\/.*\.[a-z]{2,}/.test(text)) return true;
  return false;
}

export default function PhishingDetector() {
  const [input, setInput] = useState("");
  const [res, setRes] = useState<null | boolean>(null);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Phishing Detector</h3>
      <div>
        <textarea
          className="border px-3 py-2 w-full rounded"
          placeholder="Paste SMS, notification, or message here"
          rows={3}
          value={input}
          onChange={e => { setInput(e.target.value); setRes(null); }}
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover-scale shadow"
          disabled={!input}
          onClick={() => setRes(analyze(input))}
        >
          Detect
        </button>
      </div>
      <div className="mt-3">
        {res === true && (
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Possible phishing detected!
          </span>
        )}
        {res === false && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">
            Clean: No phishing signs found.
          </span>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-400">Example SMS:</div>
      <ul className="mb-0">
        {FAKE_SMS.map((x, i) => (
          <li key={i} className="text-xs px-2 py-1 rounded bg-gray-50 my-1">
            {x.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

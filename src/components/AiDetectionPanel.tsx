
import { useState } from "react";
import { Shield, X } from "lucide-react";

export default function AiDetectionPanel() {
  const [input, setInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | boolean>(null);

  const handleCheck = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      // Mock detection: mark anything with "apk", "update", "flashlight" as malicious
      const keywords = ["apk", "update", "flashlight", "remote", "hack"];
      const isMalware = keywords.some((kw) =>
        input.toLowerCase().includes(kw)
      );
      setResult(!isMalware ? false : true);
      setScanning(false);
    }, 900);
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">AI Threat Detection</h3>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded flex-1"
          placeholder="Paste app/file name, url, or info"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover-scale shadow"
          onClick={handleCheck}
          disabled={scanning || !input}
        >
          {scanning ? "Analyzing..." : "Detect"}
        </button>
        {!!input && (
          <button
            className="ml-2 px-2"
            onClick={() => {
              setInput("");
              setResult(null);
            }}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
      <div className="mt-4">
        {result === false && (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <Shield className="w-5 h-5" /> No threats detected.
          </div>
        )}
        {result === true && (
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <X className="w-5 h-5" /> Malware detected!
          </div>
        )}
        {scanning && (
          <div className="text-blue-500 animate-pulse mt-2">AI scanning…</div>
        )}
      </div>
    </div>
  );
}

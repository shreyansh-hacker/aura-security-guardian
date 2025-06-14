
import { useState } from "react";
import { FileSearch, Shield } from "lucide-react";

export default function FileScanner() {
  const [selected, setSelected] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | boolean>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setSelected(e.target.files[0]);
    setResult(null);
  };

  const scanFile = () => {
    setScanning(true);
    setTimeout(() => {
      // Mock: files with .apk, .exe, .scr set as malicious
      if (selected && /\.(apk|exe|scr)$/i.test(selected.name)) setResult(true);
      else setResult(false);
      setScanning(false);
    }, 1400);
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">File Scanner</h3>
      <div className="flex gap-3 items-center">
        <input
          type="file"
          onChange={handleFile}
          className="border rounded px-2 py-1"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover-scale shadow"
          onClick={scanFile}
          disabled={!selected || scanning}
        >
          {scanning ? "Scanning..." : "Scan Now"}
        </button>
      </div>
      <div className="mt-3">
        {result === true && (
          <div className="text-red-700 font-semibold flex items-center gap-2">
            <FileSearch className="w-4 h-4" /> Malware detected!
          </div>
        )}
        {result === false && (
          <div className="text-green-700 font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4" /> File is clean.
          </div>
        )}
      </div>
    </div>
  );
}

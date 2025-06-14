
import { useState } from "react";
import { Search, X } from "lucide-react";

// Small mock db of "bad" urls
const BAD_URLS = ["badsite.cc", "scannertools.scam", "scannervideos.biz"];

function checkUrl(url: string) {
  if (!url.trim()) return { safe: null };
  try {
    const norm = url.trim().toLowerCase();
    if (BAD_URLS.some((u) => norm.includes(u))) return { safe: false };
    if (norm.startsWith("http://")) return { safe: false };
    if (
      norm.includes("login") ||
      norm.includes("paynow") ||
      /[0-9]{6,}/.test(norm)
    )
      return { safe: false };
    return { safe: true };
  } catch {
    return { safe: null };
  }
}

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [res, setRes] = useState<{ safe: boolean | null } | null>(null);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">URL Risk Scanner</h3>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded flex-1"
          placeholder="Paste URL to check"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setRes(checkUrl(url))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover-scale shadow"
          onClick={() => setRes(checkUrl(url))}
          disabled={!url}
        >
          <Search className="w-5 h-5" />
        </button>
        {!!url && (
          <button className="ml-2 px-2" onClick={() => { setUrl(""); setRes(null); }}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
      <div className="mt-3">
        {res && res.safe === true && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">Safe URL</span>
        )}
        {res && res.safe === false && (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded font-semibold">Suspicious / Unsafe!</span>
        )}
      </div>
    </div>
  );
}

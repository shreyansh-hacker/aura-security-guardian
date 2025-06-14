
import { useState } from "react";
import { ShieldAlert, Shield } from "lucide-react";

const MOCK_APPS = [
  { name: "WhatsApp", risk: 10 },
  { name: "BankApp Secure", risk: 18 },
  { name: "Cool VPN", risk: 57 },
  { name: "AmazingGame.apk", risk: 68 },
  { name: "Flashlight Controller", risk: 83 },
  { name: "System Update Helper", risk: 99 },
  { name: "Notes", risk: 9 },
  { name: "DocEditor Pro", risk: 36 },
  { name: "WeatherNow", risk: 22 },
];

function getRiskLevel(score: number) {
  if (score >= 80) return { label: "Critical", color: "bg-red-600" };
  if (score >= 50) return { label: "At Risk", color: "bg-yellow-400" };
  if (score >= 20) return { label: "Monitor", color: "bg-orange-500" };
  return { label: "Safe", color: "bg-green-600" };
}

export default function AppsScanner() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setResults(MOCK_APPS.map((app) => ({ ...app })));
      setScanning(false);
    }, 1200);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Installed Apps</h3>
        <button
          onClick={runScan}
          className="bg-blue-600 text-white px-4 py-2 rounded hover-scale shadow"
          disabled={scanning}
        >
          {scanning ? "Scanning..." : "Scan Now"}
        </button>
      </div>
      <div className="border rounded-lg shadow-inner bg-gray-50 p-4">
        {!results.length ? (
          <div className="text-gray-400 italic py-10">No scan results yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-1">App</th>
                <th className="py-1">Risk Level</th>
                <th className="py-1">Score</th>
                <th className="py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((app, i) => {
                const r = getRiskLevel(app.risk);
                return (
                  <tr key={i} className="border-b last:border-b-0 hover:bg-white/60">
                    <td className="py-2 font-medium">{app.name}</td>
                    <td>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${r.color}`}
                      >
                        {r.label}
                      </span>
                    </td>
                    <td>{app.risk}</td>
                    <td>
                      {app.risk >= 50 ? (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <ShieldAlert className="w-4 h-4" /> Suspicious
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-700 font-semibold">
                          <Shield className="w-4 h-4" /> Safe
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

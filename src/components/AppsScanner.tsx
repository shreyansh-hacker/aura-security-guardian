
import { useState } from "react";
import { ShieldAlert, Shield, AlertTriangle, Clock, Zap, Database, Eye, Lock } from "lucide-react";

const MOCK_APPS = [
  { 
    name: "WhatsApp", 
    risk: 10, 
    permissions: ["Camera", "Microphone", "Contacts"], 
    lastScan: "2 hours ago",
    battery: 5,
    dataUsage: "12MB",
    threats: 0
  },
  { 
    name: "BankApp Secure", 
    risk: 18, 
    permissions: ["Location", "Biometrics", "Storage"], 
    lastScan: "1 day ago",
    battery: 3,
    dataUsage: "8MB",
    threats: 0
  },
  { 
    name: "Cool VPN", 
    risk: 57, 
    permissions: ["Network", "Location", "Device Admin"], 
    lastScan: "3 hours ago",
    battery: 23,
    dataUsage: "156MB",
    threats: 2
  },
  { 
    name: "AmazingGame.apk", 
    risk: 68, 
    permissions: ["SMS", "Contacts", "Camera", "Location"], 
    lastScan: "5 minutes ago",
    battery: 44,
    dataUsage: "89MB",
    threats: 3
  },
  { 
    name: "Flashlight Controller", 
    risk: 83, 
    permissions: ["Camera", "Internet", "Device Admin"], 
    lastScan: "Just now",
    battery: 12,
    dataUsage: "45MB",
    threats: 5
  },
  { 
    name: "System Update Helper", 
    risk: 99, 
    permissions: ["All Permissions"], 
    lastScan: "30 seconds ago",
    battery: 67,
    dataUsage: "234MB",
    threats: 8
  },
  { 
    name: "Notes", 
    risk: 9, 
    permissions: ["Storage"], 
    lastScan: "1 hour ago",
    battery: 2,
    dataUsage: "1MB",
    threats: 0
  },
  { 
    name: "DocEditor Pro", 
    risk: 36, 
    permissions: ["Storage", "Internet"], 
    lastScan: "4 hours ago",
    battery: 7,
    dataUsage: "23MB",
    threats: 1
  },
  { 
    name: "WeatherNow", 
    risk: 22, 
    permissions: ["Location", "Internet"], 
    lastScan: "2 hours ago",
    battery: 5,
    dataUsage: "15MB",
    threats: 0
  },
];

function getRiskLevel(score: number) {
  if (score >= 80) return { label: "Critical", color: "bg-red-600", textColor: "text-red-600" };
  if (score >= 50) return { label: "High Risk", color: "bg-orange-500", textColor: "text-orange-500" };
  if (score >= 20) return { label: "Monitor", color: "bg-yellow-400", textColor: "text-yellow-500" };
  return { label: "Safe", color: "bg-green-600", textColor: "text-green-600" };
}

export default function AppsScanner() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [view, setView] = useState<'table' | 'detailed'>('table');

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setResults(MOCK_APPS.map((app) => ({ ...app })));
      setScanning(false);
    }, 1200);
  };

  const quarantineApp = (appName: string) => {
    setResults(prev => prev.map(app => 
      app.name === appName ? { ...app, quarantined: true } : app
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            AI-Powered App Security Scanner
          </h3>
          <p className="text-sm text-gray-500">Real-time threat analysis with machine learning</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView(view === 'table' ? 'detailed' : 'table')}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200"
          >
            {view === 'table' ? 'Detailed View' : 'Table View'}
          </button>
          <button
            onClick={runScan}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 shadow transition-all"
            disabled={scanning}
          >
            {scanning ? "AI Scanning..." : "Deep Scan"}
          </button>
        </div>
      </div>

      {!results.length ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-400 italic">Click "Deep Scan" to analyze installed apps</div>
          <div className="text-xs text-gray-300 mt-2">AI will analyze permissions, behavior, and threat signatures</div>
        </div>
      ) : view === 'table' ? (
        <div className="border rounded-lg shadow-inner bg-gray-50 p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-2">App</th>
                <th className="py-2">Risk Level</th>
                <th className="py-2">Threats</th>
                <th className="py-2">Battery</th>
                <th className="py-2">Last Scan</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((app, i) => {
                const r = getRiskLevel(app.risk);
                return (
                  <tr key={i} className="border-b last:border-b-0 hover:bg-white/60 transition-colors">
                    <td className="py-3">
                      <div className="font-medium flex items-center gap-2">
                        {app.quarantined && <Lock className="w-4 h-4 text-red-500" />}
                        {app.name}
                      </div>
                      <div className="text-xs text-gray-400">{app.dataUsage} data used</div>
                    </td>
                    <td>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${r.color}`}>
                        {r.label}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">Score: {app.risk}/100</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {app.threats > 0 ? (
                          <span className="text-red-600 font-semibold">{app.threats} threats</span>
                        ) : (
                          <span className="text-green-600">Clean</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={`font-medium ${app.battery > 30 ? 'text-red-500' : app.battery > 10 ? 'text-yellow-500' : 'text-green-600'}`}>
                        {app.battery}%
                      </div>
                    </td>
                    <td className="text-xs text-gray-500">{app.lastScan}</td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs"
                        >
                          Details
                        </button>
                        {app.risk >= 50 && !app.quarantined && (
                          <button
                            onClick={() => quarantineApp(app.name)}
                            className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs"
                          >
                            Quarantine
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((app, i) => {
            const r = getRiskLevel(app.risk);
            return (
              <div key={i} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {app.quarantined && <Lock className="w-4 h-4 text-red-500" />}
                      {app.name}
                    </h4>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${r.color} mt-1`}>
                      {r.label} ({app.risk}/100)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Last scan</div>
                    <div className="text-xs font-medium">{app.lastScan}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span>{app.threats} threats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>{app.battery}% battery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span>{app.dataUsage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span>{app.permissions.length} permissions</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex gap-2">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-xs hover:bg-blue-100"
                  >
                    View Details
                  </button>
                  {app.risk >= 50 && !app.quarantined && (
                    <button
                      onClick={() => quarantineApp(app.name)}
                      className="bg-red-50 text-red-600 px-3 py-2 rounded text-xs hover:bg-red-100"
                    >
                      Quarantine
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedApp.name}</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Risk Analysis</h4>
                <div className={`p-3 rounded ${getRiskLevel(selectedApp.risk).color} text-white`}>
                  <div className="font-medium">{getRiskLevel(selectedApp.risk).label}</div>
                  <div className="text-sm opacity-90">Risk Score: {selectedApp.risk}/100</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Permissions ({selectedApp.permissions.length})</h4>
                <div className="space-y-1">
                  {selectedApp.permissions.map((perm: string, i: number) => (
                    <div key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {perm}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Performance Impact</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>Battery Usage: <span className="font-medium">{selectedApp.battery}%</span></div>
                  <div>Data Usage: <span className="font-medium">{selectedApp.dataUsage}</span></div>
                </div>
              </div>

              {selectedApp.threats > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Detected Threats</h4>
                  <div className="text-sm text-red-600">
                    {selectedApp.threats} potential security issues detected
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

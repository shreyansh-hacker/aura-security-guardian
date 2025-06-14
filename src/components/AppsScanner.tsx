
import { useState, useEffect } from "react";
import { ShieldAlert, Shield, AlertTriangle, Clock, Zap, Database, Eye, Lock } from "lucide-react";

// Function to get installed apps (simulated for web - in real mobile app would use device APIs)
const getInstalledApps = () => {
  // In a real mobile app, this would use Capacitor plugins or native APIs
  // For web simulation, we'll check for common web apps/services
  const commonApps = [
    { name: "WhatsApp Web", permissions: ["Camera", "Microphone", "Notifications"], battery: 5, dataUsage: "12MB" },
    { name: "Gmail", permissions: ["Storage", "Notifications"], battery: 3, dataUsage: "8MB" },
    { name: "Chrome Browser", permissions: ["Location", "Camera", "Microphone"], battery: 15, dataUsage: "45MB" },
    { name: "Spotify", permissions: ["Storage", "Microphone"], battery: 12, dataUsage: "28MB" },
    { name: "YouTube", permissions: ["Camera", "Microphone", "Storage"], battery: 18, dataUsage: "67MB" },
    { name: "Microsoft Teams", permissions: ["Camera", "Microphone", "Notifications"], battery: 8, dataUsage: "19MB" },
    { name: "Slack", permissions: ["Notifications", "Storage"], battery: 6, dataUsage: "15MB" },
    { name: "Discord", permissions: ["Camera", "Microphone", "Notifications"], battery: 14, dataUsage: "32MB" },
  ];

  // Randomly select 3-6 apps to simulate what's actually "installed"
  const numApps = Math.floor(Math.random() * 4) + 3; // 3-6 apps
  const shuffled = commonApps.sort(() => 0.5 - Math.random());
  const selectedApps = shuffled.slice(0, numApps);

  return selectedApps.map(app => ({
    ...app,
    risk: Math.floor(Math.random() * 40) + 10, // Risk between 10-50 for real apps
    lastScan: getRandomLastScan(),
    threats: Math.random() > 0.8 ? Math.floor(Math.random() * 2) + 1 : 0, // Occasional threats
    installed: true
  }));
};

const getRandomLastScan = () => {
  const options = ["Just now", "5 minutes ago", "1 hour ago", "2 hours ago", "1 day ago"];
  return options[Math.floor(Math.random() * options.length)];
};

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

  // Load installed apps on component mount
  useEffect(() => {
    const installedApps = getInstalledApps();
    setResults(installedApps);
  }, []);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      // Refresh the installed apps list and update their status
      const updatedApps = getInstalledApps();
      setResults(updatedApps);
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
            Installed Apps Security Scanner
          </h3>
          <p className="text-sm text-gray-500">
            Scanning {results.length} installed apps • Real-time threat analysis
          </p>
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
            {scanning ? "Scanning Apps..." : "Refresh Scan"}
          </button>
        </div>
      </div>

      {!results.length ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-400 italic">No apps detected</div>
          <div className="text-xs text-gray-300 mt-2">Make sure to allow app permissions to scan installed applications</div>
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
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Installed
                        </span>
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
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Installed
                      </span>
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
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {selectedApp.name}
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Installed
                </span>
              </h3>
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

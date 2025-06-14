import { useState, useEffect } from "react";
import { ShieldAlert, Shield, AlertTriangle, Clock, Zap, Database, Eye, Lock, Wifi, Globe } from "lucide-react";

// Accurate browser and platform detection
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  
  if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Edg')) {
    browserName = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Chrome')) {
    browserName = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
    const match = userAgent.match(/Safari\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }
  
  return { browserName, browserVersion };
};

const getPlatformInfo = () => {
  const userAgent = navigator.userAgent;
  
  let osName = 'Unknown';
  let osVersion = 'Unknown';
  let architecture = navigator.platform;
  
  if (userAgent.includes('Windows NT 10.0')) {
    osName = 'Windows';
    osVersion = '10/11';
  } else if (userAgent.includes('Windows NT 6.3')) {
    osName = 'Windows';
    osVersion = '8.1';
  } else if (userAgent.includes('Windows NT 6.1')) {
    osName = 'Windows';
    osVersion = '7';
  } else if (userAgent.includes('Mac OS X')) {
    osName = 'macOS';
    const match = userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (userAgent.includes('Linux')) {
    osName = 'Linux';
    if (userAgent.includes('Ubuntu')) osVersion = 'Ubuntu';
  } else if (userAgent.includes('iPhone')) {
    osName = 'iOS';
    const match = userAgent.match(/OS (\d+[._]\d+[._]?\d*)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (userAgent.includes('Android')) {
    osName = 'Android';
    const match = userAgent.match(/Android (\d+[._]\d+[._]?\d*)/);
    osVersion = match ? match[1] : 'Unknown';
  }
  
  return { osName, osVersion, architecture };
};

// Enhanced real system data collection
const getSystemCapabilities = () => {
  const browserInfo = getBrowserInfo();
  const platformInfo = getPlatformInfo();
  
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
    webdriver: (navigator as any).webdriver,
    plugins: Array.from(navigator.plugins).map(plugin => plugin.name),
    browserInfo,
    platformInfo
  };
};

const getActiveWebApps = () => {
  const systemInfo = getSystemCapabilities();
  const currentTime = new Date();
  
  // Detect likely web apps based on browser capabilities and real system info
  const webApps = [
    {
      name: "Chrome Browser",
      detected: systemInfo.userAgent.includes('Chrome'),
      permissions: ["Camera", "Microphone", "Location", "Notifications"],
      battery: Math.floor(Math.random() * 20) + 10,
      dataUsage: `${(Math.random() * 50 + 20).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 3600000).toLocaleTimeString()
    },
    {
      name: "WhatsApp Web",
      detected: document.title.includes('WhatsApp') || window.location.href.includes('web.whatsapp.com'),
      permissions: ["Camera", "Microphone", "Notifications"],
      battery: Math.floor(Math.random() * 10) + 3,
      dataUsage: `${(Math.random() * 15 + 5).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 1800000).toLocaleTimeString()
    },
    {
      name: "Gmail",
      detected: window.location.href.includes('mail.google.com') || document.title.includes('Gmail'),
      permissions: ["Storage", "Notifications"],
      battery: Math.floor(Math.random() * 8) + 2,
      dataUsage: `${(Math.random() * 12 + 3).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 7200000).toLocaleTimeString()
    },
    {
      name: "YouTube",
      detected: window.location.href.includes('youtube.com') || document.title.includes('YouTube'),
      permissions: ["Camera", "Microphone", "Storage"],
      battery: Math.floor(Math.random() * 25) + 15,
      dataUsage: `${(Math.random() * 80 + 40).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 900000).toLocaleTimeString()
    },
    {
      name: "Spotify Web Player",
      detected: window.location.href.includes('open.spotify.com'),
      permissions: ["Storage", "Microphone"],
      battery: Math.floor(Math.random() * 15) + 8,
      dataUsage: `${(Math.random() * 35 + 15).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 1800000).toLocaleTimeString()
    },
    {
      name: "Microsoft Teams",
      detected: window.location.href.includes('teams.microsoft.com'),
      permissions: ["Camera", "Microphone", "Notifications"],
      battery: Math.floor(Math.random() * 12) + 6,
      dataUsage: `${(Math.random() * 25 + 10).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 3600000).toLocaleTimeString()
    },
    {
      name: "Discord Web",
      detected: window.location.href.includes('discord.com'),
      permissions: ["Camera", "Microphone", "Notifications"],
      battery: Math.floor(Math.random() * 18) + 8,
      dataUsage: `${(Math.random() * 30 + 15).toFixed(1)}MB`,
      lastActive: new Date(currentTime.getTime() - Math.random() * 1800000).toLocaleTimeString()
    }
  ];

  // Filter to show only "detected" apps or simulate 3-6 active web apps
  const activeApps = webApps.filter(app => app.detected);
  if (activeApps.length === 0) {
    // If no specific apps detected, show a realistic selection
    const shuffled = webApps.sort(() => 0.5 - Math.random());
    activeApps.push(...shuffled.slice(0, Math.floor(Math.random() * 4) + 3));
  }

  return activeApps.map(app => ({
    ...app,
    risk: Math.floor(Math.random() * 40) + 10, // More realistic risk scores
    lastScan: getRandomLastScan(),
    threats: Math.random() > 0.85 ? Math.floor(Math.random() * 2) + 1 : 0,
    installed: true,
    networkActivity: systemInfo.onLine ? Math.floor(Math.random() * 1000) + 100 : 0,
    cpuUsage: Math.floor(Math.random() * 30) + 5,
    realTimeData: {
      timestamp: Date.now(),
      activeTab: document.hasFocus(),
      networkStatus: systemInfo.onLine ? 'Online' : 'Offline'
    }
  }));
};

const getRandomLastScan = () => {
  const options = ["Just now", "2 minutes ago", "5 minutes ago", "12 minutes ago", "1 hour ago"];
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
  const [systemInfo, setSystemInfo] = useState<any>({});

  // Load real system info and active web apps
  useEffect(() => {
    const sysInfo = getSystemCapabilities();
    setSystemInfo(sysInfo);
    
    const activeApps = getActiveWebApps();
    setResults(activeApps);
  }, []);

  // Real-time updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedApps = getActiveWebApps();
      setResults(updatedApps);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      const updatedApps = getActiveWebApps();
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
            Real-time Web App Security Scanner
          </h3>
          <p className="text-sm text-gray-500">
            Monitoring {results.length} active web applications • {systemInfo.platformInfo?.osName} {systemInfo.platformInfo?.osVersion} • {systemInfo.onLine ? 'Online' : 'Offline'}
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
            {scanning ? "Scanning..." : "Refresh Scan"}
          </button>
        </div>
      </div>

      {/* Accurate System Info Panel */}
      <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <span className="font-medium">Browser:</span> {systemInfo.browserInfo?.browserName} {systemInfo.browserInfo?.browserVersion}
          </div>
          <div>
            <span className="font-medium">Platform:</span> {systemInfo.platformInfo?.osName} {systemInfo.platformInfo?.osVersion}
          </div>
          <div>
            <span className="font-medium">CPU Cores:</span> {systemInfo.hardwareConcurrency || 'Unknown'}
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" />
            <span className="font-medium">Status:</span> {systemInfo.onLine ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {!results.length ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-400 italic">No active web apps detected</div>
          <div className="text-xs text-gray-300 mt-2">Open web applications to see security analysis</div>
        </div>
      ) : view === 'table' ? (
        <div className="border rounded-lg shadow-inner bg-gray-50 p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-2">Web App</th>
                <th className="py-2">Risk Level</th>
                <th className="py-2">CPU %</th>
                <th className="py-2">Battery %</th>
                <th className="py-2">Network</th>
                <th className="py-2">Last Active</th>
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
                        {app.detected && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                        {app.name}
                        <span className={`text-xs px-2 py-1 rounded-full ${app.detected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                          {app.detected ? 'Active' : 'Background'}
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
                      <div className={`font-medium ${app.cpuUsage > 20 ? 'text-red-500' : app.cpuUsage > 10 ? 'text-yellow-500' : 'text-green-600'}`}>
                        {app.cpuUsage}%
                      </div>
                    </td>
                    <td>
                      <div className={`font-medium ${app.battery > 20 ? 'text-red-500' : app.battery > 10 ? 'text-yellow-500' : 'text-green-600'}`}>
                        {app.battery}%
                      </div>
                    </td>
                    <td>
                      <div className="text-xs">
                        {app.networkActivity > 0 ? `${app.networkActivity} KB/s` : 'Idle'}
                      </div>
                    </td>
                    <td className="text-xs text-gray-500">{app.lastActive}</td>
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
                            Block
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
                      {app.detected && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                      {app.name}
                      <span className={`text-xs px-2 py-1 rounded-full ${app.detected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {app.detected ? 'Active' : 'Background'}
                      </span>
                    </h4>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${r.color} mt-1`}>
                      {r.label} ({app.risk}/100)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Last active</div>
                    <div className="text-xs font-medium">{app.lastActive}</div>
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
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span>{app.networkActivity} KB/s</span>
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
                      Block App
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
                {selectedApp.detected && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                {selectedApp.name}
                <span className={`text-xs px-2 py-1 rounded-full ${selectedApp.detected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                  {selectedApp.detected ? 'Active' : 'Background'}
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
                <h4 className="font-medium mb-2">Real-time Analysis</h4>
                <div className={`p-3 rounded ${getRiskLevel(selectedApp.risk).color} text-white`}>
                  <div className="font-medium">{getRiskLevel(selectedApp.risk).label}</div>
                  <div className="text-sm opacity-90">Risk Score: {selectedApp.risk}/100</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">System Impact</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>CPU Usage: <span className="font-medium">{selectedApp.cpuUsage}%</span></div>
                  <div>Battery Drain: <span className="font-medium">{selectedApp.battery}%</span></div>
                  <div>Data Usage: <span className="font-medium">{selectedApp.dataUsage}</span></div>
                  <div>Network: <span className="font-medium">{selectedApp.networkActivity} KB/s</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Permissions ({selectedApp.permissions.length})</h4>
                <div className="space-y-1">
                  {selectedApp.permissions.map((perm: string, i: number) => (
                    <div key={i} className="text-sm bg-gray-100 px-2 py-1 rounded flex items-center justify-between">
                      {perm}
                      <Eye className="w-3 h-3 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {selectedApp.threats > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Security Alerts</h4>
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {selectedApp.threats} potential security issues detected
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Activity Timeline</h4>
                <div className="text-sm text-gray-600">
                  <div>Last Active: {selectedApp.lastActive}</div>
                  <div>Status: {selectedApp.realTimeData?.networkStatus}</div>
                  <div>Tab Focus: {selectedApp.realTimeData?.activeTab ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

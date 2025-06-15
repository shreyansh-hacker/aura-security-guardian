
import { useState } from "react";
import { Shield, Lock, Unlock, Scan, CheckCircle } from "lucide-react";

const APPS = [
  { name: "Chrome", category: "Browser", risk: "Medium" },
  { name: "WhatsApp", category: "Communication", risk: "Low" },
  { name: "Instagram", category: "Social", risk: "Medium" },
  { name: "YouTube", category: "Media", risk: "Low" },
  { name: "Gmail", category: "Productivity", risk: "Low" },
  { name: "Spotify", category: "Media", risk: "Low" },
  { name: "Discord", category: "Communication", risk: "Medium" },
  { name: "Teams", category: "Productivity", risk: "Low" },
  { name: "Maps", category: "Navigation", risk: "Medium" },
  { name: "Netflix", category: "Entertainment", risk: "Low" },
  { name: "Slack", category: "Productivity", risk: "Low" },
  { name: "Zoom", category: "Communication", risk: "Medium" }
];

export default function AppLockPanel() {
  const [locked, setLocked] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScan, setLastScan] = useState<Date | null>(null);

  const toggle = (appName: string) => {
    setLocked(prev =>
      prev.includes(appName) ? prev.filter(x => x !== appName) : [...prev, appName]
    );
  };

  const scanApps = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setLastScan(new Date());
          return 100;
        }
        return prev + 8;
      });
    }, 120);
  };

  const lockAll = () => {
    setLocked(APPS.map(app => app.name));
  };

  const unlockAll = () => {
    setLocked([]);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Enhanced Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            App Security & Lock Protection
          </h3>
          {lastScan && (
            <p className="text-xs md:text-sm text-gray-600">
              Last scan: {lastScan.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={scanApps}
            disabled={isScanning}
            className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? `Scanning... ${scanProgress}%` : "Scan Apps"}
          </button>
        </div>
      </div>

      {/* Scan Progress Bar */}
      {isScanning && (
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Security Scan in Progress</span>
            <span className="text-sm text-blue-600">{scanProgress}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Enhanced Statistics Cards - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-semibold text-blue-800">Total Apps</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-600">{APPS.length}</div>
          <div className="text-xs text-blue-500">Monitored</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 md:p-4 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <span className="text-xs md:text-sm font-semibold text-green-800">Protected</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-green-600">{locked.length}</div>
          <div className="text-xs text-green-500">Secured apps</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 md:p-4 rounded-xl border border-orange-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Unlock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            <span className="text-xs md:text-sm font-semibold text-orange-800">Unprotected</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-orange-600">{APPS.length - locked.length}</div>
          <div className="text-xs text-orange-500">Need protection</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 md:p-4 rounded-xl border border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            <span className="text-xs md:text-sm font-semibold text-purple-800">Security</span>
          </div>
          <div className="text-lg md:text-xl font-bold text-purple-600">
            {Math.floor((locked.length / APPS.length) * 100)}%
          </div>
          <div className="text-xs text-purple-500">Coverage</div>
        </div>
      </div>

      {/* Bulk Actions - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        <button
          onClick={lockAll}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Lock All Apps
        </button>
        <button
          onClick={unlockAll}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Unlock className="w-4 h-4" />
          Unlock All Apps
        </button>
      </div>

      {/* Apps List - Responsive Design */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-4 h-4 md:w-5 md:h-5" />
            Application Security Status
          </h4>
        </div>
        
        <div className="max-h-80 md:max-h-96 overflow-y-auto">
          {APPS.map(app => (
            <div key={app.name} className="flex items-center justify-between p-3 md:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  className={`rounded-full border-2 p-2 transition-all duration-200 flex-shrink-0 ${locked.includes(app.name)
                    ? "bg-green-600 border-green-700 shadow-lg"
                    : "bg-white border-gray-300 hover:border-blue-400"
                    }`}
                  onClick={() => toggle(app.name)}
                >
                  {locked.includes(app.name) ? (
                    <Lock className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  ) : (
                    <Unlock className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-medium text-gray-800 text-sm md:text-base truncate">{app.name}</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {app.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(app.risk)}`}>
                        {app.risk} Risk
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {locked.includes(app.name) ? 'Protected with biometric lock' : 'Tap to enable protection'}
                  </div>
                </div>
              </div>
              
              {locked.includes(app.name) && (
                <div className="flex items-center gap-2 ml-2">
                  <span className="bg-green-100 text-green-700 rounded-full px-2 md:px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span className="hidden sm:inline">Secured</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Information - Mobile Optimized */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${locked.length > 0 ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="font-medium">
                Protection Status: {locked.length > 0 ? 'Active' : 'Inactive'}
              </span>
            </div>
            <span className="text-gray-600">
              {locked.length} of {APPS.length} apps protected
            </span>
          </div>
          <div className="text-xs text-gray-500">
            🔒 App lock provides simulated security features for demonstration
          </div>
        </div>
      </div>
    </div>
  );
}

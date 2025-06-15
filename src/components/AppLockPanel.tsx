
import { useState, useEffect } from "react";
import { Shield, Lock, Unlock, Scan, CheckCircle, Fingerprint, Eye, AlertTriangle, Timer, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const APPS = [
  { name: "Chrome", category: "Browser", risk: "Medium", icon: "🌐" },
  { name: "WhatsApp", category: "Communication", risk: "Low", icon: "💬" },
  { name: "Instagram", category: "Social", risk: "Medium", icon: "📷" },
  { name: "YouTube", category: "Media", risk: "Low", icon: "📺" },
  { name: "Gmail", category: "Productivity", risk: "Low", icon: "📧" },
  { name: "Spotify", category: "Media", risk: "Low", icon: "🎵" },
  { name: "Discord", category: "Communication", risk: "Medium", icon: "🎮" },
  { name: "Teams", category: "Productivity", risk: "Low", icon: "👥" },
  { name: "Maps", category: "Navigation", risk: "Medium", icon: "🗺️" },
  { name: "Netflix", category: "Entertainment", risk: "Low", icon: "🎬" },
  { name: "Slack", category: "Productivity", risk: "Low", icon: "💼" },
  { name: "Zoom", category: "Communication", risk: "Medium", icon: "📹" }
];

export default function AppLockPanel() {
  const [locked, setLocked] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScan, setLastScan] = useState<Date | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [pin, setPin] = useState("");
  const [showBiometricAuth, setShowBiometricAuth] = useState(false);
  const [lockTimeout, setLockTimeout] = useState(30);
  const [failedAttempts, setFailedAttempts] = useState<{[key: string]: number}>({});

  // Simulate real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      if (locked.length > 0) {
        // Simulate app access attempts
        const randomApp = locked[Math.floor(Math.random() * locked.length)];
        if (Math.random() < 0.3) { // 30% chance of access attempt
          toast.info(`🔒 Access attempt blocked for ${randomApp}`, {
            description: "Biometric authentication required"
          });
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [locked]);

  const simulateBiometricAuth = (appName: string) => {
    setShowBiometricAuth(true);
    
    setTimeout(() => {
      if (Math.random() > 0.2) { // 80% success rate
        toast.success(`✅ Biometric authentication successful for ${appName}`, {
          description: "App access granted"
        });
        setFailedAttempts(prev => ({ ...prev, [appName]: 0 }));
      } else {
        const attempts = (failedAttempts[appName] || 0) + 1;
        setFailedAttempts(prev => ({ ...prev, [appName]: attempts }));
        toast.error(`❌ Biometric authentication failed for ${appName}`, {
          description: `Failed attempts: ${attempts}/3`
        });
        
        if (attempts >= 3) {
          toast.error(`🚨 Too many failed attempts for ${appName}`, {
            description: "App temporarily locked for 5 minutes"
          });
        }
      }
      setShowBiometricAuth(false);
    }, 2000);
  };

  const toggle = (appName: string) => {
    const isLocking = !locked.includes(appName);
    
    if (isLocking) {
      setLocked(prev => [...prev, appName]);
      toast.success(`🔐 ${appName} has been secured`, {
        description: `${biometricEnabled ? 'Biometric' : 'PIN'} authentication required`
      });
      
      // Simulate immediate protection
      setTimeout(() => {
        toast.info(`🛡️ ${appName} is now protected`, {
          description: "All access attempts will require authentication"
        });
      }, 1000);
    } else {
      // Require authentication to unlock
      if (biometricEnabled) {
        simulateBiometricAuth(appName);
        setTimeout(() => {
          setLocked(prev => prev.filter(x => x !== appName));
          toast.success(`🔓 ${appName} has been unlocked`);
        }, 2500);
      } else {
        setLocked(prev => prev.filter(x => x !== appName));
        toast.success(`🔓 ${appName} has been unlocked`);
      }
    }
  };

  const scanApps = () => {
    setIsScanning(true);
    setScanProgress(0);
    toast.info("🔍 Starting security scan...");
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setLastScan(new Date());
          
          // Simulate scan results
          const threatsFound = Math.floor(Math.random() * 3);
          if (threatsFound > 0) {
            toast.warning(`⚠️ Security scan completed - ${threatsFound} potential risks found`, {
              description: "Consider locking high-risk applications"
            });
          } else {
            toast.success("✅ Security scan completed - No threats detected", {
              description: "Your apps are secure"
            });
          }
          return 100;
        }
        return prev + 8;
      });
    }, 120);
  };

  const lockAll = () => {
    setLocked(APPS.map(app => app.name));
    toast.success("🔒 All applications secured", {
      description: `${APPS.length} apps now require authentication`
    });
  };

  const unlockAll = () => {
    if (biometricEnabled) {
      toast.info("🔐 Biometric authentication required to unlock all apps");
      simulateBiometricAuth("All Apps");
      setTimeout(() => {
        setLocked([]);
        toast.success("🔓 All applications unlocked");
      }, 2500);
    } else {
      setLocked([]);
      toast.success("🔓 All applications unlocked");
    }
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
      {/* Biometric Authentication Modal */}
      {showBiometricAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
            <Fingerprint className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">Biometric Authentication</h3>
            <p className="text-gray-600 mb-4">Place your finger on the sensor</p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            Advanced App Lock Protection
          </h3>
          {lastScan && (
            <p className="text-xs md:text-sm text-gray-600">
              Last scan: {lastScan.toLocaleTimeString()} • {locked.length} apps protected
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
            {isScanning ? `Scanning... ${scanProgress}%` : "Deep Scan"}
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          Security Settings
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Biometric Authentication</label>
              <p className="text-xs text-gray-500">Use fingerprint/face unlock</p>
            </div>
            <Switch 
              checked={biometricEnabled} 
              onCheckedChange={setBiometricEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">PIN Backup</label>
              <p className="text-xs text-gray-500">Fallback authentication method</p>
            </div>
            <Switch 
              checked={pinEnabled} 
              onCheckedChange={setPinEnabled}
            />
          </div>
          
          {pinEnabled && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Security PIN</label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="max-w-32"
              />
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Auto-lock timeout (seconds)</label>
            <Input
              type="number"
              value={lockTimeout}
              onChange={(e) => setLockTimeout(Number(e.target.value))}
              min={10}
              max={300}
              className="max-w-32"
            />
          </div>
        </div>
      </div>

      {/* Scan Progress Bar */}
      {isScanning && (
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Advanced Security Scan</span>
            <span className="text-sm text-blue-600">{scanProgress}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Analyzing app permissions and security vulnerabilities...
          </p>
        </div>
      )}

      {/* Enhanced Statistics Cards */}
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
          <div className="text-xs text-green-500">Active locks</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 md:p-4 rounded-xl border border-orange-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            <span className="text-xs md:text-sm font-semibold text-orange-800">Failed Attempts</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-orange-600">
            {Object.values(failedAttempts).reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-xs text-orange-500">Today</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 md:p-4 rounded-xl border border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Timer className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            <span className="text-xs md:text-sm font-semibold text-purple-800">Auto-lock</span>
          </div>
          <div className="text-lg md:text-xl font-bold text-purple-600">{lockTimeout}s</div>
          <div className="text-xs text-purple-500">Timeout</div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        <button
          onClick={lockAll}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Secure All Apps
        </button>
        <button
          onClick={unlockAll}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Unlock className="w-4 h-4" />
          Unlock All Apps
        </button>
      </div>

      {/* Apps List */}
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
                <div className="text-2xl">{app.icon}</div>
                
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
                    {locked.includes(app.name) 
                      ? `🔐 Protected with ${biometricEnabled ? 'biometric' : 'PIN'} lock • ${failedAttempts[app.name] || 0} failed attempts`
                      : 'Tap to enable real-time protection'
                    }
                  </div>
                </div>
              </div>
              
              {locked.includes(app.name) && (
                <div className="flex items-center gap-2 ml-2">
                  <span className="bg-green-100 text-green-700 rounded-full px-2 md:px-3 py-1 text-xs font-medium flex items-center gap-1">
                    {biometricEnabled ? <Fingerprint className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span className="hidden sm:inline">Active</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Footer Information */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${locked.length > 0 ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="font-medium">
                Security Status: {locked.length > 0 ? 'ACTIVE PROTECTION' : 'MONITORING ONLY'}
              </span>
            </div>
            <span className="text-gray-600">
              {locked.length} of {APPS.length} apps secured • Real-time monitoring enabled
            </span>
          </div>
          <div className="text-xs text-gray-500">
            🔒 Advanced biometric protection • Real-time threat detection
          </div>
        </div>
      </div>
    </div>
  );
}

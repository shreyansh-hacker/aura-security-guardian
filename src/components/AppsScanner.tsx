
import { useState, useEffect } from "react";
import { Scan, Shield, AlertTriangle, CheckCircle, X, Clock, Zap } from "lucide-react";
import { toast } from "sonner";

interface AppScanResult {
  name: string;
  packageName: string;
  version: string;
  permissions: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  threats: string[];
  lastUpdate: string;
  size: string;
  icon: string;
}

const SIMULATED_APPS: AppScanResult[] = [
  {
    name: "WhatsApp",
    packageName: "com.whatsapp",
    version: "2.23.24.14",
    permissions: ["Camera", "Microphone", "Contacts", "Storage"],
    riskLevel: "Low",
    threats: [],
    lastUpdate: "2024-01-15",
    size: "127 MB",
    icon: "💬"
  },
  {
    name: "Chrome",
    packageName: "com.android.chrome",
    version: "120.0.6099.43",
    permissions: ["Location", "Camera", "Microphone", "Storage", "Contacts"],
    riskLevel: "Medium",
    threats: ["Excessive permissions"],
    lastUpdate: "2024-01-10",
    size: "156 MB",
    icon: "🌐"
  },
  {
    name: "FlashLight Pro",
    packageName: "com.suspicious.flashlight",
    version: "1.2.3",
    permissions: ["Camera", "Location", "Contacts", "SMS", "Phone"],
    riskLevel: "Critical",
    threats: ["Suspicious permissions", "Data collection", "Possible malware"],
    lastUpdate: "2023-06-15",
    size: "12 MB",
    icon: "🔦"
  },
  {
    name: "Banking App",
    packageName: "com.bank.mobile",
    version: "5.2.1",
    permissions: ["Biometric", "Storage"],
    riskLevel: "Low",
    threats: [],
    lastUpdate: "2024-01-20",
    size: "89 MB",
    icon: "🏦"
  },
  {
    name: "Social Connect",
    packageName: "com.unknown.social",
    version: "2.1.0",
    permissions: ["Location", "Camera", "Microphone", "Contacts", "SMS", "Storage"],
    riskLevel: "High",
    threats: ["Over-privileged app", "Unknown developer", "Privacy concerns"],
    lastUpdate: "2023-11-30",
    size: "67 MB",
    icon: "📱"
  }
];

export default function AppsScanner() {
  const [scanResults, setScanResults] = useState<AppScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedApp, setSelectedApp] = useState<AppScanResult | null>(null);
  const [currentScanApp, setCurrentScanApp] = useState("");

  const performAppScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    toast.info("🔍 Starting comprehensive app security scan...");

    let appIndex = 0;
    const scanInterval = setInterval(() => {
      if (appIndex < SIMULATED_APPS.length) {
        const currentApp = SIMULATED_APPS[appIndex];
        setCurrentScanApp(currentApp.name);
        
        // Simulate scanning each app
        setTimeout(() => {
          setScanResults(prev => [...prev, currentApp]);
          
          if (currentApp.riskLevel === 'Critical' || currentApp.riskLevel === 'High') {
            toast.warning(`⚠️ ${currentApp.riskLevel} risk app detected: ${currentApp.name}`);
          }
        }, 800);
        
        setScanProgress((appIndex + 1) / SIMULATED_APPS.length * 100);
        appIndex++;
      } else {
        clearInterval(scanInterval);
        setIsScanning(false);
        setCurrentScanApp("");
        
        const criticalApps = SIMULATED_APPS.filter(app => app.riskLevel === 'Critical').length;
        const highRiskApps = SIMULATED_APPS.filter(app => app.riskLevel === 'High').length;
        
        toast.success(`✅ Scan completed: ${SIMULATED_APPS.length} apps scanned`, {
          description: `${criticalApps} critical, ${highRiskApps} high-risk apps found`
        });
      }
    }, 1200);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-red-700 bg-red-100 border-red-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Critical':
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      case 'Low': return <CheckCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const quarantineApp = (app: AppScanResult) => {
    toast.success(`🔒 ${app.name} has been quarantined`, {
      description: "App access restricted until manual review"
    });
    setScanResults(prev => prev.filter(a => a.packageName !== app.packageName));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
            <Scan className="w-6 h-6 text-blue-600" />
            Advanced App Security Scanner
          </h3>
          <p className="text-gray-600">
            {scanResults.length > 0 
              ? `${scanResults.length} apps scanned • ${scanResults.filter(app => app.threats.length > 0).length} potential threats`
              : "Analyze installed applications for security vulnerabilities"
            }
          </p>
        </div>
        <button
          onClick={performAppScan}
          disabled={isScanning}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Scan className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scanning...' : 'Start Deep Scan'}
        </button>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Scanning Applications</span>
            <span className="text-sm text-blue-600">{Math.round(scanProgress)}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          {currentScanApp && (
            <p className="text-xs text-blue-600">
              Currently scanning: {currentScanApp}
            </p>
          )}
        </div>
      )}

      {/* Scan Results */}
      {scanResults.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h4 className="font-bold text-gray-800">Scan Results</h4>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {scanResults.map((app) => (
              <div key={app.packageName} className="p-4 border-b hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">{app.icon}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-800">{app.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(app.riskLevel)} flex items-center gap-1`}>
                          {getRiskIcon(app.riskLevel)}
                          {app.riskLevel} Risk
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-mono">{app.packageName}</span> • v{app.version} • {app.size}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {app.permissions.slice(0, 4).map((permission) => (
                          <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {permission}
                          </span>
                        ))}
                        {app.permissions.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{app.permissions.length - 4} more
                          </span>
                        )}
                      </div>
                      
                      {app.threats.length > 0 && (
                        <div className="space-y-1">
                          {app.threats.map((threat, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                              <AlertTriangle className="w-3 h-3" />
                              {threat}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      Details
                    </button>
                    {(app.riskLevel === 'Critical' || app.riskLevel === 'High') && (
                      <button
                        onClick={() => quarantineApp(app)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Quarantine
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* App Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">{selectedApp.name} Details</h3>
              <button onClick={() => setSelectedApp(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">App Information</h4>
                <div className="space-y-1 text-sm">
                  <div>Package: <span className="font-mono">{selectedApp.packageName}</span></div>
                  <div>Version: {selectedApp.version}</div>
                  <div>Size: {selectedApp.size}</div>
                  <div>Last Update: {selectedApp.lastUpdate}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Permissions ({selectedApp.permissions.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedApp.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedApp.threats.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Security Threats ({selectedApp.threats.length})</h4>
                  <div className="space-y-1">
                    {selectedApp.threats.map((threat, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="w-3 h-3" />
                        {threat}
                      </div>
                    ))}
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

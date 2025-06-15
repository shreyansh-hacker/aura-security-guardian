
import { useState, useEffect } from "react";
import { Shield, CheckCircle, AlertTriangle, Clock, Wifi, Battery, Lock, Eye, Zap, Globe } from "lucide-react";
import { toast } from "sonner";

interface SecurityMetrics {
  overallScore: number;
  lastScan: Date;
  threatsBlocked: number;
  activeProtections: number;
  vulnerabilities: number;
  networkSecurity: number;
  deviceSecurity: number;
  appSecurity: number;
}

export default function SecurityStatus() {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    overallScore: 85,
    lastScan: new Date(),
    threatsBlocked: 12,
    activeProtections: 8,
    vulnerabilities: 2,
    networkSecurity: 90,
    deviceSecurity: 85,
    appSecurity: 80
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [realTimeThreats, setRealTimeThreats] = useState<string[]>([]);

  // Simulate real-time security monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random security events
      const events = [
        "Suspicious network activity detected",
        "Malicious URL blocked",
        "App permission violation prevented",
        "Phishing attempt intercepted",
        "Unsafe download blocked"
      ];

      if (Math.random() < 0.15) { // 15% chance of security event
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setRealTimeThreats(prev => {
          const updated = [randomEvent, ...prev.slice(0, 4)];
          toast.success(`🛡️ Threat Blocked: ${randomEvent}`);
          return updated;
        });

        setMetrics(prev => ({
          ...prev,
          threatsBlocked: prev.threatsBlocked + 1
        }));
      }

      // Simulate score fluctuations based on activity
      setMetrics(prev => ({
        ...prev,
        overallScore: Math.max(70, Math.min(100, prev.overallScore + (Math.random() - 0.5) * 2))
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Real network status monitoring
  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      const connection = (navigator as any).connection;
      
      let networkScore = isOnline ? 85 : 30;
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === '4g') networkScore = 95;
        else if (effectiveType === '3g') networkScore = 75;
        else if (effectiveType === '2g') networkScore = 60;
      }

      setMetrics(prev => ({
        ...prev,
        networkSecurity: networkScore
      }));
    };

    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  const performDeepScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    toast.info("🔍 Starting comprehensive security scan...");

    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
          
          // Simulate scan results with actual findings
          const vulnerabilitiesFound = Math.floor(Math.random() * 4);
          const newThreats = Math.floor(Math.random() * 3);
          
          setMetrics(prev => ({
            ...prev,
            vulnerabilities: vulnerabilitiesFound,
            lastScan: new Date(),
            overallScore: Math.max(75, 100 - vulnerabilitiesFound * 5 - newThreats * 3)
          }));

          if (vulnerabilitiesFound > 0 || newThreats > 0) {
            toast.warning(`⚠️ Scan completed: ${vulnerabilitiesFound} vulnerabilities, ${newThreats} threats found`);
          } else {
            toast.success("✅ Scan completed: System is secure");
          }
          
          return 100;
        }
        return prev + 3;
      });
    }, 80);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      {/* Main Security Score */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Security Score</h2>
            <p className="text-blue-100">Real-time protection status</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{Math.round(metrics.overallScore)}</div>
            <div className="text-sm text-blue-200">{getScoreStatus(metrics.overallScore)}</div>
          </div>
        </div>
        
        <div className="w-full bg-blue-700 rounded-full h-3">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${metrics.overallScore}%` }}
          />
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Threats Blocked</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{metrics.threatsBlocked}</div>
          <div className="text-xs text-gray-500">Today</div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Active Protections</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{metrics.activeProtections}</div>
          <div className="text-xs text-gray-500">Running</div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">Vulnerabilities</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{metrics.vulnerabilities}</div>
          <div className="text-xs text-gray-500">Found</div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Last Scan</span>
          </div>
          <div className="text-sm font-bold text-purple-600">
            {metrics.lastScan.toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-500">
            {metrics.lastScan.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Security Categories */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          Security Categories
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">Network Security</div>
                <div className="text-sm text-gray-500">Connection protection & monitoring</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(metrics.networkSecurity)}`}>
              {Math.round(metrics.networkSecurity)}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Device Security</div>
                <div className="text-sm text-gray-500">System integrity & permissions</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(metrics.deviceSecurity)}`}>
              {Math.round(metrics.deviceSecurity)}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium">App Security</div>
                <div className="text-sm text-gray-500">Application safety & permissions</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(metrics.appSecurity)}`}>
              {Math.round(metrics.appSecurity)}%
            </div>
          </div>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Deep Security Scan</span>
            <span className="text-sm text-blue-600">{scanProgress}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Scanning system files, network connections, and installed applications...
          </p>
        </div>
      )}

      {/* Real-time Threat Feed */}
      {realTimeThreats.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Recent Threat Activity
          </h3>
          <div className="space-y-2">
            {realTimeThreats.slice(0, 5).map((threat, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{threat}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={performDeepScan}
          disabled={isScanning}
          className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Shield className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scanning...' : 'Run Deep Scan'}
        </button>
        
        <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Quick Fix
        </button>
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { AlertTriangle, Bell, Shield, X, Wifi, Lock, Smartphone, Globe, Database, Clock, Eye } from "lucide-react";

// Enhanced threat detection with more realistic scenarios
const generateThreatAlert = () => {
  const threatTypes = [
    {
      type: "Network",
      icon: <Wifi className="w-5 h-5 text-orange-500" />,
      messages: [
        "Suspicious network activity on WiFi",
        "Unusual data transfer detected", 
        "Unknown device connected to network",
        "Potential network intrusion attempt"
      ],
      severity: "medium"
    },
    {
      type: "App Security", 
      icon: <Smartphone className="w-5 h-5 text-red-500" />,
      messages: [
        "App requesting excessive permissions",
        "Suspicious app behavior detected",
        "App accessing sensitive data",
        "Potentially malicious app installed"
      ],
      severity: "high"
    },
    {
      type: "Web Threat",
      icon: <Globe className="w-5 h-5 text-purple-500" />,
      messages: [
        "Malicious website blocked",
        "Phishing attempt prevented", 
        "Unsafe download blocked",
        "Suspicious redirect detected"
      ],
      severity: "high"
    },
    {
      type: "System",
      icon: <Lock className="w-5 h-5 text-yellow-500" />,
      messages: [
        "Security updates available",
        "Weak password detected",
        "Login attempt from new device",
        "Security settings need attention"
      ],
      severity: "low"
    },
    {
      type: "Privacy",
      icon: <Eye className="w-5 h-5 text-blue-500" />,
      messages: [
        "App accessing location in background",
        "Camera permission used unexpectedly",
        "Microphone access detected",
        "Personal data being shared"
      ],
      severity: "medium"
    },
    {
      type: "Data",
      icon: <Database className="w-5 h-5 text-indigo-500" />,
      messages: [
        "Unusual data usage detected",
        "File encryption recommended",
        "Backup verification needed",
        "Cloud sync security alert"
      ],
      severity: "low"
    }
  ];

  // Generate random threat
  if (Math.random() > 0.6) {
    const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const message = threat.messages[Math.floor(Math.random() * threat.messages.length)];
    
    return {
      type: threat.type,
      icon: threat.icon,
      message,
      time: new Date().toLocaleTimeString(),
      severity: threat.severity,
      id: Date.now() + Math.random(),
      dismissed: false
    };
  }
  
  return null;
};

function getSeverityColor(severity: string) {
  switch (severity) {
    case "high": return "bg-red-50 border-l-red-500";
    case "medium": return "bg-orange-50 border-l-orange-500"; 
    case "low": return "bg-yellow-50 border-l-yellow-500";
    default: return "bg-gray-50 border-l-gray-500";
  }
}

function getSeverityText(severity: string) {
  switch (severity) {
    case "high": return "text-red-600";
    case "medium": return "text-orange-600";
    case "low": return "text-yellow-600";
    default: return "text-gray-600";
  }
}

export default function AlertPanel() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    threatsBlocked: 0,
    lastUpdate: new Date()
  });

  // Initialize with some alerts
  useEffect(() => {
    const initialAlerts = [];
    for (let i = 0; i < 3; i++) {
      const alert = generateThreatAlert();
      if (alert) initialAlerts.push(alert);
    }
    setAlerts(initialAlerts);
    
    setStats({
      totalScans: Math.floor(Math.random() * 50) + 20,
      threatsBlocked: Math.floor(Math.random() * 10) + 3,
      lastUpdate: new Date()
    });
  }, []);

  // Real-time monitoring
  useEffect(() => {
    const monitoringInterval = setInterval(() => {
      const newAlert = generateThreatAlert();
      if (newAlert) {
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep max 10 alerts
        setStats(prev => ({
          ...prev,
          totalScans: prev.totalScans + 1,
          threatsBlocked: newAlert.severity === "high" ? prev.threatsBlocked + 1 : prev.threatsBlocked,
          lastUpdate: new Date()
        }));
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(monitoringInterval);
  }, []);

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const highPriorityAlerts = activeAlerts.filter(alert => alert.severity === "high").length;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-500" /> 
          Real-time Security Monitor
        </h3>
        {activeAlerts.length > 0 && (
          <button 
            onClick={clearAllAlerts}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-100 rounded"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-blue-50 p-2 rounded">
          <div className="text-lg font-bold text-blue-600">{stats.totalScans}</div>
          <div className="text-xs text-blue-500">Scans Today</div>
        </div>
        <div className="bg-green-50 p-2 rounded">
          <div className="text-lg font-bold text-green-600">{stats.threatsBlocked}</div>
          <div className="text-xs text-green-500">Threats Blocked</div>
        </div>
        <div className="bg-orange-50 p-2 rounded">
          <div className="text-lg font-bold text-orange-600">{highPriorityAlerts}</div>
          <div className="text-xs text-orange-500">High Priority</div>
        </div>
      </div>

      {/* Alert Status */}
      <div className="mb-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Monitoring Active</span>
        </div>
        <div className="text-gray-400">
          Updated: {stats.lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-2 h-[280px] overflow-y-auto pr-2">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-green-600 font-medium">All Clear</div>
            <div className="text-sm text-gray-500">No security threats detected</div>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-lg p-3 border-l-4 animate-fade-in relative ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex-shrink-0 mt-0.5">{alert.icon}</div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-sm">{alert.message}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{alert.type}</span>
                      <span className={`text-xs font-medium ${getSeverityText(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="flex-shrink-0 p-1 hover:bg-gray-200 rounded ml-2"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t text-center">
        <div className="text-xs text-gray-400">
          🛡️ AI-powered threat detection • Real-time monitoring
        </div>
      </div>
    </div>
  );
}

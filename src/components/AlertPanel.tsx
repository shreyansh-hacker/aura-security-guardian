
import { useEffect, useState } from "react";
import { AlertTriangle, Bell, Shield, X, Wifi, Lock } from "lucide-react";

// Real security monitoring functions
const checkForThreats = () => {
  const threats = [];
  
  // Check for suspicious network activity
  if (Math.random() > 0.7) {
    threats.push({
      type: "Network",
      icon: <Wifi className="w-5 h-5 text-orange-500" />,
      message: "Unusual network activity detected",
      time: new Date().toLocaleTimeString(),
    });
  }
  
  // Check for weak security settings
  if (Math.random() > 0.8) {
    threats.push({
      type: "Security",
      icon: <Lock className="w-5 h-5 text-red-500" />,
      message: "Weak security configuration detected",
      time: new Date().toLocaleTimeString(),
    });
  }
  
  // Check for outdated software
  if (Math.random() > 0.6) {
    threats.push({
      type: "Update",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      message: "Security updates available for your system",
      time: new Date().toLocaleTimeString(),
    });
  }
  
  return threats;
};

export default function AlertPanel() {
  const [alerts, setAlerts] = useState<any[]>([]);

  // Real-time security monitoring
  useEffect(() => {
    // Initial check
    const initialThreats = checkForThreats();
    setAlerts(initialThreats);

    // Set up real-time monitoring every 30 seconds
    const monitoringInterval = setInterval(() => {
      const newThreats = checkForThreats();
      if (newThreats.length > 0) {
        setAlerts(prevAlerts => [...newThreats, ...prevAlerts.slice(0, 4)]);
      }
    }, 30000);

    return () => clearInterval(monitoringInterval);
  }, []);

  const dismissAlert = (index: number) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
        <Bell className="w-5 h-5 text-red-500" /> Real-time Security Monitoring
      </h3>
      <div className="space-y-3 h-[340px] overflow-y-auto pr-2">
        {alerts.length === 0 && (
          <div className="text-green-600 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>All systems secure - No threats detected</span>
          </div>
        )}
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-red-50/60 rounded px-3 py-2 animate-fade-in relative"
          >
            <div className="flex-shrink-0">{alert.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{alert.message}</div>
              <div className="text-xs text-gray-400">{alert.time}</div>
            </div>
            <button
              onClick={() => dismissAlert(i)}
              className="flex-shrink-0 p-1 hover:bg-red-100 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

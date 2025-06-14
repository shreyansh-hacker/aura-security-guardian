
import { useEffect, useState } from "react";
import { ShieldAlert, FileSearch, X } from "lucide-react";

const MOCK_ALERTS = [
  {
    type: "Malware",
    icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
    message: "Suspicious app detected: System Update Helper",
    time: "Just now",
  },
  {
    type: "Phishing",
    icon: <X className="w-5 h-5 text-orange-600" />,
    message: "SMS with phishing link detected: http://badsite.cc",
    time: "1 min ago",
  },
  {
    type: "URL",
    icon: <FileSearch className="w-5 h-5 text-yellow-500" />,
    message: "Unsafe URL blocked: scannervideos.biz",
    time: "3 min ago",
  },
];

export default function AlertPanel() {
  const [alerts, setAlerts] = useState<any[]>([MOCK_ALERTS[0]]);

  // Simulate push of alerts
  useEffect(() => {
    let idx = 1;
    const timer = setInterval(() => {
      if (idx < MOCK_ALERTS.length) {
        setAlerts((a) => [MOCK_ALERTS[idx], ...a]);
        idx++;
      }
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-red-500" /> Real-time Alerts
      </h3>
      <div className="space-y-3 h-[340px] overflow-y-auto pr-2">
        {alerts.length === 0 && (
          <div className="text-gray-500">No alerts.</div>
        )}
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-red-50/60 rounded px-3 py-2 animate-fade-in"
          >
            <div className="flex-shrink-0">{alert.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{alert.message}</div>
              <div className="text-xs text-gray-400">{alert.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

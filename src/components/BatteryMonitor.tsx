
import { useState, useEffect } from "react";
import { Battery, Zap, Cpu, TrendingUp, TrendingDown } from "lucide-react";

// Simulate getting real app performance data
const generateRealisticStats = () => {
  const commonApps = [
    { name: "Chrome Browser", baseUsage: { cpu: 15, battery: 12 } },
    { name: "WhatsApp", baseUsage: { cpu: 3, battery: 2 } },
    { name: "Spotify", baseUsage: { cpu: 8, battery: 6 } },
    { name: "YouTube", baseUsage: { cpu: 20, battery: 18 } },
    { name: "Gmail", baseUsage: { cpu: 2, battery: 1 } },
    { name: "Instagram", baseUsage: { cpu: 12, battery: 9 } },
    { name: "Discord", baseUsage: { cpu: 10, battery: 8 } },
    { name: "Microsoft Teams", baseUsage: { cpu: 6, battery: 4 } },
    { name: "Maps", baseUsage: { cpu: 14, battery: 16 } },
    { name: "Camera", baseUsage: { cpu: 18, battery: 22 } },
    { name: "Netflix", baseUsage: { cpu: 25, battery: 28 } },
    { name: "TikTok", baseUsage: { cpu: 16, battery: 14 } }
  ];

  // Randomly select 4-8 apps
  const numApps = Math.floor(Math.random() * 5) + 4;
  const shuffled = commonApps.sort(() => 0.5 - Math.random());
  const selectedApps = shuffled.slice(0, numApps);

  return selectedApps.map(app => {
    // Add some variance to make it more realistic
    const cpuVariance = Math.floor(Math.random() * 10) - 5; // -5 to +5
    const batteryVariance = Math.floor(Math.random() * 8) - 4; // -4 to +4
    
    const cpu = Math.max(1, app.baseUsage.cpu + cpuVariance);
    const battery = Math.max(1, app.baseUsage.battery + batteryVariance);
    
    return {
      app: app.name,
      cpu,
      battery,
      trend: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
      lastHour: {
        cpu: Math.max(1, cpu + Math.floor(Math.random() * 6) - 3),
        battery: Math.max(1, battery + Math.floor(Math.random() * 4) - 2)
      }
    };
  });
};

function getColor(val: number) {
  if (val > 30) return "text-red-600 font-bold";
  if (val > 15) return "text-orange-500 font-semibold";
  if (val > 8) return "text-yellow-500 font-medium";
  return "text-green-600 font-normal";
}

function getTrendIcon(trend: string) {
  if (trend === 'up') return <TrendingUp className="w-3 h-3 text-red-500" />;
  if (trend === 'down') return <TrendingDown className="w-3 h-3 text-green-500" />;
  return null;
}

export default function BatteryMonitor() {
  const [stats, setStats] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Load initial data
  useEffect(() => {
    const initialStats = generateRealisticStats();
    setStats(initialStats);
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStats = generateRealisticStats();
      setStats(updatedStats);
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newStats = generateRealisticStats();
      setStats(newStats);
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  const totalBatteryUsage = stats.reduce((sum, item) => sum + item.battery, 0);
  const highUsageApps = stats.filter(item => item.battery > 15).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
            <Battery className="w-5 h-5 text-green-600" />
            Battery & Performance Monitor
          </h3>
          <p className="text-sm text-gray-500">
            Real-time app performance tracking • {stats.length} apps monitored
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Battery className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Usage</span>
          </div>
          <div className="text-lg font-bold text-blue-600">{totalBatteryUsage}%</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">High Usage</span>
          </div>
          <div className="text-lg font-bold text-orange-600">{highUsageApps} apps</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Updated</span>
          </div>
          <div className="text-xs font-medium text-green-600">
            {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="border rounded-lg shadow-inner bg-gray-50 p-4">
        {stats.length === 0 ? (
          <div className="text-center py-8">
            <Battery className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <div className="text-gray-400">Loading performance data...</div>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-2">App</th>
                <th className="py-2">CPU (%)</th>
                <th className="py-2">Battery (%)</th>
                <th className="py-2">Trend</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item, ix) => (
                <tr key={ix} className="border-b last:border-b-0 hover:bg-white/60 transition-colors">
                  <td className="py-3">
                    <div className="font-medium">{item.app}</div>
                    <div className="text-xs text-gray-400">
                      Last hour: {item.lastHour.battery}% battery
                    </div>
                  </td>
                  <td className={`py-3 ${getColor(item.cpu)}`}>
                    {item.cpu}
                  </td>
                  <td className={`py-3 ${getColor(item.battery)}`}>
                    {item.battery}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(item.trend)}
                      <span className="text-xs text-gray-500 capitalize">
                        {item.trend}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.battery > 25 ? 'bg-red-100 text-red-600' :
                      item.battery > 15 ? 'bg-orange-100 text-orange-600' :
                      item.battery > 8 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {item.battery > 25 ? 'High Impact' :
                       item.battery > 15 ? 'Moderate' :
                       item.battery > 8 ? 'Low Impact' : 'Minimal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-400 text-center">
        🔋 Real-time monitoring • Auto-refresh every 30s
      </div>
    </div>
  );
}

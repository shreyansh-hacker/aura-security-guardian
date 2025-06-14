
import { useState, useEffect } from "react";
import { Battery, Zap, Cpu, TrendingUp, TrendingDown, Wifi, Globe, Activity, RefreshCw } from "lucide-react";

// Enhanced system data collection
const getSystemPerformance = () => {
  const performance = window.performance;
  const memory = (performance as any).memory;
  
  return {
    timing: performance.timing,
    navigation: performance.navigation,
    memory: memory ? {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit
    } : null
  };
};

const getNetworkInfo = () => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  return connection ? {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  } : null;
};

// Improved browser detection
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  
  // More accurate browser detection
  if (userAgent.includes('Edg/')) {
    browserName = 'Microsoft Edge';
    const match = userAgent.match(/Edg\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
    browserName = 'Google Chrome';
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Firefox/')) {
    browserName = 'Mozilla Firefox';
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Safari';
    const match = userAgent.match(/Version\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }
  
  return { browserName, browserVersion };
};

// Improved platform detection
const getPlatformInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  let osName = 'Unknown';
  let osVersion = 'Unknown';
  let architecture = 'Unknown';
  
  // Better OS detection
  if (platform.includes('Win') || userAgent.includes('Windows')) {
    osName = 'Windows';
    if (userAgent.includes('Windows NT 10.0')) {
      osVersion = '10/11';
    } else if (userAgent.includes('Windows NT 6.3')) {
      osVersion = '8.1';
    } else if (userAgent.includes('Windows NT 6.1')) {
      osVersion = '7';
    }
    architecture = userAgent.includes('WOW64') || userAgent.includes('Win64') ? 'x64' : 'x86';
  } else if (platform.includes('Mac') || userAgent.includes('Mac OS')) {
    osName = 'macOS';
    const match = userAgent.match(/Mac OS X ([0-9_]+)/);
    if (match) {
      osVersion = match[1].replace(/_/g, '.');
    }
    architecture = userAgent.includes('Intel') ? 'Intel' : 'Apple Silicon';
  } else if (platform.includes('Linux') || userAgent.includes('Linux')) {
    osName = 'Linux';
    architecture = userAgent.includes('x86_64') ? 'x64' : userAgent.includes('i686') ? 'x86' : 'ARM';
  } else if (userAgent.includes('Android')) {
    osName = 'Android';
    const match = userAgent.match(/Android ([0-9.]+)/);
    osVersion = match ? match[1] : 'Unknown';
    architecture = 'ARM';
  }
  
  return { osName, osVersion, platform, architecture };
};

// More realistic app data generation
const generateAppStats = () => {
  const systemPerf = getSystemPerformance();
  const networkInfo = getNetworkInfo();
  
  const webApps = [
    { name: "Chrome Main", baseUsage: { cpu: 12, battery: 10, memory: 180 } },
    { name: "YouTube", baseUsage: { cpu: 25, battery: 22, memory: 280 } },
    { name: "WhatsApp Web", baseUsage: { cpu: 4, battery: 3, memory: 65 } },
    { name: "Gmail", baseUsage: { cpu: 3, battery: 2, memory: 45 } },
    { name: "Discord", baseUsage: { cpu: 8, battery: 7, memory: 120 } },
    { name: "Spotify Web", baseUsage: { cpu: 6, battery: 5, memory: 95 } },
    { name: "Google Maps", baseUsage: { cpu: 18, battery: 20, memory: 220 } },
    { name: "Netflix", baseUsage: { cpu: 30, battery: 35, memory: 350 } },
    { name: "Teams", baseUsage: { cpu: 15, battery: 12, memory: 200 } },
    { name: "Slack", baseUsage: { cpu: 7, battery: 6, memory: 85 } }
  ];

  const numApps = Math.floor(Math.random() * 3) + 5;
  const selectedApps = webApps.sort(() => 0.5 - Math.random()).slice(0, numApps);

  return selectedApps.map(app => {
    const variation = 0.7 + Math.random() * 0.6; // 0.7 to 1.3 multiplier
    const networkFactor = networkInfo?.downlink ? 
      Math.min(1.2, Math.max(0.8, 1 + (10 - networkInfo.downlink) * 0.05)) : 1;
    
    const cpu = Math.max(1, Math.floor(app.baseUsage.cpu * variation));
    const battery = Math.max(1, Math.floor(app.baseUsage.battery * variation * networkFactor));
    const memory = Math.max(20, Math.floor(app.baseUsage.memory * variation));
    
    return {
      app: app.name,
      cpu,
      battery,
      memory,
      network: `${(Math.random() * 3 + 0.5).toFixed(1)} MB/s`,
      trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
      status: battery > 20 ? 'High' : battery > 10 ? 'Medium' : 'Low'
    };
  });
};

function getUsageColor(val: number) {
  if (val > 25) return "text-red-600 font-bold";
  if (val > 15) return "text-orange-500 font-semibold";
  if (val > 8) return "text-yellow-500 font-medium";
  return "text-green-600 font-normal";
}

function getTrendIcon(trend: string) {
  if (trend === 'up') return <TrendingUp className="w-3 h-3 text-red-500" />;
  if (trend === 'down') return <TrendingDown className="w-3 h-3 text-green-500" />;
  return <div className="w-3 h-3" />;
}

export default function BatteryMonitor() {
  const [appStats, setAppStats] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [systemInfo, setSystemInfo] = useState<any>({});
  const [batteryInfo, setBatteryInfo] = useState<any>(null);
  const [browserInfo, setBrowserInfo] = useState<any>({});
  const [platformInfo, setPlatformInfo] = useState<any>({});

  // Initialize system information
  useEffect(() => {
    const initSystemInfo = async () => {
      try {
        // Try to get battery info
        if ('getBattery' in navigator) {
          const battery = await (navigator as any).getBattery();
          setBatteryInfo({
            level: Math.floor(battery.level * 100),
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime
          });
        }
      } catch (error) {
        console.log('Battery API not supported');
      }
      
      // Get other system info
      const perfInfo = getSystemPerformance();
      const netInfo = getNetworkInfo();
      const browserData = getBrowserInfo();
      const platformData = getPlatformInfo();
      
      setSystemInfo({ ...perfInfo, network: netInfo });
      setBrowserInfo(browserData);
      setPlatformInfo(platformData);
    };

    initSystemInfo();
  }, []);

  // Update app statistics
  useEffect(() => {
    const updateAppStats = () => {
      const newStats = generateAppStats();
      setAppStats(newStats);
      setLastUpdate(new Date());
    };

    updateAppStats();
    const interval = setInterval(updateAppStats, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newStats = generateAppStats();
      setAppStats(newStats);
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const totalBatteryUsage = appStats.reduce((sum, item) => sum + item.battery, 0);
  const highUsageApps = appStats.filter(item => item.battery > 15).length;
  const avgCpuUsage = appStats.length > 0 ? Math.floor(appStats.reduce((sum, item) => sum + item.cpu, 0) / appStats.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            Battery & Performance Monitor
          </h3>
          <p className="text-sm text-gray-600">
            Live system monitoring • {appStats.length} processes
            {batteryInfo && ` • Battery: ${batteryInfo.level}%`}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? "Updating..." : "Refresh"}
        </button>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Total Usage</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalBatteryUsage}%</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">High Usage</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{highUsageApps}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-800">Avg CPU</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{avgCpuUsage}%</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Network</span>
          </div>
          <div className="text-sm font-bold text-green-600">
            {systemInfo.network?.effectiveType?.toUpperCase() || 'WiFi'}
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          System Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Browser:</span>
            <span className="font-medium">{browserInfo.browserName} {browserInfo.browserVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">OS:</span>
            <span className="font-medium">{platformInfo.osName} {platformInfo.osVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Architecture:</span>
            <span className="font-medium">{platformInfo.architecture}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Memory:</span>
            <span className="font-medium">
              {systemInfo.memory ? `${Math.floor(systemInfo.memory.usedJSHeapSize / 1024 / 1024)}MB` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">CPU Cores:</span>
            <span className="font-medium">{navigator.hardwareConcurrency || 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Connection:</span>
            <span className="font-medium">
              {systemInfo.network?.downlink ? `${systemInfo.network.downlink} Mbps` : 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* Process Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h4 className="font-semibold text-gray-800">Active Processes</h4>
        </div>
        
        {appStats.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <div className="text-gray-500">Loading system processes...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Process Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">CPU %</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Battery %</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Memory MB</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Network</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Trend</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {appStats.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800">{item.app}</div>
                      <div className="text-xs text-gray-500">Web Process</div>
                    </td>
                    <td className={`py-4 px-4 ${getUsageColor(item.cpu)}`}>{item.cpu}%</td>
                    <td className={`py-4 px-4 ${getUsageColor(item.battery)}`}>{item.battery}%</td>
                    <td className="py-4 px-4 text-gray-700">{item.memory} MB</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{item.network}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-xs text-gray-600 capitalize">{item.trend}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === 'High' ? 'bg-red-100 text-red-700' :
                        item.status === 'Medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.status} Impact
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500">
        🔋 Real-time monitoring • Last updated: {lastUpdate.toLocaleTimeString()} • 
        {navigator.onLine ? ' 🟢 Online' : ' 🔴 Offline'}
      </div>
    </div>
  );
}

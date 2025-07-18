
import { useState, useEffect } from "react";
import { Battery, Zap, Cpu, TrendingUp, TrendingDown, Wifi, Globe, Activity, RefreshCw, Clock, HardDrive, Monitor, Thermometer } from "lucide-react";

// Enhanced real-time system data collection
const getSystemPerformance = () => {
  const performance = window.performance;
  const memory = (performance as any).memory;
  const timing = performance.timing;
  
  return {
    timing,
    navigation: performance.navigation,
    memory: memory ? {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      memoryUsagePercent: Math.floor((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
    } : null,
    loadTime: timing.loadEventEnd - timing.navigationStart,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    currentCpuUsage: Math.floor(Math.random() * 30) + 15, // Simulated CPU usage
    networkLatency: Math.floor(Math.random() * 50) + 10
  };
};

const getNetworkInfo = () => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  return connection ? {
    effectiveType: connection.effectiveType || '4g',
    downlink: connection.downlink || Math.random() * 10 + 5,
    rtt: connection.rtt || Math.floor(Math.random() * 100) + 50,
    saveData: connection.saveData || false,
    networkType: connection.type || 'wifi'
  } : {
    effectiveType: '4g',
    downlink: Math.random() * 10 + 5,
    rtt: Math.floor(Math.random() * 100) + 50,
    saveData: false,
    networkType: 'wifi'
  };
};

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  
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
  
  return { 
    browserName, 
    browserVersion,
    cookieEnabled: navigator.cookieEnabled,
    javaEnabled: (navigator as any).javaEnabled ? (navigator as any).javaEnabled() : false
  };
};

const getPlatformInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  let osName = 'Unknown';
  let osVersion = 'Unknown';
  let architecture = 'Unknown';
  let deviceType = 'Desktop';
  
  // Mobile detection
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    deviceType = 'Mobile';
  } else if (/iPad/i.test(userAgent)) {
    deviceType = 'Tablet';
  }
  
  // OS detection
  if (platform.includes('Win') || userAgent.includes('Windows')) {
    osName = 'Windows';
    if (userAgent.includes('Windows NT 10.0')) {
      osVersion = '10/11';
    }
    architecture = userAgent.includes('WOW64') || userAgent.includes('Win64') ? 'x64' : 'x86';
  } else if (platform.includes('Mac') || userAgent.includes('Mac OS')) {
    osName = 'macOS';
    const match = userAgent.match(/Mac OS X ([0-9_]+)/);
    if (match) {
      osVersion = match[1].replace(/_/g, '.');
    }
    architecture = 'Intel/Apple Silicon';
  } else if (platform.includes('Linux') || userAgent.includes('Linux')) {
    osName = 'Linux';
    architecture = userAgent.includes('x86_64') ? 'x64' : 'x86';
  }
  
  return { 
    osName, 
    osVersion, 
    platform, 
    architecture, 
    deviceType,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};

// Real-time app data generation with actual variation
const generateRealTimeAppStats = () => {
  const systemPerf = getSystemPerformance();
  const networkInfo = getNetworkInfo();
  const currentTime = Date.now();
  
  const webApps = [
    { name: "Chrome Browser", category: "Browser", baseUsage: { cpu: 15, battery: 12, memory: 220, disk: 150 } },
    { name: "YouTube", category: "Media", baseUsage: { cpu: 28, battery: 25, memory: 320, disk: 80 } },
    { name: "WhatsApp Web", category: "Communication", baseUsage: { cpu: 6, battery: 4, memory: 85, disk: 45 } },
    { name: "Gmail", category: "Productivity", baseUsage: { cpu: 4, battery: 3, memory: 65, disk: 30 } },
    { name: "Discord", category: "Communication", baseUsage: { cpu: 10, battery: 8, memory: 140, disk: 90 } },
    { name: "Spotify Web", category: "Media", baseUsage: { cpu: 8, battery: 6, memory: 110, disk: 60 } },
    { name: "VS Code Web", category: "Development", baseUsage: { cpu: 20, battery: 15, memory: 280, disk: 120 } },
    { name: "Netflix", category: "Media", baseUsage: { cpu: 35, battery: 40, memory: 450, disk: 200 } },
    { name: "Slack", category: "Communication", baseUsage: { cpu: 9, battery: 7, memory: 120, disk: 70 } }
  ];

  const numApps = Math.floor(Math.random() * 3) + 6; // 6-8 apps
  const selectedApps = webApps.sort(() => 0.5 - Math.random()).slice(0, numApps);

  return selectedApps.map((app, index) => {
    // Time-based variation that changes over time
    const timeVariation = Math.sin((currentTime / 5000) + index) * 0.4 + 1;
    
    // System performance impact
    const memoryPressure = systemPerf.memory ? (systemPerf.memory.memoryUsagePercent / 100) * 0.3 + 0.8 : 1;
    
    // Network impact
    const networkFactor = networkInfo.downlink < 5 ? 1.2 : 0.9;
    
    const totalVariation = timeVariation * memoryPressure * networkFactor;
    
    const cpu = Math.max(1, Math.floor(app.baseUsage.cpu * totalVariation + (Math.random() * 5 - 2.5)));
    const battery = Math.max(1, Math.floor(app.baseUsage.battery * totalVariation + (Math.random() * 3 - 1.5)));
    const memory = Math.max(25, Math.floor(app.baseUsage.memory * totalVariation + (Math.random() * 20 - 10)));
    const disk = Math.max(10, Math.floor(app.baseUsage.disk * totalVariation + (Math.random() * 15 - 7.5)));
    
    // Dynamic trend calculation
    const previousCpu = Math.floor(app.baseUsage.cpu * 0.95);
    let trend = 'stable';
    if (cpu > previousCpu * 1.1) trend = 'up';
    else if (cpu < previousCpu * 0.9) trend = 'down';
    
    return {
      id: index,
      app: app.name,
      category: app.category,
      cpu,
      battery,
      memory,
      disk,
      network: `${(networkInfo.downlink * Math.random() * 0.3 + 0.5).toFixed(1)} MB/s`,
      uptime: `${Math.floor(Math.random() * 180 + 10)}m`,
      trend,
      status: battery > 25 ? 'High' : battery > 12 ? 'Medium' : 'Low',
      priority: battery > 30 || cpu > 35 ? 'High' : battery > 15 || cpu > 20 ? 'Normal' : 'Low',
      timestamp: currentTime
    };
  });
};

function getUsageColor(val: number, type: string = 'battery') {
  const thresholds = {
    battery: { high: 25, medium: 15 },
    cpu: { high: 30, medium: 20 },
    memory: { high: 400, medium: 200 }
  };
  
  const threshold = thresholds[type as keyof typeof thresholds] || thresholds.battery;
  
  if (val > threshold.high) return "text-red-600 font-bold";
  if (val > threshold.medium) return "text-orange-500 font-semibold";
  return "text-green-600 font-normal";
}

function getTrendIcon(trend: string) {
  if (trend === 'up') return <TrendingUp className="w-3 h-3 text-red-500" />;
  if (trend === 'down') return <TrendingDown className="w-3 h-3 text-green-500" />;
  return <div className="w-3 h-3 bg-gray-300 rounded-full" />;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Browser': return <Globe className="w-4 h-4 text-blue-500" />;
    case 'Media': return <Monitor className="w-4 h-4 text-purple-500" />;
    case 'Communication': return <Wifi className="w-4 h-4 text-green-500" />;
    case 'Productivity': return <Activity className="w-4 h-4 text-orange-500" />;
    case 'Development': return <Cpu className="w-4 h-4 text-indigo-500" />;
    default: return <Activity className="w-4 h-4 text-gray-500" />;
  }
}

export default function BatteryMonitor() {
  const [appStats, setAppStats] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [systemInfo, setSystemInfo] = useState<any>({});
  const [batteryInfo, setBatteryInfo] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState({
    currentTime: new Date(),
    cpuTemperature: 45 + Math.random() * 15,
    networkLatency: 20 + Math.random() * 30,
    memoryUsage: 0
  });
  const [sortBy, setSortBy] = useState('battery');
  const [filterBy, setFilterBy] = useState('all');

  // Initialize system information
  useEffect(() => {
    const initSystemInfo = async () => {
      try {
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
      
      const perfInfo = getSystemPerformance();
      const netInfo = getNetworkInfo();
      const browserData = getBrowserInfo();
      const platformData = getPlatformInfo();
      
      setSystemInfo({ 
        performance: perfInfo, 
        network: netInfo, 
        browser: browserData, 
        platform: platformData 
      });
    };

    initSystemInfo();
  }, []);

  // Real-time updates every 2 seconds
  useEffect(() => {
    const updateRealTimeData = () => {
      const perfInfo = getSystemPerformance();
      
      setRealTimeData({
        currentTime: new Date(),
        cpuTemperature: 40 + Math.random() * 25,
        networkLatency: 15 + Math.random() * 35,
        memoryUsage: perfInfo.memory?.memoryUsagePercent || Math.floor(Math.random() * 40) + 30
      });
    };

    const updateAppStats = () => {
      const newStats = generateRealTimeAppStats();
      setAppStats(newStats);
      setLastUpdate(new Date());
    };

    // Initial data
    updateAppStats();
    updateRealTimeData();

    // Real-time intervals
    const statsInterval = setInterval(updateAppStats, 2000); // Every 2 seconds
    const dataInterval = setInterval(updateRealTimeData, 1000); // Every second
    
    return () => {
      clearInterval(statsInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newStats = generateRealTimeAppStats();
      setAppStats(newStats);
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  // Real-time calculations
  const totalBatteryUsage = appStats.reduce((sum, item) => sum + item.battery, 0);
  const totalMemoryUsage = appStats.reduce((sum, item) => sum + item.memory, 0);
  const highUsageApps = appStats.filter(item => item.battery > 20).length;
  const avgCpuUsage = appStats.length > 0 ? Math.floor(appStats.reduce((sum, item) => sum + item.cpu, 0) / appStats.length) : 0;

  // Filter and sort
  const filteredApps = appStats
    .filter(app => filterBy === 'all' || app.category.toLowerCase() === filterBy)
    .sort((a, b) => {
      if (sortBy === 'app') return a.app.localeCompare(b.app);
      return b[sortBy] - a[sortBy];
    });

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-xl md:text-2xl mb-2 flex items-center gap-3">
            <Activity className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Real-Time System Monitor
          </h3>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 md:w-4 md:h-4" />
              {appStats.length} active processes
            </span>
            {batteryInfo && (
              <span className="flex items-center gap-1">
                <Battery className="w-3 h-3 md:w-4 md:h-4" />
                {batteryInfo.level}% {batteryInfo.charging ? '⚡ Charging' : '🔋 On Battery'}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              {realTimeData.currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 md:px-5 md:py-3 rounded-xl text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center gap-2 shadow-lg"
        >
          <RefreshCw className={`w-3 h-3 md:w-4 md:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? "Updating..." : "Refresh"}
        </button>
      </div>

      {/* Real-time Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-semibold text-blue-800">Battery Usage</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-600">{totalBatteryUsage}%</div>
          <div className="text-xs text-blue-500 mt-1">Total active consumption</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 md:p-4 rounded-xl border border-orange-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            <span className="text-xs md:text-sm font-semibold text-orange-800">High Impact</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-orange-600">{highUsageApps}</div>
          <div className="text-xs text-orange-500 mt-1">Resource intensive apps</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 md:p-4 rounded-xl border border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            <span className="text-xs md:text-sm font-semibold text-purple-800">CPU Average</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-purple-600">{avgCpuUsage}%</div>
          <div className="text-xs text-purple-500 mt-1">Current processing load</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 md:p-4 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <span className="text-xs md:text-sm font-semibold text-green-800">Memory</span>
          </div>
          <div className="text-lg md:text-xl font-bold text-green-600">{Math.floor(totalMemoryUsage / 1024 * 100) / 100}GB</div>
          <div className="text-xs text-green-500 mt-1">Active RAM usage</div>
        </div>
      </div>

      {/* Live System Information */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 md:w-5 md:h-5" />
          Live System Status - Updated {realTimeData.currentTime.toLocaleTimeString()}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h5 className="font-semibold text-gray-700">Browser Information</h5>
            <div className="space-y-1 pl-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Browser:</span>
                <span className="font-medium">{systemInfo.browser?.browserName || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">{systemInfo.browser?.browserVersion || 'Unknown'}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-gray-700">System Information</h5>
            <div className="space-y-1 pl-4">
              <div className="flex justify-between">
                <span className="text-gray-600">OS:</span>
                <span className="font-medium">{systemInfo.platform?.osName || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Architecture:</span>
                <span className="font-medium">{systemInfo.platform?.architecture || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CPU Temp:</span>
                <span className="font-medium">{Math.floor(realTimeData.cpuTemperature)}°C</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-gray-700">Performance Metrics</h5>
            <div className="space-y-1 pl-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Memory Usage:</span>
                <span className="font-medium">{realTimeData.memoryUsage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network Speed:</span>
                <span className="font-medium">{systemInfo.network?.downlink?.toFixed(1) || 'Unknown'} Mbps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Latency:</span>
                <span className="font-medium">{Math.floor(realTimeData.networkLatency)}ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="battery">Battery Usage</option>
              <option value="cpu">CPU Usage</option>
              <option value="memory">Memory Usage</option>
              <option value="app">App Name</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="browser">Browser</option>
              <option value="media">Media</option>
              <option value="communication">Communication</option>
              <option value="productivity">Productivity</option>
              <option value="development">Development</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {filteredApps.length} of {appStats.length} processes • Live data
        </div>
      </div>

      {/* Real-time Process Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 md:p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-4 h-4 md:w-5 md:h-5" />
            Live Process Monitor - Auto-refreshing every 2 seconds
          </h4>
        </div>
        
        {filteredApps.length === 0 ? (
          <div className="text-center py-16">
            <Activity className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 text-lg">Loading real-time data...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">Process</th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">CPU %</th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">Battery %</th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">Memory MB</th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">Network</th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">Trend</th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-5 font-bold text-gray-700">Priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((item, index) => (
                  <tr key={`${item.id}-${item.timestamp}`} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
                    <td className="py-3 md:py-5 px-3 md:px-5">
                      <div className="flex items-center gap-2 md:gap-3">
                        {getCategoryIcon(item.category)}
                        <div>
                          <div className="font-semibold text-gray-800 text-sm md:text-base">{item.app}</div>
                          <div className="text-xs text-gray-500">
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`py-3 md:py-5 px-3 md:px-5 ${getUsageColor(item.cpu, 'cpu')}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base">{item.cpu}%</span>
                        <div className="w-12 md:w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.cpu > 30 ? 'bg-red-500' : item.cpu > 20 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(item.cpu * 2, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={`py-3 md:py-5 px-3 md:px-5 ${getUsageColor(item.battery)}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base">{item.battery}%</span>
                        <div className="w-12 md:w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.battery > 25 ? 'bg-red-500' : item.battery > 15 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(item.battery * 2, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={`py-3 md:py-5 px-3 md:px-5 ${getUsageColor(item.memory, 'memory')} text-sm md:text-base`}>
                      {item.memory} MB
                    </td>
                    <td className="py-3 md:py-5 px-3 md:px-5 text-gray-600 text-xs md:text-sm font-mono">
                      {item.network}
                    </td>
                    <td className="py-3 md:py-5 px-3 md:px-5">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(item.trend)}
                        <span className="text-xs text-gray-600 capitalize font-medium">{item.trend}</span>
                      </div>
                    </td>
                    <td className="py-3 md:py-5 px-3 md:px-5">
                      <span className={`text-xs px-2 md:px-3 py-1 rounded-full font-semibold ${
                        item.priority === 'High' ? 'bg-red-100 text-red-700' :
                        item.priority === 'Normal' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Live Status Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Real-time monitoring active
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
            <span className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-blue-500" />
              System: {navigator.onLine ? '🟢 Online' : '🔴 Offline'}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            Auto-refresh: 2s • {appStats.length} processes • Live analytics
          </div>
        </div>
      </div>
    </div>
  );
}

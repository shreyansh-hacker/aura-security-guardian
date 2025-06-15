
import { useState, useEffect } from 'react';
import { Smartphone, Wifi, Battery, Cpu, HardDrive, Signal, Thermometer, Clock } from 'lucide-react';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface SystemMetrics {
  batteryLevel: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkStrength: number;
  temperature: number;
  uptime: string;
  activeProcesses: number;
}

export default function MobileSystemMonitor() {
  const mobileInfo = useMobileDetection();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    batteryLevel: 85,
    cpuUsage: 23,
    memoryUsage: 45,
    storageUsage: 67,
    networkStrength: 92,
    temperature: 32,
    uptime: '2h 15m',
    activeProcesses: 24
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!mobileInfo.isMobile) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        batteryLevel: Math.max(20, Math.min(100, prev.batteryLevel + Math.floor(Math.random() * 3) - 1)),
        cpuUsage: Math.max(10, Math.min(80, prev.cpuUsage + Math.floor(Math.random() * 10) - 5)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + Math.floor(Math.random() * 6) - 3)),
        storageUsage: prev.storageUsage + (Math.random() * 0.1),
        networkStrength: Math.max(50, Math.min(100, prev.networkStrength + Math.floor(Math.random() * 6) - 3)),
        temperature: Math.max(25, Math.min(45, prev.temperature + Math.floor(Math.random() * 4) - 2)),
        uptime: calculateUptime(),
        activeProcesses: Math.max(15, Math.min(40, prev.activeProcesses + Math.floor(Math.random() * 4) - 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [mobileInfo.isMobile]);

  const calculateUptime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  const getMetricColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value > 70) return 'text-red-600 bg-red-50';
      if (value > 40) return 'text-yellow-600 bg-yellow-50';
      return 'text-green-600 bg-green-50';
    } else {
      if (value > 70) return 'text-green-600 bg-green-50';
      if (value > 40) return 'text-yellow-600 bg-yellow-50';
      return 'text-red-600 bg-red-50';
    }
  };

  if (!mobileInfo.isMobile) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
        <Smartphone className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <div className="text-blue-800 font-medium">Mobile System Monitor</div>
        <div className="text-blue-600 text-sm">Available on mobile devices only</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">System Monitor</h3>
              <div className="text-blue-100 text-sm flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                Live monitoring • {mobileInfo.isAndroid ? 'Android' : mobileInfo.isIOS ? 'iOS' : 'Mobile'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Battery */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Battery</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{metrics.batteryLevel}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all ${
                  metrics.batteryLevel > 50 ? 'bg-green-500' : 
                  metrics.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${metrics.batteryLevel}%` }}
              />
            </div>
          </div>

          {/* CPU */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">CPU</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{metrics.cpuUsage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all ${
                  metrics.cpuUsage > 60 ? 'bg-red-500' : 
                  metrics.cpuUsage > 30 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${metrics.cpuUsage}%` }}
              />
            </div>
          </div>

          {/* Memory */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Memory</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{metrics.memoryUsage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all ${
                  metrics.memoryUsage > 70 ? 'bg-red-500' : 
                  metrics.memoryUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${metrics.memoryUsage}%` }}
              />
            </div>
          </div>

          {/* Network */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Signal className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Signal</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{metrics.networkStrength}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="h-2 rounded-full bg-green-500 transition-all"
                style={{ width: `${metrics.networkStrength}%` }}
              />
            </div>
          </div>
        </div>

        {/* Additional metrics */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <Thermometer className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <div className="font-bold text-gray-800">{metrics.temperature}°C</div>
            <div className="text-gray-600 text-xs">Temperature</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="font-bold text-gray-800">{metrics.uptime}</div>
            <div className="text-gray-600 text-xs">Uptime</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <Cpu className="w-4 h-4 text-purple-500 mx-auto mb-1" />
            <div className="font-bold text-gray-800">{metrics.activeProcesses}</div>
            <div className="text-gray-600 text-xs">Processes</div>
          </div>
        </div>

        {/* Device info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Platform:</span>
              <span className="font-medium">{mobileInfo.isAndroid ? 'Android' : mobileInfo.isIOS ? 'iOS' : 'Mobile'}</span>
            </div>
            <div className="flex justify-between">
              <span>Resolution:</span>
              <span className="font-medium">{mobileInfo.deviceInfo.screenWidth}x{mobileInfo.deviceInfo.screenHeight}</span>
            </div>
            <div className="flex justify-between">
              <span>Orientation:</span>
              <span className="font-medium">{mobileInfo.deviceInfo.orientation.split('-')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Touch Points:</span>
              <span className="font-medium">{mobileInfo.deviceInfo.touchPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

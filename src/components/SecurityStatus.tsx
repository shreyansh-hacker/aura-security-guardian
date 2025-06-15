
import { Shield, ShieldAlert, Clock, RefreshCw, CheckCircle, Smartphone, Wifi, Battery } from "lucide-react";
import RiskChart from "./RiskChart";
import { useState, useEffect } from "react";
import { useMobileDetection } from "../hooks/useMobileDetection";

export default function SecurityStatus() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [score, setScore] = useState(92);
  const [realtimeData, setRealtimeData] = useState({
    activeThreats: 0,
    blockedAttacks: 847,
    secureConnections: 99.8,
    systemLoad: 23
  });
  
  const mobileInfo = useMobileDetection();
  
  const level = score > 80 ? "Safe" : score > 50 ? "Warning" : "Danger";
  const color =
    level === "Safe" ? "text-green-600" : level === "Warning" ? "text-yellow-500" : "text-red-600";

  // Real-time score updates optimized for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time security score changes
      const fluctuation = Math.floor(Math.random() * 6) - 3; // -3 to +3
      const newScore = Math.max(85, Math.min(98, score + fluctuation));
      setScore(newScore);
      
      // Update real-time data
      setRealtimeData(prev => ({
        activeThreats: Math.max(0, prev.activeThreats + Math.floor(Math.random() * 3) - 1),
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        secureConnections: Math.max(95, Math.min(100, prev.secureConnections + (Math.random() * 0.4 - 0.2))),
        systemLoad: Math.max(15, Math.min(35, prev.systemLoad + Math.floor(Math.random() * 6) - 3))
      }));
      
      setLastUpdate(new Date());
    }, mobileInfo.isMobile ? 3000 : 2000); // Slower updates on mobile to save battery

    return () => clearInterval(interval);
  }, [score, mobileInfo.isMobile]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate mobile-optimized refresh
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 15) + 85); // 85-99
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white rounded-2xl shadow-lg px-4 md:px-8 py-4 md:py-6 gap-4 lg:gap-0">
      <div className="flex items-center gap-3 md:gap-4 w-full lg:w-auto">
        <div className="rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 border border-blue-200">
          {mobileInfo.isMobile ? (
            <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-blue-700" />
          ) : (
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-700" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-2">
            {mobileInfo.isMobile ? 'Mobile Security Guardian' : 'Malware Protection Status'}
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-base md:text-lg font-bold ${color}`}>{level}</span>
            <span className="text-sm md:text-base font-medium text-gray-600">({score}/100)</span>
            {level === "Danger" && <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 text-red-600" />}
            {level === "Safe" && <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />}
          </div>
          <div className="text-gray-500 text-xs md:text-sm mt-1">
            {mobileInfo.isMobile ? 'Real-time mobile protection active' : 'Comprehensive real-time protection enabled'}
          </div>
          
          {/* Mobile Device Info */}
          {mobileInfo.isMobile && (
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                {mobileInfo.isAndroid ? 'Android' : mobileInfo.isIOS ? 'iOS' : 'Mobile'}
              </span>
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                {navigator.onLine ? 'Online' : 'Offline'}
              </span>
              <span className="flex items-center gap-1">
                <Battery className="w-3 h-3" />
                {mobileInfo.deviceInfo.screenWidth}x{mobileInfo.deviceInfo.screenHeight}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-8 w-full lg:w-auto">
        {/* Real-time Statistics - Mobile Optimized */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 md:p-4 rounded-xl border border-blue-100 min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <div className="text-xs md:text-sm font-medium text-blue-800">Live Security Monitor</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="bg-white p-2 rounded-lg">
              <div className="text-gray-500">Active Threats</div>
              <div className="font-bold text-red-600">{realtimeData.activeThreats}</div>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <div className="text-gray-500">Blocked</div>
              <div className="font-bold text-green-600">{realtimeData.blockedAttacks}</div>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <div className="text-gray-500">Secure %</div>
              <div className="font-bold text-blue-600">{realtimeData.secureConnections.toFixed(1)}%</div>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <div className="text-gray-500">Load</div>
              <div className="font-bold text-purple-600">{realtimeData.systemLoad}%</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Last Scan:</span>
              <span className="font-medium text-gray-700">{getTimeAgo(lastUpdate)}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Status:</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-600">Live</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Next Update:</span>
              <span className="text-gray-600">{mobileInfo.isMobile ? '3s' : '2s'}</span>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Force Refresh'}
            </button>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <RiskChart score={score} />
        </div>
      </div>
    </div>
  );
}


import { Shield, ShieldAlert, Clock, RefreshCw, CheckCircle } from "lucide-react";
import RiskChart from "./RiskChart";
import { useState } from "react";

export default function SecurityStatus() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // Simulate an overall system score (0-100)
  const score = 84;
  const level = score > 80 ? "Safe" : score > 50 ? "Warning" : "Danger";
  const color =
    level === "Safe" ? "text-green-600" : level === "Warning" ? "text-yellow-500" : "text-red-600";

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 2000);
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
    <div className="flex flex-row justify-between items-center bg-white rounded-2xl shadow px-8 py-6">
      <div className="flex items-center gap-4">
        <div className={`rounded-full bg-blue-50 p-4`}>
          <Shield className="w-10 h-10 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Malware Protection Status</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-lg font-bold ${color}`}>{level}</span>
            {level === "Danger" && <ShieldAlert className="w-6 h-6 text-red-600" />}
            {level === "Safe" && <CheckCircle className="w-6 h-6 text-green-600" />}
          </div>
          <div className="text-gray-500 text-sm">Comprehensive real-time protection enabled</div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        {/* Enhanced Last Update Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div className="text-sm font-medium text-blue-800">Security Updates</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Last Scan:</span>
              <span className="text-sm font-medium text-gray-700">{getTimeAgo(lastUpdate)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Status:</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-600">Active</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Next Scan:</span>
              <span className="text-xs text-gray-600">15 min</span>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh Now'}
            </button>
          </div>
        </div>
        
        <div>
          <RiskChart score={score} />
        </div>
      </div>
    </div>
  );
}

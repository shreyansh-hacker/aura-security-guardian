
import MobileSystemMonitor from "../components/MobileSystemMonitor";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMobileDetection } from "../hooks/useMobileDetection";

const SystemMonitorPage = () => {
  const navigate = useNavigate();
  const mobileInfo = useMobileDetection();

  if (!mobileInfo.isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile Only Feature</h2>
          <p className="text-gray-600 mb-6">This feature is only available on mobile devices.</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <MobileSystemMonitor />
      </div>
    </div>
  );
};

export default SystemMonitorPage;

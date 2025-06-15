
import AppLockPanel from "../components/AppLockPanel";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppLockPage = () => {
  const navigate = useNavigate();

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
        <AppLockPanel />
      </div>
    </div>
  );
};

export default AppLockPage;

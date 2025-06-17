
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Auto-redirect to home after 3 seconds for mobile app
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-4">Page not found</p>
          <p className="text-gray-500 text-sm mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <button
          onClick={() => navigate("/", { replace: true })}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </button>
        
        <p className="text-xs text-gray-400 mt-4">
          Redirecting automatically in 3 seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFound;

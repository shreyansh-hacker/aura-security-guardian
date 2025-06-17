
import ProjectPresentation from "../components/ProjectPresentation";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PresentationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-white px-3 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <ProjectPresentation />
    </div>
  );
};

export default PresentationPage;

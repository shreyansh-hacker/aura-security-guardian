
import { Shield, ShieldAlert } from "lucide-react";
import RiskChart from "./RiskChart";

export default function SecurityStatus() {
  // Simulate an overall system score (0-100)
  const score = 84;
  const level = score > 80 ? "Safe" : score > 50 ? "Warning" : "Danger";
  const color =
    level === "Safe" ? "text-green-600" : level === "Warning" ? "text-yellow-500" : "text-red-600";

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
          </div>
          <div className="text-gray-500 text-sm">Comprehensive real-time protection enabled</div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div>
          <div className="text-xs text-gray-400">Last Update</div>
          <div className="text-base font-medium text-gray-700">Just now</div>
        </div>
        <div>
          <RiskChart score={score} />
        </div>
      </div>
    </div>
  );
}

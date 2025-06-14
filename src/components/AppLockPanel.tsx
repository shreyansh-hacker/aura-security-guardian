
import { useState } from "react";
import { Shield, Lock, Unlock } from "lucide-react";

const APPS = [
  "Chrome", "WhatsApp", "Instagram", "YouTube", "Gmail", "Spotify", "Discord", "Teams", "Maps", "Netflix", "Slack", "Zoom"
];

export default function AppLockPanel() {
  const [locked, setLocked] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const toggle = (app: string) => {
    setLocked(l =>
      l.includes(app) ? l.filter(x => x !== app) : [...l, app]
    );
  };

  const scanApps = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          App Lock Protection
        </h3>
        <button
          onClick={scanApps}
          disabled={isScanning}
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isScanning ? "Scanning..." : "Scan Apps"}
        </button>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <div className="font-bold text-blue-600">{APPS.length}</div>
            <div className="text-blue-500">Total Apps</div>
          </div>
          <div>
            <div className="font-bold text-green-600">{locked.length}</div>
            <div className="text-green-500">Protected</div>
          </div>
          <div>
            <div className="font-bold text-orange-600">{APPS.length - locked.length}</div>
            <div className="text-orange-500">Unprotected</div>
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {APPS.map(app => (
          <div key={app} className="flex items-center gap-3 border-b py-3 hover:bg-gray-50 transition-colors">
            <button
              className={`rounded-full border-2 p-2 transition-all duration-200 ${locked.includes(app)
                ? "bg-green-600 border-green-700 shadow-lg"
                : "bg-white border-gray-300 hover:border-blue-400"
                }`}
              onClick={() => toggle(app)}
            >
              {locked.includes(app) ? (
                <Lock className="w-4 h-4 text-white" />
              ) : (
                <Unlock className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <div className="flex-1">
              <span className="font-medium text-gray-800">{app}</span>
              <div className="text-xs text-gray-500">
                {locked.includes(app) ? 'Protected with biometric lock' : 'Tap to enable protection'}
              </div>
            </div>
            {locked.includes(app) && (
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs font-medium">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Secured
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-xs text-gray-600 mb-2">
          <strong>Protection Status:</strong> {locked.length > 0 ? 'Active' : 'Inactive'}
        </div>
        <div className="text-xs text-gray-500">
          🔒 App lock simulates protection features. Real implementation requires native mobile app development.
        </div>
      </div>
    </div>
  );
}

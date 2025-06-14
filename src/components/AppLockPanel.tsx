
import { useState } from "react";
import { Shield } from "lucide-react";

const APPS = [
  "BankApp Secure", "WhatsApp", "DocEditor Pro", "AmazingGame.apk", "System Update Helper"
];

export default function AppLockPanel() {
  const [locked, setLocked] = useState<string[]>([]);

  const toggle = (app: string) => {
    setLocked(l =>
      l.includes(app) ? l.filter(x => x !== app) : [...l, app]
    );
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">App Lock</h3>
      <div className="space-y-2">
        {APPS.map(app => (
          <div key={app} className="flex items-center gap-3 border-b py-2">
            <button
              className={`rounded-full border p-2 transition ${locked.includes(app)
                ? "bg-blue-600 border-blue-700"
                : "bg-white border-gray-300"
                }`}
              onClick={() => toggle(app)}
            >
              <Shield className={`w-5 h-5 ${locked.includes(app) ? "text-white" : "text-blue-600"}`} />
            </button>
            <span className="font-medium">{app}</span>
            {locked.includes(app) && (
              <span className="ml-3 bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs">Locked</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-gray-400 text-xs">
        (App lock works as a demo — for real locking, native integration required.)
      </div>
    </div>
  );
}

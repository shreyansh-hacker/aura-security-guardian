
import { Shield, Search, FileSearch, FileX, X, ShieldAlert } from "lucide-react";
import SecurityStatus from "@/components/SecurityStatus";
import AppsScanner from "@/components/AppsScanner";
import AiDetectionPanel from "@/components/AiDetectionPanel";
import AlertPanel from "@/components/AlertPanel";
import UrlScanner from "@/components/UrlScanner";
import FileScanner from "@/components/FileScanner";
import PhishingDetector from "@/components/PhishingDetector";
import BatteryMonitor from "@/components/BatteryMonitor";
import AppLockPanel from "@/components/AppLockPanel";
import SecurityChatbot from "@/components/SecurityChatbot";
import { useState } from "react";

const TABS = [
  { label: "Scan Apps", icon: <Search className="w-5 h-5 text-blue-600" /> },
  { label: "AI Detection", icon: <Shield className="w-5 h-5 text-green-600" /> },
  { label: "File Scanner", icon: <FileSearch className="w-5 h-5 text-indigo-600" /> },
  { label: "URL Scanner", icon: <Search className="w-5 h-5 text-cyan-600" /> },
  { label: "Phishing Detector", icon: <ShieldAlert className="w-5 h-5 text-orange-500" /> },
  { label: "Battery Monitor", icon: <FileX className="w-5 h-5 text-pink-500" /> },
  { label: "App Lock", icon: <X className="w-5 h-5 text-gray-600" /> },
  { label: "Security Chatbot", icon: <Shield className="w-5 h-5 text-blue-400" /> },
];

export default function Index() {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-white to-blue-50">
      <div className="w-full px-10 py-10">
        <SecurityStatus />
        <div className="flex flex-row mt-10 gap-6">
          <div className="w-2/3 space-y-6">
            <div className="flex items-center gap-3">
              {TABS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md border shadow-sm bg-white hover:bg-blue-50 transition-all duration-200
                    ${tab === i ? "bg-blue-100 border-blue-600 text-blue-800 font-bold" : "text-gray-700 border-gray-200"}
                  `}
                >
                  {t.icon}
                  <span className="text-base">{t.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 min-h-[360px] rounded-2xl bg-white shadow p-6 animate-fade-in">
              {tab === 0 && <AppsScanner />}
              {tab === 1 && <AiDetectionPanel />}
              {tab === 2 && <FileScanner />}
              {tab === 3 && <UrlScanner />}
              {tab === 4 && <PhishingDetector />}
              {tab === 5 && <BatteryMonitor />}
              {tab === 6 && <AppLockPanel />}
              {tab === 7 && <SecurityChatbot />}
            </div>
          </div>
          <div className="w-1/3 min-w-[320px] pl-4">
            <AlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

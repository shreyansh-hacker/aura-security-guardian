
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const TABS = [
  { label: "Scan Apps", icon: <Search className="w-5 h-5 text-blue-600" />, tip: "Scan installed apps for risks" },
  { label: "AI Detection", icon: <Shield className="w-5 h-5 text-green-600" />, tip: "Detect threats with AI" },
  { label: "File Scanner", icon: <FileSearch className="w-5 h-5 text-indigo-600" />, tip: "Scan files for malware" },
  { label: "URL Scanner", icon: <Search className="w-5 h-5 text-cyan-600" />, tip: "Check links for safety" },
  { label: "Phishing Detector", icon: <ShieldAlert className="w-5 h-5 text-orange-500" />, tip: "Spot phishing attempts" },
  { label: "Battery Monitor", icon: <FileX className="w-5 h-5 text-pink-500" />, tip: "View app performance" },
  { label: "App Lock", icon: <X className="w-5 h-5 text-gray-600" />, tip: "Lock sensitive apps" },
  { label: "Security Chatbot", icon: <Shield className="w-5 h-5 text-blue-400" />, tip: "Get expert advice" },
];

export default function Index() {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-blue-50 via-gray-50 to-blue-100 animate-fade-in">
      <div className="w-full px-2 md:px-10 py-10">
        <SecurityStatus />
        <div className="flex flex-col md:flex-row mt-10 gap-6">
          <div className="w-full md:w-2/3 space-y-6">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              {TABS.map((t, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setTab(i)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-2xl border shadow-sm bg-white hover:bg-blue-50 transition-all duration-200
                        ${tab === i ? "bg-gradient-to-tr from-blue-200 via-blue-100 to-white border-blue-500 text-blue-800 font-bold scale-105" : "text-gray-700 border-gray-200"}
                      `}
                      aria-label={t.tip}
                    >
                      {t.icon}
                      <span className="text-sm md:text-base">{t.label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{t.tip}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="mt-4 min-h-[360px] rounded-3xl bg-white shadow-xl p-6 md:p-8 animate-fade-in border border-blue-100 transition-all duration-200">
              <div className="animate-fade-in">
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
          </div>
          <div className="w-full md:w-1/3 min-w-[320px] pl-0 md:pl-4">
            <AlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

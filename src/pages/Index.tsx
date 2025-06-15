
import SecurityStatus from "../components/SecurityStatus";
import AppsScanner from "../components/AppsScanner";
import MobileSystemMonitor from "../components/MobileSystemMonitor";
import AlertPanel from "../components/AlertPanel";
import FileScanner from "../components/FileScanner";
import UrlScanner from "../components/UrlScanner";
import PhishingDetector from "../components/PhishingDetector";
import BatteryMonitor from "../components/BatteryMonitor";
import AiDetectionPanel from "../components/AiDetectionPanel";
import AppLockPanel from "../components/AppLockPanel";
import SecurityChatbot from "../components/SecurityChatbot";
import { AppSidebar } from "../components/AppSidebar";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { Shield, Smartphone, Globe } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  const mobileInfo = useMobileDetection();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Mobile-optimized header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  {mobileInfo.isMobile ? (
                    <Smartphone className="w-8 h-8 text-blue-600" />
                  ) : (
                    <Shield className="w-8 h-8 text-blue-600" />
                  )}
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                      {mobileInfo.isMobile ? 'Mobile Security Guardian' : 'AI Malware Detection'}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Real-time protection active</span>
                      {mobileInfo.isMobile && (
                        <>
                          <span>•</span>
                          <span>{mobileInfo.isAndroid ? 'Android' : mobileInfo.isIOS ? 'iOS' : 'Mobile'} optimized</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="hidden sm:inline text-gray-600">
                    {navigator.onLine ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 space-y-6 md:space-y-8">
            {/* Security Status - Always first */}
            <div id="security-status">
              <SecurityStatus />
            </div>

            {/* Mobile System Monitor - Only on mobile */}
            {mobileInfo.isMobile && (
              <div id="system-monitor">
                <MobileSystemMonitor />
              </div>
            )}

            {/* Main Grid Layout - Responsive */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column - Primary Security Features */}
              <div className="xl:col-span-2 space-y-6">
                <div id="apps-scanner">
                  <AppsScanner />
                </div>
                <div id="alert-panel">
                  <AlertPanel />
                </div>
                <div id="file-scanner">
                  <FileScanner />
                </div>
              </div>

              {/* Right Column - Secondary Features */}
              <div className="space-y-6">
                <div id="url-scanner">
                  <UrlScanner />
                </div>
                <div id="phishing-detector">
                  <PhishingDetector />
                </div>
                {mobileInfo.isMobile && (
                  <div id="battery-monitor">
                    <BatteryMonitor />
                  </div>
                )}
                <div id="ai-detection">
                  <AiDetectionPanel />
                </div>
                <div id="app-lock">
                  <AppLockPanel />
                </div>
              </div>
            </div>

            {/* Security Chatbot - Mobile optimized positioning */}
            <div id="security-chat">
              <SecurityChatbot />
            </div>

            {/* Mobile-specific footer */}
            {mobileInfo.isMobile && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-semibold">Mobile Security Active</span>
                </div>
                <div className="text-sm text-blue-100">
                  Your {mobileInfo.isAndroid ? 'Android' : mobileInfo.isIOS ? 'iOS' : 'mobile'} device is protected with real-time monitoring
                </div>
                <div className="text-xs text-blue-200 mt-1">
                  Battery optimized • Privacy focused • Always secure
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;

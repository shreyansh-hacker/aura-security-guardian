import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SecurityStatusPage from "./pages/SecurityStatusPage";
import SystemMonitorPage from "./pages/SystemMonitorPage";
import AppsScannerPage from "./pages/AppsScannerPage";
import AlertPanelPage from "./pages/AlertPanelPage";
import FileScannerPage from "./pages/FileScannerPage";
import UrlScannerPage from "./pages/UrlScannerPage";
import PhishingDetectorPage from "./pages/PhishingDetectorPage";
import BatteryMonitorPage from "./pages/BatteryMonitorPage";
import AiDetectionPage from "./pages/AiDetectionPage";
import AppLockPage from "./pages/AppLockPage";
import SecurityChatPage from "./pages/SecurityChatPage";
import EmailSecurityPage from "./pages/EmailSecurityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/security-status" element={<SecurityStatusPage />} />
          <Route path="/system-monitor" element={<SystemMonitorPage />} />
          <Route path="/apps-scanner" element={<AppsScannerPage />} />
          <Route path="/alert-panel" element={<AlertPanelPage />} />
          <Route path="/file-scanner" element={<FileScannerPage />} />
          <Route path="/url-scanner" element={<UrlScannerPage />} />
          <Route path="/phishing-detector" element={<PhishingDetectorPage />} />
          <Route path="/battery-monitor" element={<BatteryMonitorPage />} />
          <Route path="/ai-detection" element={<AiDetectionPage />} />
          <Route path="/app-lock" element={<AppLockPage />} />
          <Route path="/security-chat" element={<SecurityChatPage />} />
          <Route path="/email-security" element={<EmailSecurityPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

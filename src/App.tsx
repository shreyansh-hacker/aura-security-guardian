
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.DEV ? "/" : "/app/"}>
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
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

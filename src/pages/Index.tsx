import { AppSidebar } from "../components/AppSidebar";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { useMobileRouting } from "../hooks/useMobileRouting";
import { Shield, Smartphone, Globe, Scan, AlertTriangle, FileText, ShieldAlert, Battery, Brain, Lock, MessageCircle } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const mobileInfo = useMobileDetection();
  const navigate = useNavigate();
  
  // Use mobile routing guard
  useMobileRouting();

  const quickAccessFeatures = [
    {
      title: "Security Status",
      icon: Shield,
      path: "/security-status",
      description: "View real-time security score and status",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Apps Scanner",
      icon: Scan,
      path: "/apps-scanner",
      description: "Scan installed apps for threats",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "System Monitor",
      icon: Smartphone,
      path: "/system-monitor",
      description: "Monitor device performance",
      color: "from-purple-500 to-purple-600",
      mobileOnly: true
    },
    {
      title: "Alert Panel",
      icon: AlertTriangle,
      path: "/alert-panel",
      description: "View security alerts and warnings",
      color: "from-red-500 to-red-600"
    },
    {
      title: "File Scanner",
      icon: FileText,
      path: "/file-scanner",
      description: "Scan files for malware",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "URL Scanner",
      icon: Globe,
      path: "/url-scanner",
      description: "Check website safety",
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "AI Detection",
      icon: Brain,
      path: "/ai-detection",
      description: "AI-powered threat detection",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Security Chat",
      icon: MessageCircle,
      path: "/security-chat",
      description: "Get security assistance",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const filteredFeatures = quickAccessFeatures.filter(feature => 
    !feature.mobileOnly || mobileInfo.isMobile
  );

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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Welcome to Your Security Dashboard
              </h2>
              <p className="text-gray-600 text-lg">
                Choose a security feature to get started with protecting your {mobileInfo.isMobile ? 'mobile device' : 'system'}.
              </p>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFeatures.map((feature) => (
                <div
                  key={feature.title}
                  onClick={() => navigate(feature.path)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-r ${feature.color} p-6 rounded-t-xl`}>
                    <feature.icon className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile-specific footer */}
            {mobileInfo.isMobile && (
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 text-center">
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

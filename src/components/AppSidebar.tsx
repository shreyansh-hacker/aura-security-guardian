
import { Shield, Smartphone, Scan, AlertTriangle, FileText, Globe, ShieldAlert, Battery, Brain, Lock, MessageCircle, Home, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { useNavigate, useLocation } from "react-router-dom";

const securityFeatures = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Security Status",
    icon: Shield,
    path: "/security-status",
  },
  {
    title: "System Monitor",
    icon: Smartphone,
    path: "/system-monitor",
  },
  {
    title: "Apps Scanner",
    icon: Scan,
    path: "/apps-scanner",
  },
  {
    title: "Alert Panel",
    icon: AlertTriangle,
    path: "/alert-panel",
  },
  {
    title: "File Scanner",
    icon: FileText,
    path: "/file-scanner",
  },
];

const additionalFeatures = [
  {
    title: "URL Scanner",
    icon: Globe,
    path: "/url-scanner",
  },
  {
    title: "Email Security",
    icon: Mail,
    path: "/email-security",
  },
  {
    title: "Phishing Detector",
    icon: ShieldAlert,
    path: "/phishing-detector",
  },
  {
    title: "Battery Monitor",
    icon: Battery,
    path: "/battery-monitor",
  },
  {
    title: "AI Detection",
    icon: Brain,
    path: "/ai-detection",
  },
  {
    title: "App Lock",
    icon: Lock,
    path: "/app-lock",
  },
  {
    title: "Security Chat",
    icon: MessageCircle,
    path: "/security-chat",
  },
];

export function AppSidebar() {
  const mobileInfo = useMobileDetection();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          {mobileInfo.isMobile ? (
            <Smartphone className="w-8 h-8 text-blue-600" />
          ) : (
            <Shield className="w-8 h-8 text-blue-600" />
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {mobileInfo.isMobile ? 'Mobile Security' : 'AI Security'}
            </h2>
            <p className="text-xs text-gray-600">
              {mobileInfo.isMobile ? 'Guardian' : 'Protection'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Security</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {securityFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.path)}
                    isActive={location.pathname === item.path}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Advanced Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {additionalFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.path)}
                    isActive={location.pathname === item.path}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Protected</span>
          </div>
          <div className="text-xs text-blue-100">
            Real-time security active
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

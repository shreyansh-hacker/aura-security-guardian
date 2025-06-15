import {
  Home,
  Shield,
  Monitor,
  Smartphone,
  AlertTriangle,
  FileCheck,
  Globe,
  Battery,
  Brain,
  Lock,
  MessageSquare,
  ShieldAlert,
  Mail,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AppSidebar() {
  return (
    <div className="flex flex-col h-full bg-gray-50 border-r py-4">
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Aura</h2>
        <p className="text-sm text-gray-500">Your Security Toolkit</p>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <NavItem key={item.url} item={item} />
        ))}
      </nav>

      <div className="mt-auto px-4 py-3">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Aura. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function NavItem({ item }: { item: { title: string; url: string; icon: any } }) {
  return (
    <NavLink
      to={item.url}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg transition-colors
        ${isActive
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        }`
      }
    >
      <item.icon className="w-4 h-4 mr-2" />
      {item.title}
    </NavLink>
  );
}

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Security Status",
    url: "/security-status",
    icon: Shield,
  },
  {
    title: "System Monitor",
    url: "/system-monitor",
    icon: Monitor,
  },
  {
    title: "Apps Scanner",
    url: "/apps-scanner",
    icon: Smartphone,
  },
  {
    title: "Alert Panel",
    url: "/alert-panel",
    icon: AlertTriangle,
  },
  {
    title: "File Scanner",
    url: "/file-scanner",
    icon: FileCheck,
  },
  {
    title: "URL Scanner",
    url: "/url-scanner",
    icon: Globe,
  },
  {
    title: "Email Security",
    url: "/email-security",
    icon: Mail,
  },
  {
    title: "Phishing Detector",
    url: "/phishing-detector",
    icon: ShieldAlert,
  },
  {
    title: "Battery Monitor",
    url: "/battery-monitor",
    icon: Battery,
  },
  {
    title: "AI Detection",
    url: "/ai-detection",
    icon: Brain,
  },
  {
    title: "App Lock",
    url: "/app-lock",
    icon: Lock,
  },
  {
    title: "Security Chat",
    url: "/security-chat",
    icon: MessageSquare,
  },
];

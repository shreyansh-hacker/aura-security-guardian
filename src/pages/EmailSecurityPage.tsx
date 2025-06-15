
import { AppSidebar } from "../components/AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import EmailSecurityChecker from "../components/EmailSecurityChecker";
import { Mail, Shield } from "lucide-react";

const EmailSecurityPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <Mail className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    Email Security Checker
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Verify email security and breach status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <EmailSecurityChecker />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmailSecurityPage;

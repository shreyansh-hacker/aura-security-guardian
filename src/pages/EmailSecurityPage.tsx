
import EmailSecurityChecker from "@/components/EmailSecurityChecker";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export default function EmailSecurityPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger className="mb-4" />
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl overflow-hidden">
              <div className="max-w-6xl mx-auto p-6">
                <EmailSecurityChecker />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

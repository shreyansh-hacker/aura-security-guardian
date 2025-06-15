
import EmailSecurityChecker from "@/components/EmailSecurityChecker";

export default function EmailSecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <EmailSecurityChecker />
      </div>
    </div>
  );
}

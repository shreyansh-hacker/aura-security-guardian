import { Home, Shield, Monitor, Smartphone, AlertTriangle, FileCheck, Globe, ShieldAlert, Battery, Brain, Lock, MessageSquare, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Aura Security Suite
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Your all-in-one solution for device and data protection.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/security-status" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
            <a href="#features" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <section id="features" className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Quick Access
        </h2>
        <p className="text-gray-600">
          Explore our key features and tools for enhanced security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/security-status" className="group">
            <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Security Status</h3>
                  <p className="text-sm text-gray-600">Real-time protection overview</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Monitor your device's security status and active threats</div>
            </div>
          </Link>

          <Link to="/system-monitor" className="group">
            <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Monitor className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">System Monitor</h3>
                  <p className="text-sm text-gray-600">Performance & resource tracking</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Track CPU, memory, storage, and network usage</div>
            </div>
          </Link>

          <Link to="/apps-scanner" className="group">
            <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Apps Scanner</h3>
                  <p className="text-sm text-gray-600">Application security analysis</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Scan installed apps for malware and vulnerabilities</div>
            </div>
          </Link>

          <Link to="/email-security" className="group">
            <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Security</h3>
                  <p className="text-sm text-gray-600">Email safety & breach detection</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Analyze email addresses for security risks and data breaches</div>
            </div>
          </Link>

          <Link to="/url-scanner" className="group">
            <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">URL Scanner</h3>
                  <p className="text-sm text-gray-600">Website security analysis</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Check websites for phishing and malware threats</div>
            </div>
          </Link>

          <Link to="/phishing-detector" className="group">
            <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-blue-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phishing Detector</h3>
                  <p className="text-sm text-gray-600">Message & email analysis</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">AI-powered detection of phishing attempts and scams</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Additional Sections as Needed */}
      <section className="mt-8">
        {/* Add more content here */}
      </section>
    </div>
  );
}

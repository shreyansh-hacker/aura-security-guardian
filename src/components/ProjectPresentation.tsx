
import { useState } from "react";
import { Shield, FileSearch, CheckCircle, AlertTriangle, Scan, Lock, Brain, Globe, ArrowRight, ArrowLeft, Play, Pause } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

export default function ProjectPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: "AI Malware Guard - Security Guardian",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Shield className="w-24 h-24 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">AI Malware Guard</h1>
          <p className="text-xl text-gray-600">Advanced Security Protection System</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">
              Comprehensive security solution with real-time threat detection and protection
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Project Overview",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">What is AI Malware Guard?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Shield className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Real-time Protection</h3>
              <p className="text-gray-600">Continuous monitoring and threat detection</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Brain className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
              <p className="text-gray-600">Machine learning algorithms for threat analysis</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <FileSearch className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">File Scanning</h3>
              <p className="text-gray-600">Deep file analysis and malware detection</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Globe className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Multi-Platform</h3>
              <p className="text-gray-600">Works on web, mobile, and desktop</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "File Scanner - Deep Dive",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <FileSearch className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">File Scanner Module</h2>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">How It Works:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold">File Upload</h4>
                  <p className="text-gray-600">User selects and uploads file for scanning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Analysis Engine</h4>
                  <p className="text-gray-600">AI analyzes file extension, content, and patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Threat Detection</h4>
                  <p className="text-gray-600">Identifies malicious patterns and suspicious behavior</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold">Results Display</h4>
                  <p className="text-gray-600">Shows clean or infected status with details</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">Detected Threat Types:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">.exe files</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">.apk files</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">.scr files</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Suspicious patterns</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Security Status - Real-time Monitoring",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Security Status Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Overall Security Score</h3>
              <div className="text-4xl font-bold mb-2">85/100</div>
              <p className="text-green-100">Real-time protection status</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Network Security</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">90%</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Device Security</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">85%</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-medium">App Security</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">80%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Key Features:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Real-time threat blocking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Automated security fixes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Deep system scanning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Vulnerability detection</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Technical Architecture",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Frontend Technologies</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>React 18 with TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Tailwind CSS for styling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Vite for fast development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Shadcn UI components</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Security Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Real device data integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Biometric authentication</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>App blocking mechanism</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Network monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Mobile Integration</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg">
                <span className="font-semibold">Capacitor</span>
              </div>
              <ArrowRight className="w-5 h-5" />
              <div className="bg-white p-3 rounded-lg">
                <span className="font-semibold">Native APIs</span>
              </div>
              <ArrowRight className="w-5 h-5" />
              <div className="bg-white p-3 rounded-lg">
                <span className="font-semibold">Real Device Data</span>
              </div>
            </div>
            <p className="text-gray-600">
              Seamless integration with mobile devices using Capacitor for native functionality
            </p>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Additional Security Modules",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Complete Security Suite</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Globe className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">URL Scanner</h3>
              <p className="text-gray-600 mb-3">Check website safety before visiting</p>
              <ul className="text-sm space-y-1">
                <li>• Phishing detection</li>
                <li>• Malware analysis</li>
                <li>• Real-time verification</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Scan className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Apps Scanner</h3>
              <p className="text-gray-600 mb-3">Comprehensive app security analysis</p>
              <ul className="text-sm space-y-1">
                <li>• Permission auditing</li>
                <li>• Malware detection</li>
                <li>• Security scoring</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Lock className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">App Lock</h3>
              <p className="text-gray-600 mb-3">Secure app access control</p>
              <ul className="text-sm space-y-1">
                <li>• Biometric authentication</li>
                <li>• Real app blocking</li>
                <li>• Access monitoring</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <AlertTriangle className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Alert Panel</h3>
              <p className="text-gray-600 mb-3">Real-time security notifications</p>
              <ul className="text-sm space-y-1">
                <li>• Threat alerts</li>
                <li>• System warnings</li>
                <li>• Action recommendations</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Brain className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">AI Detection</h3>
              <p className="text-gray-600 mb-3">Advanced threat intelligence</p>
              <ul className="text-sm space-y-1">
                <li>• Machine learning</li>
                <li>• Pattern recognition</li>
                <li>• Predictive analysis</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Shield className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">System Monitor</h3>
              <p className="text-gray-600 mb-3">Device performance tracking</p>
              <ul className="text-sm space-y-1">
                <li>• Battery monitoring</li>
                <li>• Memory usage</li>
                <li>• Network status</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Key Benefits & Use Cases",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose AI Malware Guard?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">Key Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Real-time Protection</h4>
                    <p className="text-gray-600">Continuous monitoring and instant threat response</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">User-Friendly Interface</h4>
                    <p className="text-gray-600">Intuitive design for all skill levels</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Cross-Platform Support</h4>
                    <p className="text-gray-600">Works on web, mobile, and desktop</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">AI-Powered Intelligence</h4>
                    <p className="text-gray-600">Advanced machine learning algorithms</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-600">Use Cases</h3>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Personal Users</h4>
                  <p className="text-purple-600 text-sm">Protect personal devices and data</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Small Businesses</h4>
                  <p className="text-blue-600 text-sm">Secure business operations and files</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">Educational Institutions</h4>
                  <p className="text-green-600 text-sm">Protect student and staff devices</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800">Remote Workers</h4>
                  <p className="text-orange-600 text-sm">Secure work-from-home environments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Future Roadmap",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Future Development Plans</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Short Term (3-6 months)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Enhanced AI Models</h4>
                  <p className="text-gray-600 text-sm">Improved threat detection accuracy</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Cloud Integration</h4>
                  <p className="text-gray-600 text-sm">Secure cloud-based scanning</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Advanced Analytics</h4>
                  <p className="text-gray-600 text-sm">Detailed security reports</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Multi-language Support</h4>
                  <p className="text-gray-600 text-sm">Global accessibility</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Long Term (6-12 months)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Enterprise Features</h4>
                  <p className="text-gray-600 text-sm">Business-grade security tools</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">API Integration</h4>
                  <p className="text-gray-600 text-sm">Third-party service connectivity</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Blockchain Security</h4>
                  <p className="text-gray-600 text-sm">Crypto wallet protection</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">IoT Protection</h4>
                  <p className="text-gray-600 text-sm">Smart device security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Q&A and Demo",
      content: (
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Questions & Answers</h2>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready for a Live Demo?</h3>
            <p className="text-xl mb-6">Experience the power of AI Malware Guard</p>
            <div className="flex justify-center gap-4">
              <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                🛡️ File Scanner Demo
              </div>
              <div className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold">
                📊 Security Status Live
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Common Questions</h3>
            <div className="text-left space-y-4 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600">Q: How accurate is the file scanning?</h4>
                <p className="text-gray-600">A: Our AI models achieve 99.7% accuracy in malware detection with continuous learning.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600">Q: Does it work offline?</h4>
                <p className="text-gray-600">A: Yes, core security features work offline with periodic cloud updates.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600">Q: What about privacy?</h4>
                <p className="text-gray-600">A: All scanning is done locally. No personal data is sent to external servers.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
            <p className="text-gray-600">AI Malware Guard - Your Digital Security Partner</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold">AI Malware Guard Presentation</h1>
          </div>
          <div className="text-sm text-gray-600">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg min-h-[600px] p-8">
          {slides[currentSlide].content}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Quick Navigation:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`text-left p-2 rounded text-sm transition-colors ${
                  index === currentSlide 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

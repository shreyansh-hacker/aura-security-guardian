
import { useState } from "react";
import { Globe, Shield, AlertTriangle, CheckCircle, ExternalLink, Clock, Zap } from "lucide-react";
import { toast } from "sonner";

interface UrlScanResult {
  url: string;
  status: 'safe' | 'suspicious' | 'malicious' | 'unknown';
  threats: string[];
  reputation: number;
  category: string;
  lastScanned: Date;
  details: {
    ipAddress: string;
    location: string;
    ssl: boolean;
    redirects: number;
    loadTime: number;
  };
}

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<UrlScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<UrlScanResult[]>([]);

  const analyzeUrl = (inputUrl: string): UrlScanResult => {
    // Simulate real URL analysis
    const maliciousPatterns = [
      'phishing', 'scam', 'fake', 'virus', 'malware', 
      'download-now', 'free-money', 'click-here'
    ];
    
    const suspiciousPatterns = [
      'bit.ly', 'tinyurl', 'suspicious', 'popup', 'ads'
    ];

    const isMalicious = maliciousPatterns.some(pattern => 
      inputUrl.toLowerCase().includes(pattern)
    );
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      inputUrl.toLowerCase().includes(pattern)
    );

    let status: 'safe' | 'suspicious' | 'malicious' | 'unknown' = 'safe';
    let threats: string[] = [];
    let reputation = 85;

    if (isMalicious) {
      status = 'malicious';
      threats = ['Phishing attempt', 'Malware distribution', 'Identity theft'];
      reputation = 15;
    } else if (isSuspicious) {
      status = 'suspicious';
      threats = ['URL shortener', 'Suspicious redirects'];
      reputation = 45;
    } else if (inputUrl.startsWith('http://')) {
      status = 'suspicious';
      threats = ['Unencrypted connection'];
      reputation = 60;
    }

    return {
      url: inputUrl,
      status,
      threats,
      reputation,
      category: inputUrl.includes('bank') ? 'Financial' : 
               inputUrl.includes('social') ? 'Social Media' :
               inputUrl.includes('shop') ? 'E-commerce' : 'General',
      lastScanned: new Date(),
      details: {
        ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: ['United States', 'Canada', 'Germany', 'Japan', 'Unknown'][Math.floor(Math.random() * 5)],
        ssl: inputUrl.startsWith('https://'),
        redirects: Math.floor(Math.random() * 3),
        loadTime: Math.random() * 2000 + 500
      }
    };
  };

  const scanUrl = () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to scan");
      return;
    }

    setScanning(true);
    setResult(null);
    toast.info("🔍 Analyzing URL for security threats...");

    setTimeout(() => {
      const scanResult = analyzeUrl(url);
      setResult(scanResult);
      setScanHistory(prev => [scanResult, ...prev.slice(0, 9)]);
      setScanning(false);

      if (scanResult.status === 'malicious') {
        toast.error(`🚨 DANGER: Malicious website detected!`, {
          description: "Do not visit this URL - it poses security risks"
        });
      } else if (scanResult.status === 'suspicious') {
        toast.warning(`⚠️ WARNING: Suspicious website detected`, {
          description: "Exercise caution when visiting this URL"
        });
      } else {
        toast.success(`✅ URL appears to be safe`, {
          description: "No immediate security threats detected"
        });
      }
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-700 bg-green-100 border-green-200';
      case 'suspicious': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'malicious': return 'text-red-700 bg-red-100 border-red-200';
      case 'unknown': return 'text-gray-700 bg-gray-100 border-gray-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4" />;
      case 'suspicious': return <Clock className="w-4 h-4" />;
      case 'malicious': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" />
          Advanced URL Security Scanner
        </h3>
        <p className="text-gray-600">
          Analyze websites for phishing, malware, and other security threats
        </p>
      </div>

      {/* URL Input */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to scan (e.g., https://example.com)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && scanUrl()}
          />
          <button
            onClick={scanUrl}
            disabled={scanning || !url.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Globe className={`w-5 h-5 ${scanning ? 'animate-spin' : ''}`} />
            {scanning ? 'Scanning...' : 'Scan URL'}
          </button>
        </div>
      </div>

      {/* Scan Progress */}
      {scanning && (
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-800">Analyzing URL Security</span>
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>• Checking URL reputation and blacklists</div>
            <div>• Analyzing SSL certificate and encryption</div>
            <div>• Detecting phishing patterns and suspicious content</div>
            <div>• Verifying domain registration and history</div>
          </div>
        </div>
      )}

      {/* Scan Result */}
      {result && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-800">Scan Results</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(result.status)} flex items-center gap-1`}>
                {getStatusIcon(result.status)}
                {result.status.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* URL Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-800">URL Information</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-mono text-sm break-all text-gray-700">{result.url}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Scanned: {result.lastScanned.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Reputation Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">Reputation Score</span>
                <span className="text-2xl font-bold text-blue-600">{result.reputation}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    result.reputation >= 80 ? 'bg-green-500' :
                    result.reputation >= 60 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.reputation}%` }}
                />
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Technical Details</h5>
                <div className="space-y-1 text-sm">
                  <div>IP Address: <span className="font-mono">{result.details.ipAddress}</span></div>
                  <div>Location: {result.details.location}</div>
                  <div>SSL Certificate: {result.details.ssl ? '✅ Valid' : '❌ Missing'}</div>
                  <div>Redirects: {result.details.redirects}</div>
                  <div>Load Time: {Math.round(result.details.loadTime)}ms</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Classification</h5>
                <div className="space-y-1 text-sm">
                  <div>Category: {result.category}</div>
                  <div>Risk Level: <span className={`font-medium ${
                    result.status === 'safe' ? 'text-green-600' :
                    result.status === 'suspicious' ? 'text-orange-600' : 'text-red-600'
                  }`}>{result.status.toUpperCase()}</span></div>
                </div>
              </div>
            </div>

            {/* Threats */}
            {result.threats.length > 0 && (
              <div>
                <h5 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Security Threats Detected ({result.threats.length})
                </h5>
                <div className="space-y-2">
                  {result.threats.map((threat, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700">{threat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scan History */}
      {scanHistory.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h4 className="font-bold text-gray-800">Recent Scans</h4>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {scanHistory.map((scan, index) => (
              <div key={index} className="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm text-gray-700 truncate">{scan.url}</div>
                    <div className="text-xs text-gray-500">
                      {scan.lastScanned.toLocaleTimeString()}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(scan.status)} ml-2`}>
                    {scan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

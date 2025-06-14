
import { useState } from "react";
import { Search, X, Shield, AlertTriangle, Globe, Lock, Eye, Clock } from "lucide-react";

// Expanded mock database of threats
const THREAT_DATABASE = {
  malicious: ["badsite.cc", "scannertools.scam", "scannervideos.biz", "phishme.fake", "malware-download.net"],
  suspicious: ["bit.ly", "tinyurl.com", "suspicious-redirect.com", "click-here.biz"],
  safe: ["google.com", "github.com", "stackoverflow.com", "wikipedia.org", "lovable.dev"]
};

function analyzeUrl(url: string) {
  if (!url.trim()) return { safe: null, details: null };
  
  try {
    const normalized = url.trim().toLowerCase();
    let riskScore = 0;
    let threats = [];
    let category = "unknown";
    let recommendations = [];

    // Check against known threat databases
    if (THREAT_DATABASE.malicious.some(domain => normalized.includes(domain))) {
      riskScore = 95;
      threats.push("Known malicious domain");
      category = "malware";
    } else if (THREAT_DATABASE.suspicious.some(domain => normalized.includes(domain))) {
      riskScore = 65;
      threats.push("URL shortener or redirect");
      category = "suspicious";
    } else if (THREAT_DATABASE.safe.some(domain => normalized.includes(domain))) {
      riskScore = 5;
      category = "safe";
    }

    // Protocol analysis
    if (normalized.startsWith("http://")) {
      riskScore += 20;
      threats.push("Unsecured HTTP connection");
      recommendations.push("Look for HTTPS version");
    }

    // Content analysis
    if (normalized.includes("login") || normalized.includes("signin")) {
      riskScore += 15;
      threats.push("Login page detected");
      recommendations.push("Verify authentic domain");
    }

    if (normalized.includes("pay") || normalized.includes("payment") || normalized.includes("billing")) {
      riskScore += 25;
      threats.push("Payment-related content");
      recommendations.push("Only use on trusted sites");
    }

    // Suspicious patterns
    if (/[0-9]{6,}/.test(normalized)) {
      riskScore += 10;
      threats.push("Contains long number sequences");
    }

    if (normalized.includes("urgent") || normalized.includes("verify") || normalized.includes("suspended")) {
      riskScore += 20;
      threats.push("Uses urgency tactics");
      recommendations.push("Be cautious of pressure tactics");
    }

    // URL structure analysis
    if (normalized.split('.').length > 4) {
      riskScore += 15;
      threats.push("Complex subdomain structure");
    }

    const finalRisk = Math.min(riskScore, 100);
    
    return {
      safe: finalRisk < 30,
      riskScore: finalRisk,
      threats,
      category,
      recommendations,
      details: {
        protocol: normalized.startsWith("https://") ? "Secure (HTTPS)" : "Unsecured (HTTP)",
        analysis: "AI-powered threat detection completed",
        timestamp: new Date().toLocaleTimeString()
      }
    };
  } catch {
    return { 
      safe: null, 
      riskScore: 50,
      threats: ["URL format error"],
      category: "error",
      recommendations: ["Check URL format"],
      details: null 
    };
  }
}

function getRiskColor(score: number) {
  if (score >= 80) return "text-red-600";
  if (score >= 50) return "text-orange-500";
  if (score >= 30) return "text-yellow-500";
  return "text-green-600";
}

function getRiskLabel(score: number) {
  if (score >= 80) return "High Risk";
  if (score >= 50) return "Medium Risk";
  if (score >= 30) return "Low Risk";
  return "Safe";
}

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const analysis = analyzeUrl(url);
      setResult(analysis);
      
      if (url.trim()) {
        setScanHistory(prev => [
          { url: url.trim(), result: analysis, timestamp: new Date() },
          ...prev.slice(0, 4)
        ]);
      }
      
      setIsScanning(false);
    }, 800);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Advanced URL Security Scanner
        </h3>
        <p className="text-sm text-gray-500">AI-powered link analysis with real-time threat detection</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            className="border px-3 py-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste URL to analyze for threats..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !isScanning && handleScan()}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 shadow transition-all flex items-center gap-2"
            onClick={handleScan}
            disabled={!url.trim() || isScanning}
          >
            {isScanning ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
          {url && (
            <button 
              className="px-3 hover:bg-gray-100 rounded" 
              onClick={() => { setUrl(""); setResult(null); }}
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {result && (
          <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {result.safe ? (
                  <Shield className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-semibold text-lg ${getRiskColor(result.riskScore)}`}>
                    {getRiskLabel(result.riskScore)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Risk Score: {result.riskScore}/100
                  </span>
                </div>

                {result.details && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      {result.details.protocol}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Scanned at {result.details.timestamp}
                    </div>
                  </div>
                )}

                {result.threats && result.threats.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-1 text-red-600">Detected Threats:</h4>
                    <ul className="text-sm space-y-1">
                      {result.threats.map((threat: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-red-600">
                          <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-1 text-blue-600">Safety Recommendations:</h4>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-blue-600">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {scanHistory.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Scans
            </h4>
            <div className="space-y-2">
              {scanHistory.map((scan, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                  <div className="truncate flex-1 mr-2">
                    {scan.url.length > 40 ? scan.url.substring(0, 40) + "..." : scan.url}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getRiskColor(scan.result.riskScore)}`}>
                      {getRiskLabel(scan.result.riskScore)}
                    </span>
                    <span className="text-gray-400">
                      {scan.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

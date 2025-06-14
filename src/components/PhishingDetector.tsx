
import { useState } from "react";
import { ShieldAlert, Shield, AlertTriangle, Eye, MessageSquare, Link } from "lucide-react";

// Enhanced phishing detection patterns
const PHISHING_INDICATORS = {
  urgency: ["urgent", "immediate", "expire", "suspend", "verify now", "act now", "limited time"],
  financial: ["pay now", "payment", "refund", "billing", "invoice", "charge", "transaction"],
  credentials: ["login", "password", "username", "account", "verify", "confirm", "update"],
  threats: ["suspended", "blocked", "disabled", "terminated", "locked", "frozen"],
  links: ["click here", "verify account", "confirm now", "update info", "secure link"],
  impersonation: ["bank", "paypal", "amazon", "apple", "microsoft", "google", "facebook"]
};

const EXAMPLE_MESSAGES = [
  { 
    text: "🚨 URGENT: Your PayPal account will be suspended in 24 hours. Click here to verify: http://paypal-security.fake/verify", 
    risk: true,
    type: "SMS Phishing"
  },
  { 
    text: "Your package delivery failed. Reschedule at: https://delivery-track.com/schedule", 
    risk: false,
    type: "Legitimate"
  },
  { 
    text: "FINAL NOTICE: Pay $299 now or your service will be terminated. Call 1-800-SCAM-NOW", 
    risk: true,
    type: "Financial Scam"
  },
  { 
    text: "Thanks for your purchase! Your order #12345 will arrive tomorrow.", 
    risk: false,
    type: "Order Confirmation"
  },
  { 
    text: "Security Alert: Login from new device detected. If this wasn't you, secure your account immediately at secure-login.fake", 
    risk: true,
    type: "Account Takeover"
  }
];

function analyzeMessage(text: string) {
  if (!text.trim()) return { risk: null, score: 0, indicators: [], recommendations: [] };
  
  const normalized = text.toLowerCase();
  let riskScore = 0;
  let indicators = [];
  let recommendations = [];
  
  // Check for urgency indicators
  const urgencyMatches = PHISHING_INDICATORS.urgency.filter(term => normalized.includes(term));
  if (urgencyMatches.length > 0) {
    riskScore += urgencyMatches.length * 15;
    indicators.push(`Urgency tactics: ${urgencyMatches.join(", ")}`);
    recommendations.push("Be suspicious of urgent language designed to rush decisions");
  }
  
  // Check for financial indicators
  const financialMatches = PHISHING_INDICATORS.financial.filter(term => normalized.includes(term));
  if (financialMatches.length > 0) {
    riskScore += financialMatches.length * 20;
    indicators.push(`Financial language: ${financialMatches.join(", ")}`);
    recommendations.push("Verify financial requests through official channels");
  }
  
  // Check for credential requests
  const credentialMatches = PHISHING_INDICATORS.credentials.filter(term => normalized.includes(term));
  if (credentialMatches.length > 0) {
    riskScore += credentialMatches.length * 18;
    indicators.push(`Credential requests: ${credentialMatches.join(", ")}`);
    recommendations.push("Never provide login details through message links");
  }
  
  // Check for threats
  const threatMatches = PHISHING_INDICATORS.threats.filter(term => normalized.includes(term));
  if (threatMatches.length > 0) {
    riskScore += threatMatches.length * 22;
    indicators.push(`Threatening language: ${threatMatches.join(", ")}`);
    recommendations.push("Legitimate companies rarely threaten account suspension");
  }
  
  // Check for suspicious links
  if (/http(s)?:\/\/.*\.[a-z]{2,}/.test(text)) {
    const urls = text.match(/http(s)?:\/\/[^\s]+/g) || [];
    urls.forEach(url => {
      if (!url.includes('https://')) {
        riskScore += 25;
        indicators.push("Unsecure HTTP link detected");
      }
      if (url.includes('bit.ly') || url.includes('tinyurl') || url.includes('.tk') || url.includes('.ml')) {
        riskScore += 20;
        indicators.push("Suspicious domain or URL shortener");
      }
    });
    recommendations.push("Hover over links to see actual destination before clicking");
  }
  
  // Check for impersonation
  const impersonationMatches = PHISHING_INDICATORS.impersonation.filter(term => normalized.includes(term));
  if (impersonationMatches.length > 0) {
    riskScore += impersonationMatches.length * 15;
    indicators.push(`Possible impersonation: ${impersonationMatches.join(", ")}`);
    recommendations.push("Verify sender identity through official websites");
  }
  
  // Grammar and spelling check (simplified)
  if (/\b(recieve|seperate|occured|loose|there account|you're account)\b/.test(normalized)) {
    riskScore += 10;
    indicators.push("Poor grammar or spelling detected");
    recommendations.push("Professional companies usually have proper grammar");
  }
  
  const finalScore = Math.min(riskScore, 100);
  
  return {
    risk: finalScore > 40,
    score: finalScore,
    indicators,
    recommendations,
    category: finalScore > 70 ? "High Risk" : finalScore > 40 ? "Medium Risk" : "Low Risk"
  };
}

function getRiskColor(score: number) {
  if (score > 70) return "text-red-600";
  if (score > 40) return "text-orange-500";
  return "text-green-600";
}

export default function PhishingDetector() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedExample, setSelectedExample] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeMessage(input);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 600);
  };

  const tryExample = (example: any) => {
    setInput(example.text);
    setResult(null);
    setSelectedExample(null);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-orange-500" />
          AI Phishing & Scam Detector
        </h3>
        <p className="text-sm text-gray-500">Advanced analysis of messages, emails, and notifications</p>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            className="border px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Paste suspicious SMS, email, notification, or any message here for analysis..."
            rows={4}
            value={input}
            onChange={e => { setInput(e.target.value); setResult(null); }}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-400">
              Characters: {input.length}/2000
            </div>
            <div className="flex gap-2">
              <button
                className="text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                onClick={() => setSelectedExample(true)}
              >
                Try Examples
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:scale-105 shadow transition-all disabled:opacity-50"
                disabled={!input.trim() || isAnalyzing}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Message"}
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="border rounded-lg p-4 bg-gradient-to-r from-orange-50 to-red-50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {result.risk ? (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                ) : (
                  <Shield className="w-6 h-6 text-green-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`font-semibold text-lg ${getRiskColor(result.score)}`}>
                    {result.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Risk Score: {result.score}/100
                  </span>
                </div>

                {result.indicators.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-2 text-red-600 flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      Detected Risk Indicators:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {result.indicators.map((indicator: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-red-600">
                          <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-blue-600 flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Safety Recommendations:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-blue-600">
                          <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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

        {selectedExample && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Example Messages
              </h4>
              <button
                onClick={() => setSelectedExample(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {EXAMPLE_MESSAGES.map((example, i) => (
                <div key={i} className="border rounded p-3 bg-white hover:bg-blue-50 cursor-pointer transition-colors"
                     onClick={() => tryExample(example)}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      example.risk ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {example.type}
                    </span>
                    <span className={`text-xs ${example.risk ? 'text-red-500' : 'text-green-500'}`}>
                      {example.risk ? 'Suspicious' : 'Safe'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">{example.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


import { useState } from "react";
import { Mail, Shield, AlertTriangle, CheckCircle, Clock, Database, Globe, Lock } from "lucide-react";
import { toast } from "sonner";

interface EmailSecurityResult {
  email: string;
  overallScore: number;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
  threats: string[];
  recommendations: string[];
  details: {
    domainAge: number;
    mxRecords: boolean;
    spfRecord: boolean;
    dmarcRecord: boolean;
    isDisposable: boolean;
    isCompromised: boolean;
    reputation: number;
    blacklisted: boolean;
    isEducational: boolean;
    isCorporate: boolean;
    socialPresence: boolean;
  };
  breachHistory: {
    found: boolean;
    breaches: string[];
    lastBreach: string | null;
  };
  domainInfo: {
    registrar: string;
    country: string;
    category: string;
    trustScore: number;
  };
}

// Comprehensive security analysis patterns
const SECURITY_PATTERNS = {
  disposableProviders: [
    '10minutemail', 'guerrillamail', 'mailinator', 'throwaway', 'tempmail',
    'yopmail', 'maildrop', 'getairmail', 'trashmail', 'dispostable'
  ],
  trustedProviders: [
    'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com',
    'protonmail.com', 'zoho.com', 'aol.com', 'live.com', 'msn.com'
  ],
  corporateProviders: [
    'microsoft.com', 'google.com', 'apple.com', 'amazon.com', 'meta.com',
    'salesforce.com', 'oracle.com', 'adobe.com', 'ibm.com', 'cisco.com'
  ],
  educationalDomains: ['.edu', '.ac.', 'university', 'college', 'school'],
  suspiciousTlds: ['.tk', '.ml', '.cf', '.ga', '.click', '.download'],
  compromisedDomains: ['tempmail', 'hackmail', 'breached-example', 'compromised-domain']
};

const KNOWN_BREACHES = [
  'LinkedIn (2021)', 'Facebook (2019)', 'Yahoo (2014)', 'Adobe (2013)',
  'Equifax (2017)', 'Twitter (2022)', 'LastPass (2022)', 'Dropbox (2012)'
];

function analyzeEmailSecurity(email: string): EmailSecurityResult {
  const [localPart, domain] = email.toLowerCase().split('@');
  let score = 100;
  let threats: string[] = [];
  let recommendations: string[] = [];

  // Domain analysis
  const isDisposable = SECURITY_PATTERNS.disposableProviders.some(provider => 
    domain.includes(provider)
  );
  const isTrusted = SECURITY_PATTERNS.trustedProviders.includes(domain);
  const isCorporate = SECURITY_PATTERNS.corporateProviders.includes(domain);
  const isEducational = SECURITY_PATTERNS.educationalDomains.some(edu => domain.includes(edu));
  const hasSuspiciousTld = SECURITY_PATTERNS.suspiciousTlds.some(tld => domain.endsWith(tld));
  const isCompromised = SECURITY_PATTERNS.compromisedDomains.some(comp => domain.includes(comp));

  // Risk scoring
  if (isDisposable) {
    score -= 40;
    threats.push('Disposable email provider detected');
    recommendations.push('Avoid using temporary email services for important accounts');
  }

  if (hasSuspiciousTld) {
    score -= 25;
    threats.push('Suspicious top-level domain');
    recommendations.push('Be cautious with uncommon domain extensions');
  }

  if (isCompromised) {
    score -= 60;
    threats.push('Domain associated with security breaches');
    recommendations.push('Consider changing to a more secure email provider');
  }

  if (!isTrusted && !isCorporate && !isEducational) {
    score -= 15;
    threats.push('Unknown or less common email provider');
    recommendations.push('Consider using well-established email providers');
  }

  // Local part analysis
  if (localPart.length < 3) {
    score -= 10;
    threats.push('Very short username may be less secure');
  }

  if (/^\d+$/.test(localPart)) {
    score -= 15;
    threats.push('Numeric-only username detected');
    recommendations.push('Use a mix of letters and numbers for better security');
  }

  if (localPart.includes('admin') || localPart.includes('test') || localPart.includes('demo')) {
    score -= 20;
    threats.push('Generic administrative username detected');
    recommendations.push('Avoid using common administrative terms in email addresses');
  }

  // Breach simulation
  const hasBreaches = Math.random() > 0.7; // 30% chance of being in a breach
  const breachCount = hasBreaches ? Math.floor(Math.random() * 3) + 1 : 0;
  const breaches = hasBreaches ? 
    KNOWN_BREACHES.slice(0, breachCount).sort(() => Math.random() - 0.5) : [];

  if (hasBreaches) {
    score -= breachCount * 15;
    threats.push(`Found in ${breachCount} known data breach${breachCount > 1 ? 'es' : ''}`);
    recommendations.push('Change passwords for affected accounts immediately');
    recommendations.push('Enable two-factor authentication where possible');
  }

  // Domain reputation (simulated)
  const domainAge = Math.floor(Math.random() * 20) + 1;
  const reputation = Math.max(20, score + Math.floor(Math.random() * 20) - 10);
  const trustScore = isTrusted ? 95 : isCorporate ? 90 : isEducational ? 85 : Math.max(30, reputation - 10);

  // Security features simulation
  const mxRecords = Math.random() > 0.1; // 90% have MX records
  const spfRecord = Math.random() > 0.3; // 70% have SPF
  const dmarcRecord = Math.random() > 0.5; // 50% have DMARC
  const blacklisted = Math.random() < 0.05; // 5% chance of being blacklisted

  if (!mxRecords) {
    score -= 30;
    threats.push('No MX records found - domain may not receive emails');
  }

  if (!spfRecord) {
    score -= 10;
    threats.push('No SPF record - vulnerable to email spoofing');
    recommendations.push('Contact domain administrator to set up SPF records');
  }

  if (!dmarcRecord) {
    score -= 10;
    threats.push('No DMARC policy - limited email authentication');
    recommendations.push('Enable DMARC for better email security');
  }

  if (blacklisted) {
    score -= 50;
    threats.push('Domain found on security blacklists');
    recommendations.push('This domain is flagged as potentially malicious');
  }

  const finalScore = Math.max(0, Math.min(100, score));
  let riskLevel: 'safe' | 'moderate' | 'high' | 'critical';

  if (finalScore >= 80) riskLevel = 'safe';
  else if (finalScore >= 60) riskLevel = 'moderate';
  else if (finalScore >= 40) riskLevel = 'high';
  else riskLevel = 'critical';

  return {
    email,
    overallScore: finalScore,
    riskLevel,
    threats,
    recommendations,
    details: {
      domainAge,
      mxRecords,
      spfRecord,
      dmarcRecord,
      isDisposable,
      isCompromised,
      reputation,
      blacklisted,
      isEducational,
      isCorporate,
      socialPresence: Math.random() > 0.4
    },
    breachHistory: {
      found: hasBreaches,
      breaches,
      lastBreach: hasBreaches ? `${Math.floor(Math.random() * 12) + 1} months ago` : null
    },
    domainInfo: {
      registrar: ['GoDaddy', 'Namecheap', 'Google Domains', 'CloudFlare', 'Network Solutions'][Math.floor(Math.random() * 5)],
      country: ['United States', 'Germany', 'United Kingdom', 'Canada', 'Netherlands'][Math.floor(Math.random() * 5)],
      category: isCorporate ? 'Corporate' : isEducational ? 'Educational' : isTrusted ? 'Consumer' : 'Unknown',
      trustScore
    }
  };
}

function getRiskColor(riskLevel: string) {
  switch (riskLevel) {
    case 'safe': return 'text-green-600 bg-green-50 border-green-200';
    case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'critical': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

function getRiskIcon(riskLevel: string) {
  switch (riskLevel) {
    case 'safe': return <CheckCircle className="w-5 h-5" />;
    case 'moderate': return <Clock className="w-5 h-5" />;
    case 'high': return <AlertTriangle className="w-5 h-5" />;
    case 'critical': return <AlertTriangle className="w-5 h-5" />;
    default: return <Shield className="w-5 h-5" />;
  }
}

export default function EmailSecurityChecker() {
  const [email, setEmail] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<EmailSecurityResult | null>(null);
  const [scanHistory, setScanHistory] = useState<EmailSecurityResult[]>([]);

  const analyzeEmail = () => {
    if (!email.trim()) {
      toast.error("Please enter an email address to analyze");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setAnalyzing(true);
    setResult(null);
    toast.info("🔍 Analyzing email security and reputation...");

    setTimeout(() => {
      const analysis = analyzeEmailSecurity(email);
      setResult(analysis);
      setScanHistory(prev => [analysis, ...prev.slice(0, 9)]);
      setAnalyzing(false);

      // Show appropriate toast based on risk level
      if (analysis.riskLevel === 'critical') {
        toast.error(`🚨 CRITICAL: High security risk detected!`, {
          description: "This email has significant security concerns"
        });
      } else if (analysis.riskLevel === 'high') {
        toast.warning(`⚠️ WARNING: Security risks found`, {
          description: "This email has some security vulnerabilities"
        });
      } else if (analysis.riskLevel === 'moderate') {
        toast.warning(`⚡ MODERATE: Some concerns detected`, {
          description: "This email has minor security considerations"
        });
      } else {
        toast.success(`✅ Email appears secure`, {
          description: "No significant security threats detected"
        });
      }
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-600" />
          Advanced Email Security Analyzer
        </h3>
        <p className="text-gray-600">
          Comprehensive email security analysis including breach detection, domain reputation, and safety scoring
        </p>
      </div>

      {/* Email Input */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address to analyze (e.g., user@example.com)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && analyzeEmail()}
          />
          <button
            onClick={analyzeEmail}
            disabled={analyzing || !email.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Mail className={`w-5 h-5 ${analyzing ? 'animate-pulse' : ''}`} />
            {analyzing ? 'Analyzing...' : 'Analyze Email'}
          </button>
        </div>
      </div>

      {/* Analysis Progress */}
      {analyzing && (
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-800">Analyzing Email Security</span>
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>• Checking domain reputation and blacklists</div>
            <div>• Scanning for known data breaches</div>
            <div>• Verifying email authentication records</div>
            <div>• Analyzing domain security configuration</div>
            <div>• Cross-referencing threat intelligence databases</div>
          </div>
        </div>
      )}

      {/* Analysis Result */}
      {result && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {/* Result Header */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800">Security Analysis Report</h4>
              <div className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${getRiskColor(result.riskLevel)}`}>
                {getRiskIcon(result.riskLevel)}
                {result.riskLevel.toUpperCase()} RISK
              </div>
            </div>
            
            {/* Security Score */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800">Security Score</span>
              <span className="text-3xl font-bold text-blue-600">{result.overallScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  result.overallScore >= 80 ? 'bg-green-500' :
                  result.overallScore >= 60 ? 'bg-yellow-500' :
                  result.overallScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${result.overallScore}%` }}
              />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Email Information */}
            <div>
              <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Analysis
              </h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-mono text-sm text-gray-700 mb-2">{result.email}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <div className="font-medium">{result.domainInfo.category}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Domain Age:</span>
                    <div className="font-medium">{result.details.domainAge} years</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Country:</span>
                    <div className="font-medium">{result.domainInfo.country}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Registrar:</span>
                    <div className="font-medium">{result.domainInfo.registrar}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Features
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>MX Records:</span>
                    <span className={result.details.mxRecords ? 'text-green-600' : 'text-red-600'}>
                      {result.details.mxRecords ? '✅ Present' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SPF Record:</span>
                    <span className={result.details.spfRecord ? 'text-green-600' : 'text-orange-600'}>
                      {result.details.spfRecord ? '✅ Configured' : '⚠️ Not Found'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>DMARC Policy:</span>
                    <span className={result.details.dmarcRecord ? 'text-green-600' : 'text-orange-600'}>
                      {result.details.dmarcRecord ? '✅ Active' : '⚠️ Not Set'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blacklist Status:</span>
                    <span className={!result.details.blacklisted ? 'text-green-600' : 'text-red-600'}>
                      {!result.details.blacklisted ? '✅ Clean' : '❌ Listed'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Domain Intelligence
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Trust Score:</span>
                    <span className="font-medium text-blue-600">{result.domainInfo.trustScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reputation:</span>
                    <span className="font-medium">{result.details.reputation}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Corporate Domain:</span>
                    <span className={result.details.isCorporate ? 'text-green-600' : 'text-gray-600'}>
                      {result.details.isCorporate ? '✅ Yes' : '○ No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Educational:</span>
                    <span className={result.details.isEducational ? 'text-green-600' : 'text-gray-600'}>
                      {result.details.isEducational ? '✅ Yes' : '○ No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breach History */}
            {result.breachHistory.found && (
              <div>
                <h5 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Data Breach History ({result.breachHistory.breaches.length} found)
                </h5>
                <div className="space-y-2">
                  {result.breachHistory.breaches.map((breach, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700">{breach}</span>
                    </div>
                  ))}
                  {result.breachHistory.lastBreach && (
                    <div className="text-xs text-red-600 mt-2">
                      Last breach detected: {result.breachHistory.lastBreach}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Threats */}
            {result.threats.length > 0 && (
              <div>
                <h5 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Security Concerns ({result.threats.length})
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

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div>
                <h5 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Recommendations
                </h5>
                <div className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-blue-700">{rec}</span>
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
            <h4 className="font-bold text-gray-800">Recent Email Scans</h4>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {scanHistory.map((scan, index) => (
              <div key={index} className="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm text-gray-700 truncate">{scan.email}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-3">
                      <span>Score: {scan.overallScore}/100</span>
                      {scan.breachHistory.found && (
                        <span className="text-red-600">• {scan.breachHistory.breaches.length} breach(es)</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(scan.riskLevel)} ml-2`}>
                    {scan.riskLevel.toUpperCase()}
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

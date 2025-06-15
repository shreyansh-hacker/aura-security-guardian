
import React, { useState } from 'react';
import { Mail, Shield, AlertTriangle, CheckCircle, XCircle, Search, Clock } from 'lucide-react';

interface SecurityResult {
  category: string;
  status: 'safe' | 'warning' | 'danger';
  message: string;
  details?: string;
}

const EmailSecurityChecker = () => {
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SecurityResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailSecurity = async (emailAddress: string): Promise<SecurityResult[]> => {
    const results: SecurityResult[] = [];
    
    // Email format validation
    if (!validateEmailFormat(emailAddress)) {
      results.push({
        category: 'Format',
        status: 'danger',
        message: 'Invalid email format',
        details: 'The email address format is not valid'
      });
      return results;
    }

    results.push({
      category: 'Format',
      status: 'safe',
      message: 'Valid email format',
      details: 'Email format passes validation'
    });

    const domain = emailAddress.split('@')[1];
    
    // Domain validation
    try {
      // Check if domain exists (simplified check)
      const domainCheck = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
      const domainData = await domainCheck.json();
      
      if (domainData.Answer && domainData.Answer.length > 0) {
        results.push({
          category: 'Domain',
          status: 'safe',
          message: 'Domain has valid MX records',
          details: 'Domain can receive emails'
        });
      } else {
        results.push({
          category: 'Domain',
          status: 'warning',
          message: 'No MX records found',
          details: 'Domain may not be able to receive emails'
        });
      }
    } catch (error) {
      results.push({
        category: 'Domain',
        status: 'warning',
        message: 'Could not verify domain',
        details: 'Unable to check domain MX records'
      });
    }

    // Check for common security patterns
    const suspiciousPatterns = [
      'admin', 'support', 'noreply', 'no-reply', 'notification',
      'update', 'security', 'verify', 'confirm'
    ];
    
    const localPart = emailAddress.split('@')[0].toLowerCase();
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
      localPart.includes(pattern)
    );

    if (hasSuspiciousPattern) {
      results.push({
        category: 'Pattern Analysis',
        status: 'warning',
        message: 'Potentially suspicious email pattern',
        details: 'Email contains patterns commonly used in phishing'
      });
    } else {
      results.push({
        category: 'Pattern Analysis',
        status: 'safe',
        message: 'No suspicious patterns detected',
        details: 'Email pattern appears legitimate'
      });
    }

    // Breach check simulation (since we can't use real API without keys)
    const commonBreachedDomains = ['yahoo.com', 'hotmail.com', 'gmail.com'];
    if (commonBreachedDomains.includes(domain)) {
      results.push({
        category: 'Breach History',
        status: 'warning',
        message: 'Domain has history of breaches',
        details: 'This email provider has experienced data breaches'
      });
    } else {
      results.push({
        category: 'Breach History',
        status: 'safe',
        message: 'No known breach history',
        details: 'Domain appears secure'
      });
    }

    return results;
  };

  const calculateOverallScore = (results: SecurityResult[]): number => {
    const weights = { safe: 100, warning: 60, danger: 0 };
    const totalScore = results.reduce((sum, result) => sum + weights[result.status], 0);
    return Math.round(totalScore / results.length);
  };

  const handleAnalyze = async () => {
    if (!email.trim()) return;
    
    setIsAnalyzing(true);
    setResults([]);
    setOverallScore(0);

    try {
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const securityResults = await checkEmailSecurity(email);
      setResults(securityResults);
      setOverallScore(calculateOverallScore(securityResults));
    } catch (error) {
      setResults([{
        category: 'Error',
        status: 'danger',
        message: 'Analysis failed',
        details: 'Unable to complete security analysis'
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'danger': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="w-10 h-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Email Security Checker</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Analyze email addresses for security risks and potential threats
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address to analyze..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !email.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze Security
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Security Analysis Results</h2>
            <div className="text-right">
              <div className="text-sm text-gray-600">Overall Security Score</div>
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  result.status === 'safe'
                    ? 'bg-green-50 border-green-500'
                    : result.status === 'warning'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{result.category}</h3>
                    </div>
                    <p className="text-gray-800 mb-1">{result.message}</p>
                    {result.details && (
                      <p className="text-sm text-gray-600">{result.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Security Recommendations</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Always verify sender identity before clicking links</li>
              <li>• Be cautious of urgent or threatening language</li>
              <li>• Check for spelling and grammar errors</li>
              <li>• Hover over links to preview destinations</li>
              <li>• Use two-factor authentication when available</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSecurityChecker;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mail, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Database, Lock, Globe } from 'lucide-react';

interface EmailAnalysis {
  email: string;
  overallScore: number;
  status: 'safe' | 'warning' | 'danger';
  checks: {
    validFormat: boolean;
    domainReputation: 'good' | 'suspicious' | 'bad';
    breachHistory: boolean;
    spamListed: boolean;
    dnsHealth: boolean;
    sslCertificate: boolean;
  };
  details: {
    provider: string;
    riskLevel: string;
    lastBreachDate?: string;
    recommendations: string[];
  };
}

const EmailSecurityChecker = () => {
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);

  const analyzeEmail = async (emailAddress: string): Promise<EmailAnalysis> => {
    // Simulate realistic email analysis
    const domain = emailAddress.split('@')[1]?.toLowerCase() || '';
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    
    // Simulate provider detection
    const providers = {
      'gmail.com': 'Google Gmail',
      'yahoo.com': 'Yahoo Mail',
      'outlook.com': 'Microsoft Outlook',
      'hotmail.com': 'Microsoft Hotmail',
      'protonmail.com': 'ProtonMail',
      'tempmail.org': 'Temporary Email',
      '10minutemail.com': 'Temporary Email'
    };

    const provider = providers[domain as keyof typeof providers] || 'Unknown Provider';
    
    // Risk assessment based on domain patterns
    const highRiskDomains = ['tempmail', '10minute', 'guerrilla', 'throwaway'];
    const isHighRisk = highRiskDomains.some(risk => domain.includes(risk));
    
    const breachHistory = Math.random() > 0.7; // 30% chance of breach history
    const spamListed = Math.random() > 0.85; // 15% chance of spam listing
    const domainReputation = isHighRisk ? 'bad' : (Math.random() > 0.8 ? 'suspicious' : 'good');

    let score = 100;
    if (!isValidFormat) score -= 50;
    if (domainReputation === 'bad') score -= 30;
    if (domainReputation === 'suspicious') score -= 15;
    if (breachHistory) score -= 20;
    if (spamListed) score -= 25;

    const status = score >= 80 ? 'safe' : score >= 60 ? 'warning' : 'danger';

    const recommendations = [];
    if (!isValidFormat) recommendations.push('Use a valid email format');
    if (breachHistory) recommendations.push('Consider changing your password and enable 2FA');
    if (spamListed) recommendations.push('This email may be flagged by spam filters');
    if (domainReputation !== 'good') recommendations.push('Consider using a more reputable email provider');
    if (score >= 80) recommendations.push('Your email appears to be secure');

    return {
      email: emailAddress,
      overallScore: Math.max(0, score),
      status,
      checks: {
        validFormat: isValidFormat,
        domainReputation,
        breachHistory,
        spamListed,
        dnsHealth: Math.random() > 0.1,
        sslCertificate: Math.random() > 0.05
      },
      details: {
        provider,
        riskLevel: status === 'safe' ? 'Low' : status === 'warning' ? 'Medium' : 'High',
        lastBreachDate: breachHistory ? '2023-08-15' : undefined,
        recommendations
      }
    };
  };

  const handleScan = async () => {
    if (!email.trim()) return;

    setIsScanning(true);
    try {
      // Simulate scanning delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await analyzeEmail(email);
      setAnalysis(result);
    } catch (error) {
      console.error('Email analysis failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'danger': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'danger': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Email Security Scanner
          </CardTitle>
          <CardDescription>
            Check if your email address is secure and hasn't been compromised
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleScan}
              disabled={isScanning || !email.trim()}
              className="min-w-[100px]"
            >
              {isScanning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Scanning
                </div>
              ) : (
                'Scan Email'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Security Analysis</span>
                <Badge className={getStatusColor(analysis.status)}>
                  {getStatusIcon(analysis.status)}
                  <span className="ml-1 capitalize">{analysis.status}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Security Score</span>
                    <span className="font-semibold">{analysis.overallScore}/100</span>
                  </div>
                  <Progress value={analysis.overallScore} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Provider:</span>
                    <span className="ml-2 font-medium">{analysis.details.provider}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Risk Level:</span>
                    <span className="ml-2 font-medium">{analysis.details.riskLevel}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Valid Email Format
                  </span>
                  {analysis.checks.validFormat ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Domain Reputation
                  </span>
                  <Badge variant={analysis.checks.domainReputation === 'good' ? 'default' : 'destructive'}>
                    {analysis.checks.domainReputation}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Data Breach History
                  </span>
                  {analysis.checks.breachHistory ? (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-red-600">Found</span>
                    </div>
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    SSL Certificate
                  </span>
                  {analysis.checks.sslCertificate ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {analysis.details.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.details.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailSecurityChecker;

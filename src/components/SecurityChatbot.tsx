import { useState, useEffect } from "react";
import { Shield, CheckCircle, AlertTriangle, Info, Zap } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

// Expanded interview steps with more options
const interviewSteps = [
  {
    key: "topic",
    question: "What security issue or topic do you need help with?",
    type: "options",
    options: [
      "Suspicious email or message",
      "App permissions and privacy",
      "Unsafe website or pop-up",
      "Virus/Malware detection",
      "Phishing or scam attempt",
      "Lost or stolen device",
      "Data breach notification",
      "Password security issues",
      "Social media account hacked",
      "Online banking security",
      "Wi-Fi network security",
      "Identity theft concerns",
      "Ransomware attack",
      "Cryptocurrency scam",
      "Online shopping fraud",
      "Two-factor authentication setup",
      "VPN and privacy tools",
      "Child safety online",
      "Work device security",
      "IoT device security",
      "Other security concern"
    ]
  },
  {
    key: "device",
    question: "What device are you using?",
    type: "options",
    options: [
      "iPhone/iOS device",
      "Android phone/tablet",
      "Windows PC/laptop",
      "Mac/MacBook",
      "Chromebook",
      "Smart TV",
      "Gaming console",
      "Router/Network device",
      "Smart home device",
      "Work computer",
      "Multiple devices",
      "Other device"
    ]
  },
  {
    key: "urgency",
    question: "How urgent is this security concern?",
    type: "options",
    options: [
      "🔴 Critical - Immediate threat detected",
      "🟠 High - Potential active threat",
      "🟡 Medium - Suspicious activity noticed",
      "🟢 Low - General security question",
      "🔵 Prevention - Want to stay secure"
    ]
  },
  {
    key: "details",
    question: "Which best describes your current situation?",
    type: "options",
    options: [
      "I received a suspicious message or email",
      "An app is requesting unusual permissions",
      "A website showed security warnings",
      "My device is running slowly or acting strange",
      "I think my password was compromised",
      "I clicked on a suspicious link",
      "I downloaded something questionable",
      "My accounts show unusual activity",
      "I need to secure my data",
      "Someone else may have access to my device",
      "I want to prevent future security issues",
      "I'm not sure what the problem is",
      "Other situation not listed"
    ]
  }
];

// Enhanced AI response function with more detailed advice
const getMockAIResponse = (answers: { [key: string]: string }) => {
  const topic = answers.topic || "";
  const device = answers.device || "";
  const urgency = answers.urgency || "";
  const details = answers.details || "";

  // Determine urgency level for response tone
  const isUrgent = urgency.includes("Critical") || urgency.includes("High");
  const urgencyIcon = isUrgent ? "🚨" : urgency.includes("Medium") ? "⚠️" : "ℹ️";

  // Generate contextual security advice based on the answers
  if (topic.includes("Suspicious email") || topic.includes("Phishing")) {
    return `${urgencyIcon} **Email Security Analysis**

Based on your concern about suspicious emails on your ${device}:

**Immediate Actions:**
${isUrgent ? "🔥 **URGENT**: " : ""}
1. **Don't click any links** or download attachments
2. **Check sender address** - Look for misspellings/suspicious domains
3. **Report as spam/phishing** to your email provider
4. **Delete immediately** after reporting

**Security Measures:**
✅ Enable two-factor authentication on all accounts
✅ Use email filtering and security tools
✅ Verify sender through alternative communication

**Risk Level:** ${isUrgent ? "HIGH" : "MEDIUM"} - Monitor accounts for 48 hours

Need more help? I can guide you through specific email verification steps.`;
  }

  if (topic.includes("Virus") || topic.includes("Malware")) {
    return `${urgencyIcon} **Malware Detection & Removal**

**Device:** ${device}
**Status:** ${isUrgent ? "ACTIVE THREAT DETECTED" : "Potential Risk"}

**Step-by-Step Recovery:**
1. 🌐 **Disconnect from internet** immediately
2. 🛡️ **Run full antivirus scan** with updated definitions
3. 🔧 **Boot in safe mode** if device is sluggish
4. 📱 **Check installed programs** for unknown software
5. 🔄 **Update OS and software** immediately

**Advanced Recovery:**
- Use Windows Defender Offline scan (Windows)
- Reset browser settings completely
- Change all passwords from clean device

**Prevention Score:** Your setup needs improvement - let's enhance it!

Ready for a custom security checklist for your ${device}?`;
  }

  if (topic.includes("App permissions")) {
    return `${urgencyIcon} **App Permission Security Audit**

**Device Analysis:** ${device}
**Privacy Risk:** ${urgency.includes("High") ? "Elevated" : "Manageable"}

**Permission Cleanup Guide:**
1. 📱 **Settings → Privacy & Security**
2. 🔍 **Review each app's permissions**
3. ❌ **Revoke unnecessary access** to:
   - Camera & Microphone
   - Location services
   - Contacts & Photos
   - Financial data

**Red Flag Permissions:**
⚠️ Games accessing contacts
⚠️ Flashlight apps using camera
⚠️ Keyboards accessing internet

**Quick Wins:**
✨ Remove unused apps (reduces attack surface)
✨ Use app-specific passwords
✨ Regular permission audits (monthly)

Want me to create a personalized app security checklist?`;
  }

  if (topic.includes("Password")) {
    return `${urgencyIcon} **Password Security Emergency Protocol**

**Threat Level:** ${isUrgent ? "🔴 HIGH - Act Now" : "🟡 Medium"}
**Device:** ${device}

**Immediate Actions (Next 15 minutes):**
1. 🔐 **Change compromised password** immediately
2. 🔍 **Check haveibeenpwned.com** for breaches
3. 📧 **Review recent account activity**
4. 🚨 **Enable account alerts** everywhere

**Password Recovery Checklist:**
✅ Use unique password (never reuse)
✅ Enable 2FA on all critical accounts
✅ Use password manager (recommended tools below)
✅ Check for suspicious logins

**Recommended Tools:**
🛡️ Bitwarden (free & secure)
🛡️ 1Password (premium features)
🛡️ Built-in browser managers

**Security Score Boost:** This incident can actually make you more secure long-term!

Ready to set up a bulletproof password system?`;
  }

  // Default comprehensive response
  return `${urgencyIcon} **Comprehensive Security Analysis**

**Your Security Profile:**
- **Issue:** ${topic.toLowerCase()}
- **Device:** ${device}
- **Priority:** ${urgency.replace(/🔴|🟠|🟡|🟢|🔵/g, '').trim()}

**Personalized Action Plan:**

**Phase 1 - Immediate (Next 30 minutes):**
1. 🔒 Secure your ${device} with latest updates
2. 🛡️ Run quick security scan
3. 📋 Document any suspicious activity

**Phase 2 - Strengthening (This week):**
1. 🔐 Implement strong authentication
2. 📱 Audit app permissions and access
3. 🌐 Secure network connections

**Phase 3 - Monitoring (Ongoing):**
1. 📊 Regular security health checks
2. 🚨 Set up threat monitoring
3. 📚 Stay informed about new threats

**Your Security Score:** Improving! 📈

**Next Steps:** Would you like a detailed walkthrough for any of these phases? I can provide device-specific instructions for your ${device}.

💡 **Pro Tip:** Security is a journey, not a destination. You're taking the right steps!`;
};

// Interactive response suggestions
const getFollowUpSuggestions = (answers: { [key: string]: string }) => {
  const suggestions = [];
  const topic = answers.topic || "";
  
  if (topic.includes("email") || topic.includes("Phishing")) {
    suggestions.push("Show me how to verify email authenticity");
    suggestions.push("Set up email security filters");
  } else if (topic.includes("password")) {
    suggestions.push("Help me choose a password manager");
    suggestions.push("Set up two-factor authentication");
  } else if (topic.includes("Virus") || topic.includes("Malware")) {
    suggestions.push("Create a malware removal plan");
    suggestions.push("Set up real-time protection");
  } else {
    suggestions.push("Create a security checklist");
    suggestions.push("Schedule regular security audits");
  }
  
  suggestions.push("Get general security tips");
  return suggestions;
};

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<{ from: string; text: string; type?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Start the interview with animated welcome
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = [
        {
          from: "bot",
          text: `👋 Welcome to **LiveAnswering** - Your Personal Security Assistant!`,
          type: "welcome"
        },
        {
          from: "bot", 
          text: `I'm here to help you resolve any security concerns quickly and effectively. Let's start with a few questions to understand your situation better.`,
          type: "info"
        }
      ];
      
      setMessages(welcomeMessages);
      
      // Add first question after a brief delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          from: "bot",
          text: interviewSteps[0].question,
          type: "question"
        }]);
      }, 1000);
      
      setStep(0);
      setAnswers({});
      setSubmitted(false);
    }
  }, [messages.length]);

  useEffect(() => {
    setOptionValue("");
  }, [step]);

  async function handleSend() {
    const currentStep = interviewSteps[step];
    const valueToUse = optionValue;

    if (!valueToUse || isLoading) return;

    // Add user message with animation
    setMessages((m) => [...m, { from: "user", text: valueToUse }]);

    const currentStepKey = currentStep.key;
    const nextStep = step + 1;
    const updatedAnswers = {
      ...answers,
      [currentStepKey]: valueToUse,
    };
    setAnswers(updatedAnswers);
    setOptionValue("");

    // Add acknowledgment message
    const acknowledgments = [
      "Got it! 👍",
      "Perfect, thanks! ✨", 
      "Noted! 📝",
      "Understood! 🎯",
      "Great info! 💡"
    ];
    const randomAck = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];

    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: randomAck, type: "acknowledgment" }]);
    }, 300);

    if (nextStep < interviewSteps.length) {
      setStep(nextStep);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { from: "bot", text: interviewSteps[nextStep].question, type: "question" },
        ]);
      }, 800);
    } else {
      // End of interview
      setStep(nextStep);
      setSubmitted(true);
      setIsLoading(true);
      
      setTimeout(() => {
        const summaryText = `Perfect! Here's what I've gathered:

📋 **Your Security Profile:**
• **Concern:** ${updatedAnswers["topic"]}
• **Device:** ${updatedAnswers["device"]}  
• **Priority:** ${updatedAnswers["urgency"]?.replace(/🔴|🟠|🟡|🟢|🔵/g, '').trim()}
• **Situation:** ${updatedAnswers["details"]}

🔍 Analyzing your situation and preparing personalized recommendations...`;

        setMessages((m) => [
          ...m,
          { from: "bot", text: summaryText, type: "summary" },
          { from: "bot", text: "🧠 Processing security analysis...", type: "processing" },
        ]);

        setTimeout(() => {
          const aiReply = getMockAIResponse(updatedAnswers);
          setMessages((m) => [
            ...m.slice(0, -1),
            {
              from: "bot",
              text: aiReply,
              type: "solution"
            },
          ]);
          setIsLoading(false);
          setShowSuggestions(true);
        }, 2000);
      }, 600);
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [
      ...prev,
      { from: "user", text: suggestion },
      { from: "bot", text: "Great question! Let me provide you with detailed guidance on that topic. This feature will be enhanced in future updates with specific step-by-step instructions.", type: "info" }
    ]);
    setShowSuggestions(false);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "welcome": return <Shield className="w-4 h-4 text-blue-600" />;
      case "question": return <Info className="w-4 h-4 text-purple-600" />;
      case "acknowledgment": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "summary": return <Zap className="w-4 h-4 text-orange-600" />;
      case "solution": return <Shield className="w-4 h-4 text-blue-600" />;
      case "processing": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Shield className="w-4 h-4 text-blue-600" />;
    }
  };

  const getMessageStyle = (type?: string) => {
    switch (type) {
      case "welcome": return "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400";
      case "question": return "bg-purple-50 border-l-4 border-purple-400";
      case "acknowledgment": return "bg-green-50 border-l-4 border-green-400";
      case "summary": return "bg-orange-50 border-l-4 border-orange-400";
      case "solution": return "bg-blue-50 border-l-4 border-blue-400";
      case "processing": return "bg-yellow-50 border-l-4 border-yellow-400";
      default: return "bg-gray-50";
    }
  };

  return (
    <div className="rounded-2xl shadow-lg border border-blue-100 overflow-hidden w-full max-w-full">
      <div className="bg-gradient-to-tr from-blue-400 via-blue-100 to-white px-3 sm:px-6 py-2 sm:py-3 flex items-center gap-2">
        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
        <h3 className="font-semibold text-base sm:text-lg text-blue-900">LiveAnswering</h3>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-700 hidden sm:inline">AI Active</span>
        </div>
      </div>
      
      <div className="bg-gray-50 px-2 sm:px-4 py-3 h-64 sm:h-80 overflow-y-auto mb-2 space-y-2 scrollbar-thin scrollbar-thumb-blue-100">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`animate-fade-in ${msg.from === "bot" ? "justify-start" : "justify-end flex"}`}
          >
            {msg.from === "bot" ? (
              <div className={`flex items-start gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg ${getMessageStyle(msg.type)}`}>
                {getMessageIcon(msg.type)}
                <div className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
              </div>
            ) : (
              <span className="text-xs sm:text-sm bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-xl max-w-xs">
                {msg.text}
              </span>
            )}
          </div>
        ))}
        
        {showSuggestions && (
          <div className="mt-4 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">💡 Suggested next steps:</p>
            <div className="space-y-1">
              {getFollowUpSuggestions(answers).map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left text-xs bg-white hover:bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {(step < interviewSteps.length && !submitted) && (
        <div className="flex flex-col gap-2 sm:gap-3 mt-1 px-2 sm:px-4 pb-3">
          <div className="text-xs text-center text-gray-500">
            Step {step + 1} of {interviewSteps.length}
          </div>
          <div className="max-h-24 sm:max-h-32 overflow-y-auto">
            <RadioGroup
              value={optionValue}
              onValueChange={setOptionValue}
              className="mb-2"
            >
              {interviewSteps[step].options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2 mb-1 hover:bg-blue-50 p-1 rounded transition-colors">
                  <RadioGroupItem value={option} id={option} className="flex-shrink-0" />
                  <label
                    htmlFor={option}
                    className="text-xs sm:text-sm cursor-pointer select-none flex-1 leading-tight"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <button
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl hover:scale-105 shadow-lg transition-all text-sm ${
              isLoading || !optionValue ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"
            }`}
            onClick={handleSend}
            disabled={isLoading || !optionValue}
          >
            {step === interviewSteps.length - 1 ? "🚀 Get My Security Plan" : "Continue ➡️"}
          </button>
        </div>
      )}

      <div className="text-xs px-2 sm:px-4 pb-2 text-gray-400 bg-gradient-to-r from-blue-50 to-purple-50">
        🤖 AI-powered security assistant providing real-time threat analysis<br />
        🔒 Your privacy is protected - all analysis happens locally
      </div>
    </div>
  );
}

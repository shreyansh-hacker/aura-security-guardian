import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
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

// Mock AI response function
const getMockAIResponse = (answers: { [key: string]: string }) => {
  const topic = answers.topic || "";
  const device = answers.device || "";
  const details = answers.details || "";

  // Generate contextual security advice based on the answers
  if (topic.includes("Suspicious email") || topic.includes("Phishing")) {
    return `Based on your concern about suspicious emails on your ${device}, here's what you should do:

1. **Don't click any links** or download attachments from the suspicious email
2. **Check the sender's address** carefully - look for misspellings or suspicious domains
3. **Report the email** as spam/phishing to your email provider
4. **Delete the email** immediately after reporting
5. **Enable two-factor authentication** on all your important accounts

If you've already clicked on links, change your passwords immediately and monitor your accounts for unusual activity.`;
  }

  if (topic.includes("Virus") || topic.includes("Malware")) {
    return `For potential malware on your ${device}, follow these steps:

1. **Disconnect from the internet** to prevent data theft
2. **Run a full antivirus scan** using updated antivirus software
3. **Boot in safe mode** if the device is running slowly
4. **Check for unusual programs** in your installed applications
5. **Update your operating system** and all software immediately

If problems persist, consider professional help or backing up important data and performing a system restore.`;
  }

  if (topic.includes("App permissions")) {
    return `To secure app permissions on your ${device}:

1. **Review app permissions** in your device settings
2. **Revoke unnecessary permissions** especially camera, microphone, and location access
3. **Only grant permissions** that are essential for the app's function
4. **Regularly audit** your installed apps and remove unused ones
5. **Download apps only** from official app stores

Pay special attention to apps requesting access to contacts, photos, or financial information.`;
  }

  // Default response
  return `Based on your ${topic.toLowerCase()} concern on your ${device}, here are general security recommendations:

1. **Keep your device updated** with the latest security patches
2. **Use strong, unique passwords** for all accounts
3. **Enable two-factor authentication** wherever possible
4. **Be cautious with downloads** and email attachments
5. **Regular security scans** and monitoring

If you're still concerned, consider consulting with a cybersecurity professional or your device manufacturer's support team.`;
};

export default function SecurityChatbot() {
  // Each message: { from: "bot" | "user", text: string }
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Live Answering states
  const [step, setStep] = useState(0); // which interview step we are on
  const [answers, setAnswers] = useState<{ [key: string]: string }>({}); // collect step answers
  const [submitted, setSubmitted] = useState(false);

  const [optionValue, setOptionValue] = useState(""); // for radio/select

  // Start the interview if it's the user's first visit
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: `👋 Welcome to LiveAnswering! I'll guide you step-by-step to resolve your security issue. Respond to my questions below.`,
        },
        {
          from: "bot",
          text: interviewSteps[0].question,
        },
      ]);
      setStep(0);
      setAnswers({});
      setSubmitted(false);
    }
  }, [messages.length]);

  // Updated useEffect to reset optionValue on step change
  useEffect(() => {
    setOptionValue("");
  }, [step]);

  // Handle input submission in step-by-step mode
  async function handleSend() {
    const currentStep = interviewSteps[step];
    const valueToUse = optionValue;

    if (!valueToUse || isLoading) return;

    // Add user message
    setMessages((m) => [...m, { from: "user", text: valueToUse }]);

    // Collect answer
    const currentStepKey = currentStep.key;
    const nextStep = step + 1;
    const updatedAnswers = {
      ...answers,
      [currentStepKey]: valueToUse,
    };
    setAnswers(updatedAnswers);
    setOptionValue("");

    // If more steps, ask next question; else, process & summarize
    if (nextStep < interviewSteps.length) {
      setStep(nextStep);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { from: "bot", text: interviewSteps[nextStep].question },
        ]);
      }, 350);
    } else {
      // End of interview – process everything
      setStep(nextStep);
      setSubmitted(true);
      setIsLoading(true);
      
      setTimeout(() => {
        // Build a summary
        const summaryText = `Thank you! Here's what you've told me:
        
- Topic: ${updatedAnswers["topic"] ?? valueToUse}
- Device: ${updatedAnswers["device"] ?? ""}
- Details: ${updatedAnswers["details"] ?? ""}

I will now analyze your situation and provide step-by-step advice.`;

        setMessages((m) => [
          ...m,
          { from: "bot", text: summaryText },
          { from: "bot", text: "Processing your information..." },
        ]);

        // Generate AI response
        setTimeout(() => {
          const aiReply = getMockAIResponse(updatedAnswers);
          setMessages((m) => [
            ...m.slice(0, -1), // remove "Processing your information..."
            {
              from: "bot",
              text: aiReply,
            },
          ]);
          setIsLoading(false);
        }, 1500);
      }, 600);
    }
  }

  return (
    <div className="rounded-3xl shadow-lg border border-blue-100 overflow-hidden max-w-full">
      <div className="bg-gradient-to-tr from-blue-400 via-blue-100 to-white px-6 py-3 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-600" />
        <h3 className="font-semibold text-lg text-blue-900">LiveAnswering</h3>
      </div>
      <div className="bg-gray-50 px-4 py-3 h-64 overflow-y-auto mb-2 space-y-1 scrollbar-thin scrollbar-thumb-blue-100">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2
              ${msg.from === "bot"
                ? "justify-start text-blue-700"
                : "justify-end text-gray-800"}`}
          >
            {msg.from === "bot" ? (
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 drop-shadow" />
                <span className={`text-sm rounded-xl px-2 py-1 ${msg.text === "Processing your information..." ? "italic opacity-60" : ""}`}>
                  {msg.text}
                </span>
              </span>
            ) : (
              <span className="text-sm bg-blue-100 px-3 py-1 rounded-xl">{msg.text}</span>
            )}
          </div>
        ))}
      </div>
      {/* Show input only if not finished submitting */}
      {(step < interviewSteps.length && !submitted) && (
        <div className="flex flex-col gap-2 mt-1 px-4 pb-3">
          <div className="max-h-32 overflow-y-auto">
            <RadioGroup
              value={optionValue}
              onValueChange={setOptionValue}
              className="mb-2"
            >
              {interviewSteps[step].options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem value={option} id={option} />
                  <label
                    htmlFor={option}
                    className="text-sm cursor-pointer select-none"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <button
            className={`bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 shadow ${
              isLoading || !optionValue ? "opacity-60" : ""
            }`}
            onClick={handleSend}
            disabled={isLoading || !optionValue}
          >
            Next
          </button>
        </div>
      )}

      <div className="text-xs px-4 pb-2 text-gray-400">
        AI-powered security assistant.<br />
        Providing personalized cybersecurity guidance.
      </div>
    </div>
  );
}

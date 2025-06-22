import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Heart, Wind, Brain, Bookmark } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  mood?: "calm" | "stressed" | "anxious" | "happy" | "sad";
  suggestions?: string[];
}

interface MoodAnalysis {
  dominant: "calm" | "stressed" | "anxious" | "happy" | "sad";
  confidence: number;
  suggestions: string[];
}

export default function ChatInterface() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text:
        language === "th"
          ? "สวัสดีค่ะ! ฉันคือ AI ที่จะช่วยดูแลสุขภาพจิตของคุณ วันนี้คุณรู้สึกอย่างไ���?"
          : "Hello! I'm your AI mental health companion. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions:
        language === "th"
          ? ["รู้สึกเครียด", "รู้สึกดี", "รู้สึกเศร้า", "รู้สึกวิตกกังวล"]
          : ["I'm stressed", "I'm feeling good", "I'm sad", "I'm anxious"],
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [savedMoods, setSavedMoods] = useState<MoodAnalysis[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMood = (text: string): MoodAnalysis => {
    // Simple mood analysis - in real app this would use actual AI
    const stressWords = [
      "เครียด",
      "stress",
      "worried",
      "pressure",
      "กังวล",
      "เหนื่อย",
    ];
    const happyWords = ["ดี", "good", "happy", "great", "ดีใจ", "สบาย"];
    const sadWords = ["เศร้า", "sad", "depressed", "down", "หดหู่", "ไม่ดี"];
    const anxiousWords = ["วิตก", "anxious", "nervous", "กลัว", "ไม่แน่ใจ"];

    const lowerText = text.toLowerCase();

    if (stressWords.some((word) => lowerText.includes(word))) {
      return {
        dominant: "stressed",
        confidence: 0.8,
        suggestions:
          language === "th"
            ? ["ลองทำการหายใจลึกๆ", "สมาธิ 5 นาที", "เดินเล่นแบบ mindful"]
            : ["Try deep breathing", "5-minute meditation", "Mindful walking"],
      };
    } else if (happyWords.some((word) => lowerText.includes(word))) {
      return {
        dominant: "happy",
        confidence: 0.7,
        suggestions:
          language === "th"
            ? [
                "แบ่งปันความสุขให้คนอื่น",
                "ทำสมาธิเพื่อความสงบ",
                "เขียนบันทึกดีๆ",
              ]
            : [
                "Share your joy",
                "Gratitude meditation",
                "Write positive notes",
              ],
      };
    } else if (sadWords.some((word) => lowerText.includes(word))) {
      return {
        dominant: "sad",
        confidence: 0.75,
        suggestions:
          language === "th"
            ? ["ฟังเพลงที่ชื่นชอบ", "สมาธิเมตตา", "พูดคุยกับเพื่อน"]
            : [
                "Listen to favorite music",
                "Loving-kindness meditation",
                "Talk to a friend",
              ],
      };
    } else if (anxiousWords.some((word) => lowerText.includes(word))) {
      return {
        dominant: "anxious",
        confidence: 0.8,
        suggestions:
          language === "th"
            ? [
                "เทคนิค 4-7-8 breathing",
                "สมาธิแบบ grounding",
                "ออกกำลังกายเบาๆ",
              ]
            : [
                "4-7-8 breathing technique",
                "Grounding meditation",
                "Light exercise",
              ],
      };
    }

    return {
      dominant: "calm",
      confidence: 0.6,
      suggestions:
        language === "th"
          ? ["ทำสมาธิประจำวัน", "เขียน journal", "อ่านหนังสือ"]
          : ["Daily meditation", "Journaling", "Read a book"],
    };
  };

  const generateAIResponse = (
    userMessage: string,
    mood: MoodAnalysis,
  ): string => {
    const responses = {
      stressed: {
        th: [
          "เข้าใจความเครียดที่คุณรู้สึก การหายใจลึกๆ อาจช่วยให้คุณรู้สึกดีขึ้น",
          "ความเครียดเป็นเรื่องปกติค่ะ ลองทำสมาธิสั้นๆ ดูไหม?",
          "ฉันเห็นว่าคุณกำลังรู้สึกหนักใจ อยากลองเทคนิคผ่อนคลายไหม?",
        ],
        en: [
          "I understand you're feeling stressed. Deep breathing might help you feel better.",
          "Stress is natural. Would you like to try a short meditation?",
          "I can see you're feeling overwhelmed. Want to try a relaxation technique?",
        ],
      },
      happy: {
        th: [
          "ดีใจด้วยที่คุณรู้สึกดี! ความสุขนี้คืออะไรดีล่ะ?",
          "เยี่ยมเลย! การรักษาความสุขนี้ด้วยสมาธิจะดีมาก��่ะ",
          "แสงสีหน้าดีของคุณส่องใสมาก ขอแบ่งปันความสุขหน่อยได้ไหม?",
        ],
        en: [
          "I'm happy you're feeling good! What's bringing you joy?",
          "Wonderful! Maintaining this happiness with meditation would be great.",
          "Your positive energy is shining! Can you share what made you happy?",
        ],
      },
      sad: {
        th: [
          "ฉันเข้าใจความรู้สึกของคุณ ความเศร้าเป็นเรื่องปกติของคน",
          "ขณะนี้คุณอาจรู้สึกหนัก แต่จำไว้ว่าความรู้สึกนี้จะผ่านไป",
          "อยากให้คุณรู้ว่าคุณไม่ได้อยู่คนเดียว ฉันอยู่ที่นี่เสมอ",
        ],
        en: [
          "I understand your feelings. Sadness is a natural part of being human.",
          "You might feel heavy right now, but remember this feeling will pass.",
          "I want you to know you're not alone. I'm always here for you.",
        ],
      },
      anxious: {
        th: [
          "ความวิตกกังวลทำให้รู้สึกไม่สบายใจใช่ไหม? ลองมาฝึกหายใจด้วยกัน",
          "ฉันรู้สึกได้ว่าคุณกังวล การ grounding อาจช่วยให้กลับมาสู่ปัจจุบันได้",
          "ความกังวลเป็นสัญญาณที่จิตใจส่งมา มาดูวิธีรับมือด้วยกัน",
        ],
        en: [
          "Anxiety can feel overwhelming, right? Let's try breathing together.",
          "I can sense your worry. Grounding techniques might help bring you to the present.",
          "Anxiety is your mind's way of signaling. Let's explore ways to cope together.",
        ],
      },
      calm: {
        th: [
          "ดีที่เห็นคุณดูสงบ คงจะเป็นเวลาที่ดีสำหรับการสะท้อนตนเอง",
          "ความสงบในใจที่คุณมีนี้น่าชื่นชม อยากพัฒนาต่อไหม?",
          "รู้สึกได้ถึงความสงบจากคุณ เป็นช่วงเวลาที่ดีสำหรับสมาธิ",
        ],
        en: [
          "It's good to see you feeling peaceful. This might be a good time for reflection.",
          "The calmness you have is admirable. Would you like to develop it further?",
          "I can sense your peace. This is a perfect time for meditation.",
        ],
      },
    };

    const moodResponses = responses[mood.dominant][language];
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Analyze mood
    const moodAnalysis = analyzeMood(inputText);

    // Simulate AI processing time
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(inputText, moodAnalysis);
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: "ai",
          timestamp: new Date(),
          mood: moodAnalysis.dominant,
          suggestions: moodAnalysis.suggestions,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      },
      1500 + Math.random() * 1000,
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    inputRef.current?.focus();
  };

  const handleSaveMood = () => {
    if (messages.length === 0) return;

    // Get the latest mood analysis
    const lastAIMessage = messages
      .filter((m) => m.sender === "ai" && m.mood)
      .slice(-1)[0];
    if (lastAIMessage?.mood) {
      const moodData = analyzeMood(
        messages.filter((m) => m.sender === "user").slice(-1)[0]?.text || "",
      );
      setSavedMoods((prev) => [...prev, moodData]);

      // Show success feedback
      // In a real app, this would save to backend with PDPA/GDPR compliance
      console.log("Mood saved securely:", moodData);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would integrate with speech recognition
    if (!isRecording) {
      // Start recording
      console.log("Starting voice recording...");
    } else {
      // Stop recording and process
      console.log("Processing voice input...");
      const mockVoiceText =
        language === "th" ? "รู้สึกเครียดมาก" : "I'm feeling very stressed";
      setInputText(mockVoiceText);
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "stressed":
        return "text-red-600 bg-red-100";
      case "happy":
        return "text-green-600 bg-green-100";
      case "sad":
        return "text-blue-600 bg-blue-100";
      case "anxious":
        return "text-yellow-600 bg-yellow-100";
      case "calm":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white to-mindful-soft-blue">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-4",
                  message.sender === "user"
                    ? "bg-mindful-dark-green text-white rounded-br-sm"
                    : "bg-white border border-gray-200 rounded-bl-sm",
                )}
              >
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    getLanguageFont(language),
                    message.sender === "user"
                      ? "text-white"
                      : "text-mindful-text",
                  )}
                >
                  {message.text}
                </p>

                {message.mood && (
                  <div
                    className={cn(
                      "mt-2 px-2 py-1 rounded-full text-xs inline-block",
                      getMoodColor(message.mood),
                    )}
                  >
                    {message.mood}
                  </div>
                )}

                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-lg text-xs",
                          "bg-mindful-mint text-mindful-text hover:bg-mindful-mint/80",
                          "transition-colors duration-200",
                          getLanguageFont(language),
                        )}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                )}

                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-4">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-mindful-dark-green rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Save Mood Button */}
      <div className="px-4 py-2">
        <motion.button
          onClick={handleSaveMood}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-full bg-mindful-dark-green text-white rounded-xl py-3 font-medium",
            "hover:bg-mindful-dark-green/90 transition-colors duration-200",
            "flex items-center justify-center space-x-2",
            getLanguageFont(language),
          )}
        >
          <Bookmark size={20} />
          <span>{language === "th" ? "บันทึกอารมณ์" : "Save Mood"}</span>
        </motion.button>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={
                language === "th"
                  ? "พิมพ์ความรู้สึกของคุณ..."
                  : "Type how you're feeling..."
              }
              className={cn(
                "w-full p-3 pr-12 rounded-xl border border-gray-200",
                "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
                "transition-all duration-200",
                getLanguageFont(language),
              )}
            />
          </div>

          <motion.button
            onClick={toggleRecording}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "p-3 rounded-xl transition-colors duration-200",
              isRecording
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </motion.button>

          <motion.button
            onClick={handleSendMessage}
            whileTap={{ scale: 0.9 }}
            disabled={!inputText.trim()}
            className={cn(
              "p-3 rounded-xl transition-colors duration-200",
              inputText.trim()
                ? "bg-mindful-dark-green text-white hover:bg-mindful-dark-green/90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed",
            )}
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

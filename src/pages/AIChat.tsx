import { motion } from "framer-motion";
import { Bot, Shield } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import ChatInterface from "@/components/ChatInterface";
import { cn } from "@/lib/utils";

export default function AIChat() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-mindful-mint rounded-lg p-2">
              <Bot size={24} className="text-mindful-dark-green" />
            </div>
            <div>
              <h1
                className={cn(
                  "text-xl font-bold text-mindful-text",
                  getLanguageFont(language),
                )}
              >
                {t("aiChat")}
              </h1>
              <p
                className={cn(
                  "text-sm text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "ผู้ช่วยดูแลสุขภาพจิต"
                  : "Mental Health Companion"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Shield size={16} className="text-mindful-dark-green" />
            <span
              className={cn(
                "text-xs text-mindful-text/60",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ปลอดภัย" : "Secure"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Chat Interface */}
      <motion.div
        className="mx-4 mb-4 bg-white rounded-2xl shadow-sm overflow-hidden"
        style={{ height: "calc(100vh - 180px)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ChatInterface />
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        className="mx-4 bg-mindful-mint rounded-xl p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p
          className={cn(
            "text-xs text-mindful-text/80 text-center",
            getLanguageFont(language),
          )}
        >
          {language === "th"
            ? "การสนทนาของคุณถูกเข้ารหัสและปฏิบัติตาม PDPA • ข้อมูลไม่ถูกแชร์กับบุคคลที่สาม"
            : "Your conversations are encrypted and PDPA compliant • Data is never shared with third parties"}
        </p>
      </motion.div>
    </div>
  );
}

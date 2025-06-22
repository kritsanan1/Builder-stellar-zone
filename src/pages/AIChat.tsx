import { motion } from "framer-motion";
import { MessageCircle, Bot } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function AIChat() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-mindful-mint rounded-full p-6 mx-auto mb-6 w-fit">
            <Bot size={48} className="text-mindful-dark-green" />
          </div>

          <h1
            className={cn(
              "text-3xl font-bold text-mindful-text mb-4",
              getLanguageFont(language),
            )}
          >
            {t("aiChat")}
          </h1>

          <p
            className={cn(
              "text-mindful-text/70 mb-8 max-w-sm",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "แชทกับ AI ที่เข้าใจและช่วยดูแลสุขภาพจิตของคุณ"
              : "Chat with AI that understands and helps care for your mental health"}
          </p>

          <motion.div
            className={cn(
              "bg-mindful-soft-blue rounded-xl p-4 text-mindful-text",
              getLanguageFont(language),
            )}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t("comingSoon")}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

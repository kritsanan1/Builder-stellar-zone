import { motion } from "framer-motion";
import { BookOpen, Search, Filter } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import ContentGrid from "@/components/ContentGrid";
import { cn } from "@/lib/utils";

export default function Content() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-mindful-mint rounded-lg p-2">
              <BookOpen size={24} className="text-mindful-dark-green" />
            </div>
            <div>
              <h1
                className={cn(
                  "text-2xl font-bold text-mindful-text",
                  getLanguageFont(language),
                )}
              >
                {t("content")}
              </h1>
              <p
                className={cn(
                  "text-sm text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "สมาธิ บทความ และแบบฝึกหัด"
                  : "Meditation, articles & exercises"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={
              language === "th"
                ? "ค้นหาสมาธิ บทความ..."
                : "Search meditations, articles..."
            }
            className={cn(
              "w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200",
              "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
              "transition-all duration-200",
              getLanguageFont(language),
            )}
          />
        </motion.div>
      </div>

      {/* Featured Content Banner */}
      <motion.div
        className="mx-4 mb-6 bg-gradient-to-r from-mindful-dark-green to-mindful-dark-green/80 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className={cn(
                "text-xl font-bold mb-2",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "แนะนำสำหรับคุณ" : "Recommended for You"}
            </h2>
            <p className={cn("text-white/90 mb-4", getLanguageFont(language))}>
              {language === "th"
                ? "สมาธิก่อนนอนเพื่อการนอนหลับที่ลึก"
                : "Bedtime meditation for deeper sleep"}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={cn(
                "bg-white text-mindful-dark-green px-4 py-2 rounded-lg font-medium",
                "hover:bg-gray-100 transition-colors duration-200",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "เริ่มเลย" : "Start Now"}
            </motion.button>
          </div>
          <div className="text-4xl">🌙</div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        className="px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ContentGrid />
      </motion.div>

      {/* Premium CTA */}
      <motion.div
        className="mx-4 mt-8 bg-gradient-to-r from-mindful-dark-green/10 to-mindful-mint border border-mindful-dark-green/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-center">
          <h3
            className={cn(
              "text-lg font-semibold text-mindful-text mb-2",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "ปลดล็อกเนื้อหาทั้งหมด" : "Unlock All Content"}
          </h3>
          <p
            className={cn(
              "text-mindful-text/70 mb-4",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "เข้าถึงสมาธิขั้นสูง บทความเฉพาะ และเนื้อหาใหม่ทุกสัปดาห์"
              : "Access advanced meditations, exclusive articles, and new content weekly"}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(
              "bg-mindful-dark-green text-white px-6 py-3 rounded-xl font-medium",
              "hover:bg-mindful-dark-green/90 transition-colors duration-200",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "เริ่มทดลองใช้ฟรี" : "Start Free Trial"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

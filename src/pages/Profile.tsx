import { motion } from "framer-motion";
import { User, Award, Settings, Watch } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import SmartWatchSettings from "@/components/SmartWatchSettings";
import SleepTrackingCard from "@/components/SleepTrackingCard";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.h1
          className={cn(
            "text-2xl font-bold text-mindful-text text-center",
            getLanguageFont(language),
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("profile")}
        </motion.h1>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Profile Summary */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-mindful-mint rounded-full p-3">
              <User size={32} className="text-mindful-dark-green" />
            </div>
            <div>
              <h2
                className={cn(
                  "text-xl font-semibold text-mindful-text",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "สวัสดี!" : "Hello!"}
              </h2>
              <p
                className={cn(
                  "text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "ยินดีต้อนรับสู่ MindfulThai"
                  : "Welcome to MindfulThai"}
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-mindful-dark-green">
                7
              </div>
              <div
                className={cn(
                  "text-xs text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "���ันต่อเนื่อง" : "Day Streak"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mindful-dark-green">
                24
              </div>
              <div
                className={cn(
                  "text-xs text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "นาทีสมาธิ" : "Min Meditated"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mindful-dark-green">
                3
              </div>
              <div
                className={cn(
                  "text-xs text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "เหรียญ" : "Badges"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sleep Tracking */}
        <SleepTrackingCard />

        {/* SmartWatch Settings */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SmartWatchSettings />
        </motion.div>

        {/* Settings */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-mindful-mint rounded-lg p-2">
              <Settings size={24} className="text-mindful-dark-green" />
            </div>
            <h2
              className={cn(
                "text-xl font-semibold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "การตั้งค่า" : "Settings"}
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                label: language === "th" ? "ภาษา" : "Language",
                value: language === "th" ? "ไทย" : "English",
              },
              {
                label: language === "th" ? "การแจ้งเตือน" : "Notifications",
                value: language === "th" ? "เปิด" : "On",
              },
              {
                label: language === "th" ? "โหมดมืด" : "Dark Mode",
                value: language === "th" ? "ปิด" : "Off",
              },
            ].map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <span
                  className={cn("text-mindful-text", getLanguageFont(language))}
                >
                  {setting.label}
                </span>
                <span
                  className={cn(
                    "text-mindful-text/70 text-sm",
                    getLanguageFont(language),
                  )}
                >
                  {setting.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Premium Upgrade */}
        <motion.div
          className="bg-gradient-to-r from-mindful-dark-green/10 to-mindful-mint border border-mindful-dark-green/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Award size={24} className="text-mindful-dark-green" />
            <h4
              className={cn(
                "text-lg font-semibold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {t("upgradeToPremium")}
            </h4>
          </div>
          <p
            className={cn(
              "text-mindful-text/70 mb-4",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "รับคุณสมบัติขั้นสูงและเนื้อหาเพิ่มเติม"
              : "Get advanced features and premium content"}
          </p>
          <motion.button
            className={cn(
              "w-full bg-mindful-dark-green text-white rounded-xl py-3 font-medium",
              "hover:bg-mindful-dark-green/90 active:scale-[0.98] transition-all duration-200",
              getLanguageFont(language),
            )}
            whileTap={{ scale: 0.98 }}
          >
            {language === "th" ? "เริ่มทดลองใช้ฟรี" : "Start Free Trial"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

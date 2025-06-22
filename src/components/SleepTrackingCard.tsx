import { motion } from "framer-motion";
import { Moon, Clock, TrendingUp, Play } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { useSmartWatch, getSleepQualityColor } from "@/lib/smartwatch";
import { cn } from "@/lib/utils";

export default function SleepTrackingCard() {
  const { language, t } = useLanguage();
  const { connection, sleepData, sendNotification } = useSmartWatch();

  const handlePreBedMeditation = () => {
    // Send notification to smartwatch
    const message =
      language === "th"
        ? "เวลาทำสมาธิก่อนนอนแล้ว"
        : "Time for your bedtime meditation";
    sendNotification(message, "sleep");

    // Navigate to sleep meditation (placeholder)
    console.log("Starting pre-bed meditation...");
  };

  const getSleepQualityText = (quality: "good" | "average" | "poor") => {
    if (language === "th") {
      switch (quality) {
        case "good":
          return "ดี";
        case "average":
          return "ปานกลาง";
        case "poor":
          return "ไม่ดี";
        default:
          return "ไม่ทราบ";
      }
    } else {
      switch (quality) {
        case "good":
          return "Good";
        case "average":
          return "Average";
        case "poor":
          return "Poor";
        default:
          return "Unknown";
      }
    }
  };

  if (!connection.isConnected) {
    return (
      <motion.div
        className="bg-mindful-soft-blue rounded-2xl p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Moon size={32} className="text-mindful-text/40 mx-auto mb-3" />
          <h3
            className={cn(
              "text-lg font-semibold text-mindful-text mb-2",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "การติดตามการนอน" : "Sleep Tracking"}
          </h3>
          <p
            className={cn(
              "text-mindful-text/70 mb-4",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "เชื่อมต่อสมาร์ทวอทช์เพื่อติดตามคุณภาพการนอน"
              : "Connect your smartwatch to track sleep quality"}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!sleepData) {
    return (
      <motion.div
        className="bg-mindful-soft-blue rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Moon size={32} className="text-mindful-text/40 mx-auto mb-3" />
          <h3
            className={cn(
              "text-lg font-semibold text-mindful-text mb-2",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "การติดตามการนอน" : "Sleep Tracking"}
          </h3>
          <p className={cn("text-mindful-text/70", getLanguageFont(language))}>
            {language === "th"
              ? "ข้อมูลการนอนจะแสดงหลังจากคืนแรก"
              : "Sleep data will appear after your first night"}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-mindful-soft-blue rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-white rounded-lg p-2">
          <Moon size={24} className="text-mindful-dark-green" />
        </div>
        <div>
          <h3
            className={cn(
              "text-lg font-semibold text-mindful-text",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "สรุปการนอนเมื่อคืน" : "Last Night's Sleep"}
          </h3>
          <p
            className={cn(
              "text-sm text-mindful-text/70",
              getLanguageFont(language),
            )}
          >
            {sleepData.bedtime.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Sleep Duration and Quality */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock size={16} className="text-mindful-dark-green" />
            <span
              className={cn(
                "text-sm font-medium text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ระยะเวลา" : "Duration"}
            </span>
          </div>
          <p
            className={cn(
              "text-2xl font-bold text-mindful-text",
              getLanguageFont(language),
            )}
          >
            {sleepData.duration.toFixed(1)}
            <span className="text-sm font-normal text-mindful-text/70 ml-1">
              {language === "th" ? "ชม." : "hrs"}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp size={16} className="text-mindful-dark-green" />
            <span
              className={cn(
                "text-sm font-medium text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "คุณภาพ" : "Quality"}
            </span>
          </div>
          <p
            className={cn(
              "text-lg font-bold",
              getSleepQualityColor(sleepData.quality),
              getLanguageFont(language),
            )}
          >
            {getSleepQualityText(sleepData.quality)}
          </p>
        </div>
      </div>

      {/* Sleep Phases Chart */}
      <motion.div
        className="bg-white rounded-lg p-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4
          className={cn(
            "text-sm font-medium text-mindful-text mb-3",
            getLanguageFont(language),
          )}
        >
          {language === "th" ? "ระยะการนอน" : "Sleep Phases"}
        </h4>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span
                className={cn(
                  "text-xs text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "นอนหลับลึก" : "Deep Sleep"}
              </span>
              <span
                className={cn(
                  "text-xs font-medium text-mindful-text",
                  getLanguageFont(language),
                )}
              >
                {sleepData.deepSleep}%
              </span>
            </div>
            <motion.div
              className="w-full bg-gray-200 rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="bg-mindful-dark-green h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${sleepData.deepSleep}%` }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </motion.div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span
                className={cn(
                  "text-xs text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "นอนหลับตื้น" : "Light Sleep"}
              </span>
              <span
                className={cn(
                  "text-xs font-medium text-mindful-text",
                  getLanguageFont(language),
                )}
              >
                {sleepData.lightSleep}%
              </span>
            </div>
            <motion.div
              className="w-full bg-gray-200 rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="bg-mindful-mint h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${sleepData.lightSleep}%` }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Pre-bed Meditation CTA */}
      <motion.button
        onClick={handlePreBedMeditation}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full bg-mindful-dark-green text-white rounded-xl py-3 font-medium",
          "hover:bg-mindful-dark-green/90 transition-colors duration-200",
          "flex items-center justify-center space-x-2",
          getLanguageFont(language),
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Play size={20} fill="white" />
        <span>
          {language === "th"
            ? "สมาธิก่อนนอน 10 นาที"
            : "10-min Pre-bed Meditation"}
        </span>
      </motion.button>

      {/* Sleep Schedule */}
      <motion.div
        className="mt-4 pt-4 border-t border-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex justify-between text-sm">
          <div>
            <span
              className={cn(
                "text-mindful-text/70 block",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "เข้านอน" : "Bedtime"}
            </span>
            <span
              className={cn(
                "text-mindful-text font-medium",
                getLanguageFont(language),
              )}
            >
              {sleepData.bedtime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="text-right">
            <span
              className={cn(
                "text-mindful-text/70 block",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ตื่นนอน" : "Wake Up"}
            </span>
            <span
              className={cn(
                "text-mindful-text font-medium",
                getLanguageFont(language),
              )}
            >
              {sleepData.wakeTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

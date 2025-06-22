import { motion } from "framer-motion";
import { Heart, Activity, Wind } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { useSmartWatch, getStressLevelColor } from "@/lib/smartwatch";
import { cn } from "@/lib/utils";

export default function StressLevelCard() {
  const { language, t } = useLanguage();
  const { connection, heartRateData, getStressLevel, sendNotification } =
    useSmartWatch();

  const stressLevel = getStressLevel();
  const heartRate = heartRateData?.value || null;

  const handleStartBreathing = () => {
    // Send notification to smartwatch
    const message =
      language === "th"
        ? "เริ่มการฝึกหายใจเพื่อผ่อนคลาย"
        : "Starting breathing exercise to relax";
    sendNotification(message, "meditation");

    // Navigate to breathing exercise (placeholder)
    console.log("Starting breathing exercise...");
  };

  const getStressLevelText = (level: "low" | "medium" | "high") => {
    if (language === "th") {
      switch (level) {
        case "low":
          return "ต่ำ";
        case "medium":
          return "ปานกลาง";
        case "high":
          return "สูง";
        default:
          return "ไม่ทราบ";
      }
    } else {
      switch (level) {
        case "low":
          return "Low";
        case "medium":
          return "Medium";
        case "high":
          return "High";
        default:
          return "Unknown";
      }
    }
  };

  const getStressMessage = (level: "low" | "medium" | "high") => {
    if (language === "th") {
      switch (level) {
        case "low":
          return "คุณรู้สึกสงบและผ่อนคลายดี";
        case "medium":
          return "ระดับความเครียดปานกลาง ลองทำการฝึกหายใจดู";
        case "high":
          return "ความเครียดสูง แนะนำให้ทำสมาธิหรือฝึกหายใจ";
        default:
          return "ไม่สามารถวัดระดับความเครียดได้";
      }
    } else {
      switch (level) {
        case "low":
          return "You're feeling calm and relaxed";
        case "medium":
          return "Moderate stress level, try some breathing";
        case "high":
          return "High stress detected, consider meditation";
        default:
          return "Unable to determine stress level";
      }
    }
  };

  if (!connection.isConnected) {
    return (
      <motion.div
        className="bg-mindful-mint rounded-2xl p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Activity size={32} className="text-mindful-text/40 mx-auto mb-3" />
          <h3
            className={cn(
              "text-lg font-semibold text-mindful-text mb-2",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "ระดับความเครียด" : "Stress Level"}
          </h3>
          <p
            className={cn(
              "text-mindful-text/70 mb-4",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "เชื่อมต่อสมาร์ทวอทช์เพื่อติดตามระดับความเครียด"
              : "Connect your smartwatch to track stress levels"}
          </p>
          <motion.button
            onClick={() => {
              /* Navigate to settings */
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 bg-mindful-dark-green text-white rounded-lg text-sm font-medium",
              "hover:bg-mindful-dark-green/90 transition-colors duration-200",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "เชื่อมต่อ" : "Connect Device"}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-mindful-mint rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-lg p-2">
            <Activity size={24} className="text-mindful-dark-green" />
          </div>
          <div>
            <h3
              className={cn(
                "text-lg font-semibold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ระดับความเครียด" : "Stress Level"}
            </h3>
            {heartRate && (
              <div className="flex items-center space-x-2 mt-1">
                <Heart size={16} className="text-red-500" />
                <span
                  className={cn(
                    "text-sm text-mindful-text/70",
                    getLanguageFont(language),
                  )}
                >
                  {heartRate} BPM
                </span>
              </div>
            )}
          </div>
        </div>

        <motion.div
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            stressLevel === "low" && "bg-green-100 text-green-800",
            stressLevel === "medium" && "bg-yellow-100 text-yellow-800",
            stressLevel === "high" && "bg-red-100 text-red-800",
            getLanguageFont(language),
          )}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {getStressLevelText(stressLevel)}
        </motion.div>
      </div>

      <p className={cn("text-mindful-text/80 mb-4", getLanguageFont(language))}>
        {getStressMessage(stressLevel)}
      </p>

      {stressLevel !== "low" && (
        <motion.button
          onClick={handleStartBreathing}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full bg-mindful-dark-green text-white rounded-xl py-3 font-medium",
            "hover:bg-mindful-dark-green/90 transition-colors duration-200",
            "flex items-center justify-center space-x-2",
            getLanguageFont(language),
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Wind size={20} />
          <span>{language === "th" ? "เริ่มฝึกหายใจ" : "Start Breathing"}</span>
        </motion.button>
      )}

      {/* Real-time update indicator */}
      <div className="flex items-center justify-center mt-3">
        <motion.div
          className="w-2 h-2 bg-mindful-dark-green rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span
          className={cn(
            "text-xs text-mindful-text/50 ml-2",
            getLanguageFont(language),
          )}
        >
          {language === "th" ? "อัปเดตแบบเรียลไทม์" : "Real-time updates"}
        </span>
      </div>
    </motion.div>
  );
}

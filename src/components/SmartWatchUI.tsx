import { motion } from "framer-motion";
import { Activity, Play, Moon, Wind } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { useSmartWatch, type SmartWatchType } from "@/lib/smartwatch";
import { cn } from "@/lib/utils";

interface SmartWatchUIProps {
  deviceType: SmartWatchType;
  screen: "home" | "meditation" | "sleep";
}

export default function SmartWatchUI({
  deviceType,
  screen,
}: SmartWatchUIProps) {
  const { language } = useLanguage();
  const { heartRateData, sleepData, getStressLevel } = useSmartWatch();

  const getWatchDimensions = () => {
    switch (deviceType) {
      case "apple":
        return "w-44 h-52"; // Apple Watch aspect ratio
      case "samsung":
        return "w-48 h-48"; // Circular Samsung Watch
      case "fitbit":
        return "w-40 h-56"; // Fitbit rectangular
      default:
        return "w-44 h-52";
    }
  };

  const getWatchStyle = () => {
    switch (deviceType) {
      case "apple":
        return "rounded-3xl bg-black border-4 border-gray-800";
      case "samsung":
        return "rounded-full bg-black border-4 border-gray-800";
      case "fitbit":
        return "rounded-2xl bg-black border-4 border-gray-800";
      default:
        return "rounded-3xl bg-black border-4 border-gray-800";
    }
  };

  const renderHomeScreen = () => {
    const stressLevel = getStressLevel();
    const heartRate = heartRateData?.value || "--";

    return (
      <div className="h-full flex flex-col justify-between p-3 text-white text-center">
        <div className="text-xs opacity-75">
          {language === "th" ? "MindfulThai" : "MindfulThai"}
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-3">
          <div className="bg-mindful-soft-blue/20 rounded-lg p-2">
            <Activity size={16} className="mx-auto mb-1 text-blue-400" />
            <div className="text-xs opacity-75">
              {language === "th" ? "ความเครียด" : "Stress"}
            </div>
            <div
              className={cn(
                "text-sm font-bold",
                stressLevel === "low" && "text-green-400",
                stressLevel === "medium" && "text-yellow-400",
                stressLevel === "high" && "text-red-400",
              )}
            >
              {stressLevel === "low"
                ? language === "th"
                  ? "ต่ำ"
                  : "Low"
                : stressLevel === "medium"
                  ? language === "th"
                    ? "ปานกลาง"
                    : "Med"
                  : language === "th"
                    ? "สูง"
                    : "High"}
            </div>
            <div className="text-xs opacity-75">{heartRate} BPM</div>
          </div>

          {stressLevel !== "low" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-mindful-dark-green/80 rounded-lg p-2 text-xs font-medium"
            >
              <Wind size={12} className="mx-auto mb-1" />
              {language === "th" ? "หายใจ" : "Breathe"}
            </motion.button>
          )}
        </div>

        <div className="text-xs opacity-50">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    );
  };

  const renderMeditationScreen = () => {
    const meditations = [
      { duration: 5, label: language === "th" ? "5 นาที" : "5 min" },
      { duration: 10, label: language === "th" ? "10 นาที" : "10 min" },
      { duration: 15, label: language === "th" ? "15 นาที" : "15 min" },
    ];

    return (
      <div className="h-full flex flex-col p-3 text-white">
        <div className="text-xs opacity-75 text-center mb-3">
          {language === "th" ? "สมาธิ" : "Meditation"}
        </div>

        <div className="flex-1 space-y-2">
          {meditations.map((meditation) => (
            <motion.button
              key={meditation.duration}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-mindful-mint/20 rounded-lg p-2 text-center"
            >
              <Play
                size={12}
                className="mx-auto mb-1 text-green-400"
                fill="currentColor"
              />
              <div className="text-xs font-medium">{meditation.label}</div>
              <div className="text-xs opacity-75">
                {language === "th" ? "พร้อม" : "Ready"}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-mindful-dark-green/80 rounded-lg px-3 py-1 text-xs"
          >
            {language === "th" ? "เปิดแอป" : "Open App"}
          </motion.button>
        </div>
      </div>
    );
  };

  const renderSleepScreen = () => {
    const duration = sleepData?.duration || 0;
    const quality = sleepData?.quality || "unknown";

    return (
      <div className="h-full flex flex-col justify-between p-3 text-white text-center">
        <div className="text-xs opacity-75">
          {language === "th" ? "การนอน" : "Sleep"}
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-3">
          <div className="bg-mindful-soft-blue/20 rounded-lg p-2">
            <Moon size={16} className="mx-auto mb-1 text-blue-400" />
            <div className="text-xs opacity-75">
              {language === "th" ? "เมื่อคืน" : "Last Night"}
            </div>
            <div className="text-sm font-bold">
              {duration.toFixed(1)}
              {language === "th" ? "ชม." : "h"}
            </div>
            <div
              className={cn(
                "text-xs",
                quality === "good" && "text-green-400",
                quality === "average" && "text-yellow-400",
                quality === "poor" && "text-red-400",
              )}
            >
              {quality === "good"
                ? language === "th"
                  ? "ดี"
                  : "Good"
                : quality === "average"
                  ? language === "th"
                    ? "ปานกลาง"
                    : "OK"
                  : quality === "poor"
                    ? language === "th"
                      ? "ไม่ดี"
                      : "Poor"
                    : language === "th"
                      ? "ไม่ทราบ"
                      : "N/A"}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-mindful-dark-green/80 rounded-lg p-2 text-xs font-medium"
          >
            <Play size={12} className="mx-auto mb-1" fill="white" />
            {language === "th" ? "ก่อนนอน" : "Bedtime"}
          </motion.button>
        </div>

        <div className="text-xs opacity-50">
          {sleepData?.bedtime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) || "--:--"}
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return renderHomeScreen();
      case "meditation":
        return renderMeditationScreen();
      case "sleep":
        return renderSleepScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <motion.div
      className={cn(
        "relative mx-auto shadow-2xl",
        getWatchDimensions(),
        getWatchStyle(),
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Watch Crown/Button */}
      {deviceType === "apple" && (
        <div className="absolute -right-1 top-1/3 w-2 h-6 bg-gray-700 rounded-r-lg" />
      )}

      {/* Screen Content */}
      <div className="w-full h-full overflow-hidden rounded-inherit p-1">
        <div
          className={cn(
            "w-full h-full bg-gradient-to-br from-gray-900 to-black",
            deviceType === "samsung" ? "rounded-full" : "rounded-2xl",
          )}
        >
          {renderScreen()}
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute top-1 left-2 right-2 flex justify-between">
        <div className="w-1 h-1 bg-green-400 rounded-full opacity-75" />
        <div className="w-1 h-1 bg-blue-400 rounded-full opacity-75" />
      </div>
    </motion.div>
  );
}

// Component for showcasing all watch UIs
export function SmartWatchShowcase() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <h3
        className={cn(
          "text-xl font-semibold text-mindful-text text-center",
          getLanguageFont(language),
        )}
      >
        {language === "th"
          ? "ตัวอย่าง UI บนสมาร์ทวอทช์"
          : "Smartwatch UI Preview"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {smartWatchDevices.map((device, index) => (
          <div key={device.type} className="text-center space-y-4">
            <h4
              className={cn(
                "font-medium text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {device.name}
            </h4>
            <SmartWatchUI
              deviceType={device.type}
              screen={
                index === 0 ? "home" : index === 1 ? "meditation" : "sleep"
              }
            />
            <p
              className={cn(
                "text-sm text-mindful-text/70",
                getLanguageFont(language),
              )}
            >
              {index === 0
                ? language === "th"
                  ? "หน้าหลัก"
                  : "Home Screen"
                : index === 1
                  ? language === "th"
                    ? "การทำสมาธิ"
                    : "Meditation"
                  : language === "th"
                    ? "การนอน"
                    : "Sleep"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { smartWatchDevices } from "@/lib/smartwatch";

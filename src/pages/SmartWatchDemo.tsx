import { useState } from "react";
import { motion } from "framer-motion";
import { Watch, Smartphone, Activity, Moon, Play } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { SmartWatchShowcase } from "@/components/SmartWatchUI";
import { useSmartWatch } from "@/lib/smartwatch";
import { cn } from "@/lib/utils";

export default function SmartWatchDemo() {
  const { language } = useLanguage();
  const { sendNotification } = useSmartWatch();
  const [activeDemo, setActiveDemo] = useState<
    "notifications" | "ui" | "features"
  >("features");

  const handleTestNotification = (type: "stress" | "meditation" | "sleep") => {
    const messages = {
      stress: {
        th: "ระดับความเครียดสูง ลองทำการหายใจลึกๆ ดู",
        en: "High stress detected. Try some deep breathing.",
      },
      meditation: {
        th: "เวลาทำสมาธิแล้ว! มาเริ่มกันเถอะ",
        en: "Time for meditation! Let's get started.",
      },
      sleep: {
        th: "เวลาเตรียมตัวนอนแล้ว ลองฟังสมาธิก่อนนอนดู",
        en: "Time to wind down. Try our bedtime meditation.",
      },
    };

    sendNotification(messages[type][language], type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-mindful-mint rounded-full p-4 w-fit mx-auto mb-4">
            <Watch size={32} className="text-mindful-dark-green" />
          </div>
          <h1
            className={cn(
              "text-2xl font-bold text-mindful-text",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "สมาร์ทวอทช์เดโม" : "Smartwatch Demo"}
          </h1>
          <p
            className={cn(
              "text-mindful-text/70 mt-2",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "ทดสอบและดูตัวอย่างการทำงานของสมาร์ทวอทช์"
              : "Test and preview smartwatch functionality"}
          </p>
        </motion.div>
      </div>

      {/* Demo Tabs */}
      <div className="px-4 mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            {
              key: "features",
              label: language === "th" ? "คุณสมบัติ" : "Features",
              icon: Activity,
            },
            {
              key: "ui",
              label: language === "th" ? "หน้าจอ" : "UI",
              icon: Smartphone,
            },
            {
              key: "notifications",
              label: language === "th" ? "แจ้งเตือน" : "Notifications",
              icon: Watch,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveDemo(tab.key as any)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-200",
                  activeDemo === tab.key
                    ? "bg-white text-mindful-dark-green shadow-sm"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                <Icon size={16} />
                <span
                  className={cn(
                    "text-sm font-medium",
                    getLanguageFont(language),
                  )}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Demo Content */}
      <div className="px-4">
        {activeDemo === "features" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {[
              {
                icon: Activity,
                title:
                  language === "th"
                    ? "การติดตามความเครียด"
                    : "Stress Monitoring",
                description:
                  language === "th"
                    ? "วิเคราะห์อัตราการเต้นของหัวใจเพื่อประเมินระดับค��ามเครียด"
                    : "Analyze heart rate to assess stress levels",
                status: "active",
              },
              {
                icon: Moon,
                title: language === "th" ? "การติดตามการนอน" : "Sleep Tracking",
                description:
                  language === "th"
                    ? "ติดตามคุณภาพการนอนและให้คำแนะนำ"
                    : "Track sleep quality and provide recommendations",
                status: "active",
              },
              {
                icon: Play,
                title:
                  language === "th"
                    ? "การแจ้งเตือนสมาธิ"
                    : "Meditation Reminders",
                description:
                  language === "th"
                    ? "แจ้งเตือนให้ทำสมาธิในเวลาที่เหมาะสม"
                    : "Smart reminders for meditation at optimal times",
                status: "active",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-mindful-mint rounded-lg p-2 flex-shrink-0">
                      <Icon size={20} className="text-mindful-dark-green" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-semibold text-mindful-text mb-1",
                          getLanguageFont(language),
                        )}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={cn(
                          "text-mindful-text/70 text-sm",
                          getLanguageFont(language),
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeDemo === "ui" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SmartWatchShowcase />
          </motion.div>
        )}

        {activeDemo === "notifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-6">
              <h3
                className={cn(
                  "text-lg font-semibold text-mindful-text mb-4",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "ทดสอบการแจ้งเตือน" : "Test Notifications"}
              </h3>

              <div className="space-y-3">
                {[
                  {
                    type: "stress" as const,
                    label:
                      language === "th"
                        ? "แจ้งเตือนความเครียด"
                        : "Stress Alert",
                    description:
                      language === "th"
                        ? "ทดสอบการแจ้งเตือนเมื่อตรวจพบความเครียดสูง"
                        : "Test notification for high stress detection",
                    color: "bg-red-100 text-red-800",
                  },
                  {
                    type: "meditation" as const,
                    label:
                      language === "th"
                        ? "แจ้งเตือนสมาธิ"
                        : "Meditation Reminder",
                    description:
                      language === "th"
                        ? "ทดสอบการแจ้งเตือนให้ทำสมาธิ"
                        : "Test meditation reminder notification",
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    type: "sleep" as const,
                    label:
                      language === "th" ? "แจ้งเตือนก่อนนอน" : "Sleep Reminder",
                    description:
                      language === "th"
                        ? "ทดสอบการแจ้งเตือนเตรียมตัวนอน"
                        : "Test bedtime preparation notification",
                    color: "bg-purple-100 text-purple-800",
                  },
                ].map((notification) => (
                  <motion.div
                    key={notification.type}
                    className="border border-gray-200 rounded-lg p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-medium text-mindful-text mb-1",
                            getLanguageFont(language),
                          )}
                        >
                          {notification.label}
                        </h4>
                        <p
                          className={cn(
                            "text-sm text-mindful-text/70",
                            getLanguageFont(language),
                          )}
                        >
                          {notification.description}
                        </p>
                      </div>
                      <motion.button
                        onClick={() =>
                          handleTestNotification(notification.type)
                        }
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium",
                          "bg-mindful-dark-green text-white",
                          "hover:bg-mindful-dark-green/90 transition-colors duration-200",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "ทดสอบ" : "Test"}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-mindful-soft-blue rounded-lg">
                <p
                  className={cn(
                    "text-sm text-mindful-text/80",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "หมายเหตุ: การแจ้งเตือนจะปรากฏในเบราว์เซอร์และใน console สำหรับการทดสอบ"
                    : "Note: Notifications will appear in browser and console for testing purposes"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

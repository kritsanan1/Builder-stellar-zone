import { motion } from "framer-motion";
import { Play, Heart, Brain, Moon, Crown } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import StressLevelCard from "@/components/StressLevelCard";
import ContentGrid from "@/components/ContentGrid";
import { cn } from "@/lib/utils";

const mentalHealthTips = [
  {
    icon: Heart,
    key: "tip1" as const,
  },
  {
    icon: Brain,
    key: "tip2" as const,
  },
  {
    icon: Moon,
    key: "tip3" as const,
  },
];

export default function Home() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-8">
        <motion.h1
          className={cn(
            "text-2xl font-bold text-mindful-text",
            getLanguageFont(language),
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MindfulThai
        </motion.h1>
        <LanguageToggle />
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Daily Mood Summary Card */}
        <motion.div
          className="bg-mindful-soft-blue rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2
            className={cn(
              "text-lg font-semibold text-mindful-text mb-3",
              getLanguageFont(language),
            )}
          >
            {t("dailyMoodSummary")}
          </h2>
          <p
            className={cn(
              "text-mindful-text/80 leading-relaxed",
              getLanguageFont(language),
            )}
          >
            {t("moodSummaryText")}
          </p>

          {/* Mood visualization */}
          <div className="flex justify-center mt-4">
            <motion.div
              className="w-16 h-16 bg-mindful-mint rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🧘‍♀️</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Start Meditation CTA */}
        <motion.button
          className={cn(
            "w-full bg-mindful-dark-green text-white rounded-2xl p-6 shadow-lg",
            "hover:bg-mindful-dark-green/90 active:scale-[0.98] transition-all duration-200",
            getLanguageFont(language),
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Play size={28} fill="white" />
            </motion.div>
            <span className="text-xl font-semibold">
              {t("startMeditation")}
            </span>
          </div>
        </motion.button>

        {/* Stress Level Card */}
        <StressLevelCard />

        {/* Mental Health Tips */}
        <div>
          <motion.h3
            className={cn(
              "text-lg font-semibold text-mindful-text mb-4",
              getLanguageFont(language),
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("mentalHealthTips")}
          </motion.h3>

          <div className="space-y-3">
            {mentalHealthTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.key}
                  className="bg-mindful-mint rounded-xl p-4 flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="bg-white rounded-lg p-2 flex-shrink-0">
                    <Icon size={20} className="text-mindful-dark-green" />
                  </div>
                  <p
                    className={cn(
                      "text-mindful-text flex-1 leading-relaxed",
                      getLanguageFont(language),
                    )}
                  >
                    {t(tip.key)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Premium Upgrade */}
        <motion.div
          className="bg-gradient-to-r from-mindful-dark-green/10 to-mindful-mint border border-mindful-dark-green/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Crown size={24} className="text-mindful-dark-green" />
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
              ? "ปลดล็อกเนื้อหาเพิ่มเติม, การจองนักบำบัด และคุณสมบัติ AI ขั้นสูง"
              : "Unlock additional content, therapist booking, and advanced AI features"}
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

        {/* Content Section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2
            className={cn(
              "text-xl font-semibold text-mindful-text mb-4",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "เนื้อหาแนะนำ" : "Recommended Content"}
          </h2>
          <ContentGrid />
        </motion.div>
      </div>
    </div>
  );
}

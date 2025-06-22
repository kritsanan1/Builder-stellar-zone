import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, BookOpen, Wind, Clock, Crown, Volume2 } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  type: "meditation" | "article" | "breathing";
  title: { th: string; en: string };
  description: { th: string; en: string };
  duration?: number; // in minutes
  thumbnail: string;
  isPremium: boolean;
  audioLanguages?: ("th" | "en")[];
  category: "sleep" | "stress" | "anxiety" | "focus" | "happiness";
}

const contentItems: ContentItem[] = [
  {
    id: "sleep-meditation-1",
    type: "meditation",
    title: {
      th: "สมาธิก่อนนอน",
      en: "Bedtime Meditation",
    },
    description: {
      th: "สมาธิเพื่อการนอนหลับที่ลึกและสงบ",
      en: "Deep and peaceful sleep meditation",
    },
    duration: 15,
    thumbnail: "🌙",
    isPremium: false,
    audioLanguages: ["th", "en"],
    category: "sleep",
  },
  {
    id: "stress-relief-1",
    type: "meditation",
    title: {
      th: "ผ่อนคลายความเครียด",
      en: "Stress Relief",
    },
    description: {
      th: "ปลดปล่อยความเครียดด้วยการสมาธิ",
      en: "Release stress through mindful meditation",
    },
    duration: 10,
    thumbnail: "🧘‍♀️",
    isPremium: false,
    audioLanguages: ["th", "en"],
    category: "stress",
  },
  {
    id: "breathing-exercise-1",
    type: "breathing",
    title: {
      th: "หายใจ 4-7-8",
      en: "4-7-8 Breathing",
    },
    description: {
      th: "เทคนิคหายใจเพื่อความสงบทันที",
      en: "Breathing technique for instant calm",
    },
    duration: 5,
    thumbnail: "💨",
    isPremium: false,
    category: "anxiety",
  },
  {
    id: "mindfulness-article-1",
    type: "article",
    title: {
      th: "พื้นฐานการฝึกสติ",
      en: "Mindfulness Basics",
    },
    description: {
      th: "เรียนรู้หลักการฝึกสติในชีวิตประจำวัน",
      en: "Learn mindfulness principles for daily life",
    },
    thumbnail: "📖",
    isPremium: false,
    category: "focus",
  },
  {
    id: "advanced-meditation-1",
    type: "meditation",
    title: {
      th: "สมาธิขั้นสูง",
      en: "Advanced Meditation",
    },
    description: {
      th: "เทคนิคสมาธิสำหรับผู้ที่มีประสบการณ์",
      en: "Advanced techniques for experienced practitioners",
    },
    duration: 20,
    thumbnail: "🔮",
    isPremium: true,
    audioLanguages: ["th", "en"],
    category: "focus",
  },
  {
    id: "loving-kindness-1",
    type: "meditation",
    title: {
      th: "เมตตาสมาธิ",
      en: "Loving Kindness",
    },
    description: {
      th: "ฝึกการให้อภัยและเมตตากรุณา",
      en: "Practice forgiveness and compassion",
    },
    duration: 12,
    thumbnail: "💝",
    isPremium: true,
    audioLanguages: ["th", "en"],
    category: "happiness",
  },
];

const categories = [
  { key: "all", label: { th: "ทั้งหมด", en: "All" } },
  { key: "sleep", label: { th: "การนอน", en: "Sleep" } },
  { key: "stress", label: { th: "ความเครียด", en: "Stress" } },
  { key: "anxiety", label: { th: "ความกังวล", en: "Anxiety" } },
  { key: "focus", label: { th: "สมาธิ", en: "Focus" } },
  { key: "happiness", label: { th: "ความสุข", en: "Happiness" } },
];

export default function ContentGrid() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredItems = contentItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "all" || item.category === selectedCategory;
    const premiumMatch = !showPremiumOnly || item.isPremium;
    return categoryMatch && premiumMatch;
  });

  const handlePlay = (itemId: string) => {
    if (playingId === itemId) {
      setPlayingId(null);
    } else {
      setPlayingId(itemId);
      // In a real app, this would start playing the audio/content
      console.log("Playing content:", itemId);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sleep":
        return "bg-blue-100 text-blue-800";
      case "stress":
        return "bg-red-100 text-red-800";
      case "anxiety":
        return "bg-yellow-100 text-yellow-800";
      case "focus":
        return "bg-purple-100 text-purple-800";
      case "happiness":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meditation":
        return Play;
      case "article":
        return BookOpen;
      case "breathing":
        return Wind;
      default:
        return Play;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                getLanguageFont(language),
                selectedCategory === category.key
                  ? "bg-mindful-dark-green text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              {category.label[language]}
            </motion.button>
          ))}
        </div>

        {/* Premium Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={cn(
                "text-sm text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "แสดงเฉพาะพรีเมียม" : "Premium only"}
            </span>
            <motion.button
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className={cn(
                "w-11 h-6 rounded-full transition-colors duration-200 relative",
                showPremiumOnly ? "bg-mindful-dark-green" : "bg-gray-300",
              )}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5"
                animate={{ x: showPremiumOnly ? 20 : 2 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>

          <span
            className={cn(
              "text-sm text-mindful-text/70",
              getLanguageFont(language),
            )}
          >
            {filteredItems.length} {language === "th" ? "รายการ" : "items"}
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" layout>
        <AnimatePresence>
          {filteredItems.map((item) => {
            const Icon = getTypeIcon(item.type);
            const isPlaying = playingId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                {/* Thumbnail */}
                <div className="relative mb-4">
                  <div className="bg-mindful-soft-blue rounded-lg h-32 flex items-center justify-center text-4xl">
                    {item.thumbnail}
                  </div>

                  {item.isPremium && (
                    <div className="absolute top-2 right-2 bg-mindful-dark-green text-white rounded-full p-1">
                      <Crown size={12} />
                    </div>
                  )}

                  {item.type === "meditation" && (
                    <motion.button
                      onClick={() => handlePlay(item.id)}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center",
                        "opacity-0 hover:opacity-100 transition-opacity duration-200",
                      )}
                    >
                      <div className="bg-white/90 rounded-full p-3">
                        <Icon size={24} className="text-mindful-dark-green" />
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Content Info */}
                <div className="space-y-3">
                  <div>
                    <h3
                      className={cn(
                        "font-semibold text-mindful-text mb-1",
                        getLanguageFont(language),
                      )}
                    >
                      {item.title[language]}
                    </h3>
                    <p
                      className={cn(
                        "text-sm text-mindful-text/70",
                        getLanguageFont(language),
                      )}
                    >
                      {item.description[language]}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.duration && (
                        <div className="flex items-center space-x-1 text-xs text-mindful-text/60">
                          <Clock size={12} />
                          <span>
                            {item.duration} {language === "th" ? "นาที" : "min"}
                          </span>
                        </div>
                      )}

                      <div
                        className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          getCategoryColor(item.category),
                        )}
                      >
                        {
                          categories.find((c) => c.key === item.category)
                            ?.label[language]
                        }
                      </div>
                    </div>

                    {item.audioLanguages && (
                      <div className="flex items-center space-x-1">
                        <Volume2 size={12} className="text-mindful-text/60" />
                        <span className="text-xs text-mindful-text/60">
                          {item.audioLanguages.join("/")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => handlePlay(item.id)}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-full py-3 rounded-xl font-medium transition-all duration-200",
                      "flex items-center justify-center space-x-2",
                      getLanguageFont(language),
                      isPlaying
                        ? "bg-mindful-mint text-mindful-dark-green"
                        : item.isPremium && !showPremiumOnly
                          ? "bg-gradient-to-r from-mindful-dark-green to-mindful-dark-green/80 text-white"
                          : "bg-mindful-dark-green text-white hover:bg-mindful-dark-green/90",
                    )}
                  >
                    <Icon size={16} />
                    <span>
                      {isPlaying
                        ? language === "th"
                          ? "กำลังเล่น"
                          : "Playing"
                        : item.type === "article"
                          ? language === "th"
                            ? "อ่าน"
                            : "Read"
                          : language === "th"
                            ? "เล่น"
                            : "Play"}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">🔍</div>
          <p className={cn("text-mindful-text/70", getLanguageFont(language))}>
            {language === "th"
              ? "ไม่พบเนื้อหาในหมวดหมู่นี้"
              : "No content found in this category"}
          </p>
        </motion.div>
      )}
    </div>
  );
}

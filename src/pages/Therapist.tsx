import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter, MapPin, Star, Crown } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import TherapistCard from "@/components/TherapistCard";
import { cn } from "@/lib/utils";

const therapists = [
  {
    id: "therapist-1",
    name: { th: "ดร.สมศรี ใจดี", en: "Dr. Somsri Jaidee" },
    specialty: { th: "จิตบำบัดผู้ใหญ่", en: "Adult Psychotherapy" },
    bio: {
      th: "นักจิตวิทยาคลินิกที่มีประสบการณ์ 15 ปี เชี่ยวชาญการบำบัดด้วย CBT และ DBT สำหรับปัญหาวิตกกังวลและซึมเศร้า",
      en: "Clinical psychologist with 15 years experience, specializing in CBT and DBT for anxiety and depression",
    },
    rating: 4.9,
    reviewCount: 127,
    price: 2500,
    currency: "THB" as const,
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    avatar: "👩‍⚕️",
    languages: ["ไทย", "English"],
    isPremium: false,
    nextAvailable: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "therapist-2",
    name: { th: "ดร.วิชัย มานะ", en: "Dr. Wichai Mana" },
    specialty: { th: "จิตบำบัดครอบครัว", en: "Family Therapy" },
    bio: {
      th: "ผู้เชี่ยวชาญด้านการบำบัดครอบครัวและคู่รัก เน้นการสื่อสารและแก้ไขความสัมพันธ์ในครอบครัว",
      en: "Family and couples therapy specialist, focusing on communication and relationship repair",
    },
    rating: 4.8,
    reviewCount: 89,
    price: 3000,
    currency: "THB" as const,
    location: { th: "เชียงใหม่", en: "Chiang Mai" },
    avatar: "👨‍⚕️",
    languages: ["ไทย", "English"],
    isPremium: true,
    nextAvailable: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "therapist-3",
    name: { th: "ดร.นิภา สุขใจ", en: "Dr. Nipha Sukjai" },
    specialty: { th: "จิตบำบัดเด็กและวัยรุ่น", en: "Child & Teen Therapy" },
    bio: {
      th: "จิตแพทย์เด็ก���ละวัยรุ่น เชี่ยวชาญการบำบัดเด็กที่มีปัญหาพฤติกรรมและการเรียนรู้",
      en: "Child and adolescent psychiatrist specializing in behavioral and learning difficulties",
    },
    rating: 4.7,
    reviewCount: 156,
    price: 2800,
    currency: "THB" as const,
    location: { th: "ภูเก็ต", en: "Phuket" },
    avatar: "👩‍⚕️",
    languages: ["ไทย", "English", "中文"],
    isPremium: true,
    nextAvailable: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "therapist-4",
    name: { th: "ดร.สุชาติ รักษ์ดี", en: "Dr. Suchat Rakdee" },
    specialty: { th: "การบำบัดเสพติด", en: "Addiction Therapy" },
    bio: {
      th: "ผู้เชี่ยวชาญด้านการบำบัดผู้เสพติดและการฟื้นฟู มีประสบการณ์ในการช่วยเหลือผู้ป่วยมากว่า 20 ปี",
      en: "Addiction specialist and rehabilitation expert with over 20 years of experience",
    },
    rating: 4.6,
    reviewCount: 93,
    price: 3500,
    currency: "THB" as const,
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    avatar: "👨‍⚕️",
    languages: ["ไทย", "English"],
    isPremium: false,
    nextAvailable: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
  },
];

const filterOptions = [
  { key: "all", label: { th: "ทั้งหมด", en: "All" } },
  { key: "adult", label: { th: "ผู้ใหญ่", en: "Adult" } },
  { key: "family", label: { th: "ครอบครัว", en: "Family" } },
  { key: "child", label: { th: "เด็ก", en: "Child" } },
  { key: "addiction", label: { th: "เสพติด", en: "Addiction" } },
];

const sortOptions = [
  { key: "rating", label: { th: "คะแนนสูงสุด", en: "Highest Rated" } },
  { key: "price_low", label: { th: "ราคาต่ำสุด", en: "Lowest Price" } },
  { key: "price_high", label: { th: "ราคาสูงสุด", en: "Highest Price" } },
  {
    key: "availability",
    label: { th: "ว่างเร็วสุด", en: "Earliest Available" },
  },
];

export default function Therapist() {
  const { language, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("rating");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedTherapists = therapists
    .filter((therapist) => {
      // Filter by specialty
      const specialtyMatch =
        selectedFilter === "all" ||
        therapist.specialty.en.toLowerCase().includes(selectedFilter);

      // Filter by premium
      const premiumMatch = !showPremiumOnly || therapist.isPremium;

      // Filter by search
      const searchMatch =
        !searchQuery ||
        therapist.name[language]
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        therapist.specialty[language]
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return specialtyMatch && premiumMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "rating":
          return b.rating - a.rating;
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "availability":
          return a.nextAvailable.getTime() - b.nextAvailable.getTime();
        default:
          return 0;
      }
    });

  const handleBooking = (therapistId: string) => {
    console.log("Booking confirmed for therapist:", therapistId);
    // In a real app, this would handle the booking confirmation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <motion.div
          className="flex items-center space-x-3 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-mindful-mint rounded-lg p-2">
            <Users size={24} className="text-mindful-dark-green" />
          </div>
          <div>
            <h1
              className={cn(
                "text-2xl font-bold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {t("therapist")}
            </h1>
            <p
              className={cn(
                "text-sm text-mindful-text/70",
                getLanguageFont(language),
              )}
            >
              {language === "th"
                ? "นักบำบัดมืออาชีพ"
                : "Professional therapists"}
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "th" ? "ค้นหานักบำบัด..." : "Search therapists..."
            }
            className={cn(
              "w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200",
              "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
              "transition-all duration-200",
              getLanguageFont(language),
            )}
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <motion.button
                key={option.key}
                onClick={() => setSelectedFilter(option.key)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  getLanguageFont(language),
                  selectedFilter === option.key
                    ? "bg-mindful-dark-green text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                {option.label[language]}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Premium Toggle */}
              <div className="flex items-center space-x-2">
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
                <div className="flex items-center space-x-1">
                  <Crown size={16} className="text-mindful-dark-green" />
                  <span
                    className={cn(
                      "text-sm text-mindful-text",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "พรีเมียม" : "Premium"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className={cn(
                "px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm",
                "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
                getLanguageFont(language),
              )}
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label[language]}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>

      {/* Results Summary */}
      <div className="px-4 mb-4">
        <p
          className={cn(
            "text-sm text-mindful-text/70",
            getLanguageFont(language),
          )}
        >
          {filteredAndSortedTherapists.length}{" "}
          {language === "th" ? "นักบำบัดพบ" : "therapists found"}
        </p>
      </div>

      {/* Therapist Cards */}
      <div className="px-4 space-y-4">
        {filteredAndSortedTherapists.map((therapist, index) => (
          <motion.div
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TherapistCard therapist={therapist} onBook={handleBooking} />
          </motion.div>
        ))}
      </div>

      {filteredAndSortedTherapists.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 px-4"
        >
          <div className="text-4xl mb-4">🔍</div>
          <p className={cn("text-mindful-text/70", getLanguageFont(language))}>
            {language === "th"
              ? "ไม่พบนักบำบัดที่ตรงกับเงื่อนไขการค้นหา"
              : "No therapists match your search criteria"}
          </p>
        </motion.div>
      )}

      {/* Premium CTA */}
      <motion.div
        className="mx-4 mt-8 bg-gradient-to-r from-mindful-dark-green/10 to-mindful-mint border border-mindful-dark-green/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <Crown size={24} className="text-mindful-dark-green" />
          <h3
            className={cn(
              "text-lg font-semibold text-mindful-text",
              getLanguageFont(language),
            )}
          >
            {language === "th"
              ? "เข้าถึงนักบำบัดพรีเมียม"
              : "Access Premium Therapists"}
          </h3>
        </div>
        <p
          className={cn("text-mindful-text/70 mb-4", getLanguageFont(language))}
        >
          {language === "th"
            ? "จองนัดหมายกับนักบำบัดที่มีประสบการณ์สูงและได้รับการรับรอง"
            : "Book with highly experienced and certified premium therapists"}
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
      </motion.div>
    </div>
  );
}

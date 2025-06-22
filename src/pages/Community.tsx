import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, TrendingUp, Shield, Search } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { useCommunity } from "@/lib/community";
import CommunityRoomCard from "@/components/CommunityRoomCard";
import CommunityGuidelinesModal from "@/components/CommunityGuidelinesModal";
import { cn } from "@/lib/utils";

export default function Community() {
  const { language, t } = useLanguage();
  const { rooms, analytics } = useCommunity();
  const [searchQuery, setSearchQuery] = useState("");
  const [showGuidelines, setShowGuidelines] = useState(false);

  const filteredRooms = rooms.filter(
    (room) =>
      room.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description[language]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const handleJoinRoom = (roomId: string) => {
    // Navigate to specific room
    window.location.href = `/community/${roomId}`;
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
            <MessageSquare size={24} className="text-mindful-dark-green" />
          </div>
          <div>
            <h1
              className={cn(
                "text-2xl font-bold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {t("community")}
            </h1>
            <p
              className={cn(
                "text-sm text-mindful-text/70",
                getLanguageFont(language),
              )}
            >
              {language === "th"
                ? "ชุมชนสนับสนุนสุขภาพจิต"
                : "Mental health support community"}
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="relative mb-6"
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
              language === "th" ? "ค้นหาห้องสนทนา..." : "Search chat rooms..."
            }
            className={cn(
              "w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200",
              "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
              "transition-all duration-200",
              getLanguageFont(language),
            )}
          />
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-4 text-center">
            <Users size={24} className="text-mindful-dark-green mx-auto mb-2" />
            <div className="text-xl font-bold text-mindful-text">
              {analytics.activeUsers}
            </div>
            <div
              className={cn(
                "text-xs text-mindful-text/60",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ผู้ใช้ใช้งานอยู่" : "Active Users"}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <MessageSquare
              size={24}
              className="text-mindful-dark-green mx-auto mb-2"
            />
            <div className="text-xl font-bold text-mindful-text">
              {analytics.totalPosts}
            </div>
            <div
              className={cn(
                "text-xs text-mindful-text/60",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "โพสต์ทั้งหมด" : "Total Posts"}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <TrendingUp
              size={24}
              className="text-mindful-dark-green mx-auto mb-2"
            />
            <div className="text-xl font-bold text-mindful-text">
              {analytics.engagementRate}%
            </div>
            <div
              className={cn(
                "text-xs text-mindful-text/60",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "การมีส่วนร่วม" : "Engagement"}
            </div>
          </div>
        </motion.div>

        {/* Community Guidelines Banner */}
        <motion.div
          className="bg-gradient-to-r from-mindful-dark-green to-mindful-dark-green/80 rounded-2xl p-6 text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Shield size={24} />
            <h2 className={cn("text-lg font-bold", getLanguageFont(language))}>
              {language === "th" ? "ชุมชนที่ปลอดภัย" : "Safe Community"}
            </h2>
          </div>
          <p className={cn("text-white/90 mb-4", getLanguageFont(language))}>
            {language === "th"
              ? "พื้นที่ปลอดภัยสำหรับการแบ่งปันและรับการสนับสนุนด้านสุขภาพจิต"
              : "A safe space for sharing and receiving mental health support"}
          </p>
          <motion.button
            onClick={() => setShowGuidelines(true)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "bg-white text-mindful-dark-green px-4 py-2 rounded-lg font-medium",
              "hover:bg-gray-100 transition-colors duration-200",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "อ่านหลักการชุมชน" : "Read Guidelines"}
          </motion.button>
        </motion.div>
      </div>

      {/* Room Cards */}
      <div className="px-4">
        <motion.h2
          className={cn(
            "text-lg font-semibold text-mindful-text mb-4",
            getLanguageFont(language),
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {language === "th" ? "ห้องสนทนา" : "Chat Rooms"}
        </motion.h2>

        <div className="space-y-4">
          {filteredRooms.map((room, index) => (
            <CommunityRoomCard
              key={room.id}
              room={room}
              onJoin={handleJoinRoom}
              index={index}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🔍</div>
            <p
              className={cn("text-mindful-text/70", getLanguageFont(language))}
            >
              {language === "th"
                ? "ไม่พบห้องสนทนาที่ตรงกับการค้นหา"
                : "No chat rooms match your search"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Privacy Notice */}
      <motion.div
        className="mx-4 mt-8 bg-mindful-mint rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <Shield size={16} className="text-mindful-dark-green" />
          <span
            className={cn(
              "text-sm font-medium text-mindful-text",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "ความเป็นส่วนตัว" : "Privacy Protected"}
          </span>
        </div>
        <p
          className={cn(
            "text-xs text-mindful-text/80",
            getLanguageFont(language),
          )}
        >
          {language === "th"
            ? "การสนทนาทั้งหมดถูกควบคุมโดย AI และปฏิบัติตาม PDPA • ข้อมูลไม่ถูกแชร์กับบุคคลที่สาม"
            : "All conversations are AI-moderated and PDPA compliant • Data is never shared with third parties"}
        </p>
      </motion.div>

      {/* Community Guidelines Modal */}
      <CommunityGuidelinesModal
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
      />
    </div>
  );
}

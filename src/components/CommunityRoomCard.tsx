import { motion } from "framer-motion";
import { Users, Clock, ChevronRight } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { CommunityRoom } from "@/lib/community";
import { cn } from "@/lib/utils";

interface CommunityRoomCardProps {
  room: CommunityRoom;
  onJoin: (roomId: string) => void;
  index: number;
}

export default function CommunityRoomCard({
  room,
  onJoin,
  index,
}: CommunityRoomCardProps) {
  const { language } = useLanguage();

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case "stress":
        return "bg-red-100 text-red-800";
      case "sleep":
        return "bg-blue-100 text-blue-800";
      case "relationships":
        return "bg-pink-100 text-pink-800";
      case "mindfulness":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diff < 1) {
      return language === "th" ? "เมื่อกี้" : "Just now";
    } else if (diff < 60) {
      return language === "th" ? `${diff} นาทีที่แล้ว` : `${diff}m ago`;
    } else if (diff < 1440) {
      const hours = Math.floor(diff / 60);
      return language === "th" ? `${hours} ชั่วโมงที่แล้ว` : `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-mindful-soft-blue rounded-full p-3 text-2xl">
            {room.icon}
          </div>
          <div className="flex-1">
            <h3
              className={cn(
                "font-semibold text-mindful-text mb-1",
                getLanguageFont(language),
              )}
            >
              {room.title[language]}
            </h3>
            <div
              className={cn(
                "px-2 py-1 rounded-full text-xs inline-block",
                getTopicColor(room.topic),
              )}
            >
              {room.topic.charAt(0).toUpperCase() + room.topic.slice(1)}
            </div>
          </div>
        </div>

        {room.isActive && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span
              className={cn(
                "text-xs text-green-600",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ใช้งานอยู่" : "Active"}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className={cn(
          "text-sm text-mindful-text/70 mb-4 line-clamp-2",
          getLanguageFont(language),
        )}
      >
        {room.description[language]}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-mindful-text/60">
          <div className="flex items-center space-x-1">
            <Users size={14} />
            <span className={getLanguageFont(language)}>
              {room.userCount} {language === "th" ? "คน" : "users"}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span className={getLanguageFont(language)}>
              {formatTime(room.lastActivity)}
            </span>
          </div>
        </div>
      </div>

      {/* Join Button */}
      <motion.button
        onClick={() => onJoin(room.id)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "w-full bg-mindful-dark-green text-white rounded-xl py-3 font-medium",
          "hover:bg-mindful-dark-green/90 transition-all duration-200",
          "flex items-center justify-center space-x-2",
          getLanguageFont(language),
        )}
      >
        <span>{language === "th" ? "เข้าร่วมห้อง" : "Join Room"}</span>
        <ChevronRight size={16} />
      </motion.button>
    </motion.div>
  );
}

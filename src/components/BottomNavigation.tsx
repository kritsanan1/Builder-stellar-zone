import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageCircle, BookOpen, Users, User } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    key: "home",
    path: "/",
    icon: Home,
    translationKey: "home" as const,
  },
  {
    key: "ai-chat",
    path: "/ai-chat",
    icon: MessageCircle,
    translationKey: "aiChat" as const,
  },
  {
    key: "content",
    path: "/content",
    icon: BookOpen,
    translationKey: "content" as const,
  },
  {
    key: "therapist",
    path: "/therapist",
    icon: Users,
    translationKey: "therapist" as const,
  },
  {
    key: "profile",
    path: "/profile",
    icon: User,
    translationKey: "profile" as const,
  },
];

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.key}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 1.1 }}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                "hover:bg-mindful-soft-blue active:scale-95",
                isActive && "text-mindful-dark-green",
                !isActive && "text-gray-500",
              )}
            >
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  size={24}
                  className={cn(
                    "transition-colors duration-200",
                    isActive && "text-mindful-dark-green",
                    !isActive && "text-gray-400",
                  )}
                />
              </motion.div>

              <span
                className={cn(
                  "text-xs mt-1 transition-colors duration-200",
                  getLanguageFont(language),
                  isActive && "text-mindful-dark-green font-medium",
                  !isActive && "text-gray-500",
                )}
              >
                {t(item.translationKey)}
              </span>

              {isActive && (
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-mindful-dark-green rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

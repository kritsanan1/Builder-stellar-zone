import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      {(["th", "en"] as Language[]).map((lang) => (
        <motion.button
          key={lang}
          onClick={() => switchLanguage(lang)}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative px-3 py-1 text-sm font-medium rounded-full transition-all duration-200",
            language === lang
              ? "text-white"
              : "text-gray-600 hover:text-gray-900",
          )}
        >
          {language === lang && (
            <motion.div
              className="absolute inset-0 bg-mindful-dark-green rounded-full"
              layoutId="language-active-bg"
              transition={{ duration: 0.2 }}
            />
          )}
          <span className="relative z-10">{lang === "th" ? "ไทย" : "EN"}</span>
        </motion.button>
      ))}
    </div>
  );
}

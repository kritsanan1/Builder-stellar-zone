import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Check,
  Loader2,
  Package,
  Users,
  BookOpen,
} from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { InAppPurchase, usePricing } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface InAppPurchaseCardProps {
  purchase: InAppPurchase;
  onPurchase?: (purchaseId: string) => void;
  index: number;
}

export default function InAppPurchaseCard({
  purchase,
  onPurchase,
  index,
}: InAppPurchaseCardProps) {
  const { language } = useLanguage();
  const { formatPrice, isPurchased } = usePricing();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const purchased = isPurchased(purchase.id);

  const handlePurchase = async () => {
    if (purchased) return;

    setIsPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setIsPurchasing(false);
    onPurchase?.(purchase.id);
  };

  const getIcon = () => {
    switch (purchase.type) {
      case "meditation_pack":
        return Package;
      case "therapist_session":
        return Users;
      case "premium_content":
        return BookOpen;
      default:
        return Package;
    }
  };

  const getTypeColor = () => {
    switch (purchase.type) {
      case "meditation_pack":
        return "bg-blue-100 text-blue-800";
      case "therapist_session":
        return "bg-green-100 text-green-800";
      case "premium_content":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = () => {
    const labels = {
      meditation_pack: { th: "แพ็คสมาธิ", en: "Meditation Pack" },
      therapist_session: { th: "เซสชันนักบำบัด", en: "Therapist Session" },
      premium_content: { th: "เนื้อหาพรีเมียม", en: "Premium Content" },
    };
    return labels[purchase.type][language];
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "bg-white rounded-2xl p-6 border border-gray-200 hover:border-mindful-dark-green/30",
        "hover:shadow-md transition-all duration-200",
        purchased && "ring-2 ring-mindful-mint",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-mindful-soft-blue rounded-lg p-2">
            <Icon size={24} className="text-mindful-dark-green" />
          </div>
          <div>
            <h3
              className={cn(
                "font-semibold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {purchase.name[language]}
            </h3>
            <div
              className={cn(
                "text-xs px-2 py-1 rounded-full inline-block mt-1",
                getTypeColor(),
              )}
            >
              {getTypeLabel()}
            </div>
          </div>
        </div>

        {purchased && (
          <div className="bg-mindful-mint rounded-full p-2">
            <Check size={16} className="text-mindful-dark-green" />
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className={cn(
          "text-mindful-text/70 text-sm mb-4",
          getLanguageFont(language),
        )}
      >
        {purchase.description[language]}
      </p>

      {/* Content List */}
      {purchase.content && (
        <div className="mb-6">
          <h4
            className={cn(
              "font-medium text-mindful-text mb-3 text-sm",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "รายการเนื้อหา:" : "What's included:"}
          </h4>
          <div className="space-y-2">
            {purchase.content[language].slice(0, 3).map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                className="flex items-start space-x-2"
              >
                <div className="bg-mindful-mint rounded-full p-0.5 flex-shrink-0 mt-1">
                  <Check size={8} className="text-mindful-dark-green" />
                </div>
                <span
                  className={cn(
                    "text-xs text-mindful-text/80",
                    getLanguageFont(language),
                  )}
                >
                  {item}
                </span>
              </motion.div>
            ))}
            {purchase.content[language].length > 3 && (
              <p
                className={cn(
                  "text-xs text-mindful-text/60 ml-4",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? `และอีก ${purchase.content[language].length - 3} รายการ...`
                  : `+${purchase.content[language].length - 3} more...`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Price and Purchase */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-mindful-text">
            {formatPrice(purchase.price)}
          </div>
          <div
            className={cn(
              "text-xs text-mindful-text/60",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "ครั้งเดียว" : "One-time purchase"}
          </div>
        </div>

        <motion.button
          onClick={handlePurchase}
          disabled={isPurchasing || purchased}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "px-6 py-3 rounded-xl font-medium transition-all duration-200",
            "flex items-center space-x-2",
            getLanguageFont(language),
            purchased
              ? "bg-mindful-mint text-mindful-dark-green cursor-not-allowed"
              : "bg-mindful-dark-green text-white hover:bg-mindful-dark-green/90",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {isPurchasing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>
                {language === "th" ? "กำลังซื้อ..." : "Purchasing..."}
              </span>
            </>
          ) : purchased ? (
            <>
              <Check size={16} />
              <span>{language === "th" ? "ซื้อแล้ว" : "Purchased"}</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>{language === "th" ? "ซื้อเลย" : "Buy Now"}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Purchase success animation */}
      {purchased && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 bg-mindful-mint/10 rounded-2xl flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl"
          >
            ✨
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

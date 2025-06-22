import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Building2, Loader2 } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { PricingPlan, SubscriptionPeriod, usePricing } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
  period: SubscriptionPeriod;
  isCurrentPlan?: boolean;
  onSubscribe?: (planId: string, period: SubscriptionPeriod) => void;
  index: number;
}

export default function PricingCard({
  plan,
  period,
  isCurrentPlan = false,
  onSubscribe,
  index,
}: PricingCardProps) {
  const { language } = useLanguage();
  const { formatPrice } = usePricing();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (plan.tier === "free" || isCurrentPlan) return;

    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
    setIsSubscribing(false);
    onSubscribe?.(plan.id, period);
  };

  const getIcon = () => {
    switch (plan.tier) {
      case "free":
        return Zap;
      case "premium":
        return Crown;
      case "enterprise":
        return Building2;
      default:
        return Zap;
    }
  };

  const Icon = getIcon();
  const price = period === "monthly" ? plan.price.monthly : plan.price.yearly;
  const monthlyPrice =
    period === "yearly" ? plan.price.yearly / 12 : plan.price.monthly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "relative bg-white rounded-2xl p-6 border-2 transition-all duration-200",
        plan.popular
          ? "border-mindful-dark-green shadow-lg scale-105"
          : "border-gray-200 hover:border-mindful-dark-green/30",
        isCurrentPlan && "ring-2 ring-mindful-dark-green ring-opacity-50",
      )}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-mindful-dark-green text-white px-4 py-1 rounded-full text-sm font-medium">
            <span className={getLanguageFont(language)}>
              {language === "th" ? "แนะนำ" : "Popular"}
            </span>
          </div>
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute top-4 right-4">
          <div className="bg-mindful-mint text-mindful-dark-green px-3 py-1 rounded-full text-xs font-medium">
            <span className={getLanguageFont(language)}>
              {language === "th" ? "แผนปัจจุบัน" : "Current Plan"}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
            plan.tier === "free"
              ? "bg-gray-100"
              : plan.tier === "premium"
                ? "bg-mindful-dark-green"
                : "bg-mindful-mint",
          )}
        >
          <Icon
            size={24}
            className={cn(
              plan.tier === "free"
                ? "text-gray-600"
                : plan.tier === "premium"
                  ? "text-white"
                  : "text-mindful-dark-green",
            )}
          />
        </div>

        <h3
          className={cn(
            "text-xl font-bold text-mindful-text mb-2",
            getLanguageFont(language),
          )}
        >
          {plan.name[language]}
        </h3>

        <p
          className={cn(
            "text-mindful-text/70 text-sm",
            getLanguageFont(language),
          )}
        >
          {plan.description[language]}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        {plan.tier === "free" ? (
          <div className="text-3xl font-bold text-mindful-text">
            <span className={getLanguageFont(language)}>
              {language === "th" ? "ฟรี" : "Free"}
            </span>
          </div>
        ) : (
          <div>
            <div className="text-3xl font-bold text-mindful-text">
              {formatPrice(Math.round(monthlyPrice))}
              <span
                className={cn(
                  "text-base font-normal text-mindful-text/60",
                  getLanguageFont(language),
                )}
              >
                {plan.tier === "enterprise"
                  ? language === "th"
                    ? "/พนักงาน/เดือน"
                    : "/employee/month"
                  : language === "th"
                    ? "/เดือน"
                    : "/month"}
              </span>
            </div>

            {period === "yearly" && plan.tier !== "enterprise" && (
              <div
                className={cn(
                  "text-sm text-mindful-text/60 mt-1",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? `จ่ายรายปี ${formatPrice(plan.price.yearly)}`
                  : `Billed annually ${formatPrice(plan.price.yearly)}`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {plan.features[language].map((feature, featureIndex) => (
          <motion.div
            key={featureIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
            className="flex items-start space-x-3"
          >
            <div className="bg-mindful-mint rounded-full p-1 flex-shrink-0 mt-0.5">
              <Check size={12} className="text-mindful-dark-green" />
            </div>
            <span
              className={cn(
                "text-sm text-mindful-text flex-1",
                getLanguageFont(language),
              )}
            >
              {feature}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Limitations */}
      {plan.limitations && (
        <div className="space-y-2 mb-6 p-3 bg-gray-50 rounded-lg">
          <h4
            className={cn(
              "text-xs font-medium text-gray-600 uppercase tracking-wider",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "ข้อจำกัด" : "Limitations"}
          </h4>
          {plan.limitations[language].map((limitation, limitIndex) => (
            <div key={limitIndex} className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
              <span
                className={cn(
                  "text-xs text-gray-600",
                  getLanguageFont(language),
                )}
              >
                {limitation}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <motion.button
        onClick={handleSubscribe}
        disabled={isSubscribing || isCurrentPlan || plan.tier === "enterprise"}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all duration-200",
          "flex items-center justify-center space-x-2",
          getLanguageFont(language),
          isCurrentPlan
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : plan.tier === "free"
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : plan.tier === "enterprise"
                ? "bg-mindful-mint text-mindful-dark-green hover:bg-mindful-mint/80"
                : "bg-mindful-dark-green text-white hover:bg-mindful-dark-green/90",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        {isSubscribing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>
              {language === "th" ? "กำลังสมัคร..." : "Subscribing..."}
            </span>
          </>
        ) : isCurrentPlan ? (
          <span>{language === "th" ? "แผนปัจจุบัน" : "Current Plan"}</span>
        ) : plan.tier === "free" ? (
          <span>{language === "th" ? "แผนปัจจุบัน" : "Current Plan"}</span>
        ) : plan.tier === "enterprise" ? (
          <span>{language === "th" ? "ติดต่อฝ่ายขาย" : "Contact Sales"}</span>
        ) : (
          <span>{language === "th" ? "เริ่มใช้งาน" : "Get Started"}</span>
        )}
      </motion.button>

      {/* Enterprise note */}
      {plan.tier === "enterprise" && (
        <p
          className={cn(
            "text-xs text-center text-mindful-text/60 mt-3",
            getLanguageFont(language),
          )}
        >
          {language === "th"
            ? "ติดต่อเพื่อขอใบเสนอราคาสำหรับองค์กรของคุณ"
            : "Contact us for a custom quote for your organization"}
        </p>
      )}
    </motion.div>
  );
}

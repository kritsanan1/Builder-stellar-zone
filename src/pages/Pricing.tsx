import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Shield, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import {
  usePricing,
  pricingPlans,
  inAppPurchases,
  SubscriptionPeriod,
} from "@/lib/pricing";
import PricingCard from "@/components/PricingCard";
import InAppPurchaseCard from "@/components/InAppPurchaseCard";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userSubscription, subscribe, purchaseItem } = usePricing();
  const [selectedPeriod, setSelectedPeriod] =
    useState<SubscriptionPeriod>("monthly");
  const [activeTab, setActiveTab] = useState<"plans" | "purchases">("plans");

  const handleSubscribe = async (
    planId: string,
    period: SubscriptionPeriod,
  ) => {
    const plan = pricingPlans.find((p) => p.id === planId);
    if (!plan) return;

    try {
      await subscribe(plan.tier, period);

      // Show success toast
      const event = new CustomEvent("toast", {
        detail: {
          title: language === "th" ? "สำเร็จ!" : "Success!",
          description:
            language === "th"
              ? "สมัครสมาชิกเรียบร้อย!"
              : "Subscription activated!",
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  const handlePurchase = async (purchaseId: string) => {
    try {
      await purchaseItem(purchaseId);

      // Show success toast
      const event = new CustomEvent("toast", {
        detail: {
          title: language === "th" ? "สำเร็จ!" : "Success!",
          description:
            language === "th" ? "ซื้อสินค้าเรียบร้อย!" : "Purchase completed!",
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </motion.button>

          <div>
            <h1
              className={cn(
                "text-xl font-bold text-mindful-text",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "แผนและราคา" : "Plans & Pricing"}
            </h1>
            <p
              className={cn(
                "text-sm text-mindful-text/70",
                getLanguageFont(language),
              )}
            >
              {language === "th"
                ? "เลือกแผนที่เหมาะกับคุณ"
                : "Choose the plan that fits your needs"}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 pt-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            {
              key: "plans",
              label: language === "th" ? "แผนสมาชิก" : "Subscription Plans",
            },
            {
              key: "purchases",
              label: language === "th" ? "ซื้อเพิ่มเติม" : "In-App Purchases",
            },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200",
                getLanguageFont(language),
                activeTab === tab.key
                  ? "bg-white text-mindful-dark-green shadow-sm"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === "plans" && (
          <div className="space-y-6">
            {/* Period Toggle */}
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-xl p-1 flex">
                {(["monthly", "yearly"] as SubscriptionPeriod[]).map(
                  (period) => (
                    <motion.button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "px-6 py-2 rounded-lg font-medium transition-all duration-200",
                        getLanguageFont(language),
                        selectedPeriod === period
                          ? "bg-white text-mindful-dark-green shadow-sm"
                          : "text-gray-600 hover:text-gray-900",
                      )}
                    >
                      {period === "monthly"
                        ? language === "th"
                          ? "รายเดือน"
                          : "Monthly"
                        : language === "th"
                          ? "รายปี"
                          : "Yearly"}
                      {period === "yearly" && (
                        <span className="ml-2 bg-mindful-dark-green text-white px-2 py-0.5 rounded-full text-xs">
                          {language === "th" ? "ประหยัด 17%" : "Save 17%"}
                        </span>
                      )}
                    </motion.button>
                  ),
                )}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  period={selectedPeriod}
                  isCurrentPlan={userSubscription.tier === plan.tier}
                  onSubscribe={handleSubscribe}
                  index={index}
                />
              ))}
            </div>

            {/* Features Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 mt-8"
            >
              <h3
                className={cn(
                  "text-lg font-semibold text-mindful-text mb-6 text-center",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "เปรียบเทียบคุณสมบัติ"
                  : "Feature Comparison"}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th
                        className={cn(
                          "text-left py-3",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "คุณสมบัติ" : "Features"}
                      </th>
                      <th
                        className={cn(
                          "text-center py-3",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "ฟรี" : "Free"}
                      </th>
                      <th
                        className={cn(
                          "text-center py-3",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "พรีเมียม" : "Premium"}
                      </th>
                      <th
                        className={cn(
                          "text-center py-3",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "องค์กร" : "Enterprise"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature:
                          language === "th"
                            ? "การติดตามอารมณ์"
                            : "Mood Tracking",
                        free: "3/day",
                        premium: "∞",
                        enterprise: "∞",
                      },
                      {
                        feature: language === "th" ? "สมาธิ" : "Meditations",
                        free: "1",
                        premium: "50+",
                        enterprise: "50+",
                      },
                      {
                        feature: language === "th" ? "ชุมชน" : "Community",
                        free: "ดูอย่างเดียว",
                        premium: "เต็มรูปแบบ",
                        enterprise: "เต็ม��ูปแบบ",
                      },
                      {
                        feature: language === "th" ? "นักบำบัด" : "Therapist",
                        free: "✗",
                        premium: "2/month",
                        enterprise: "1/employee/month",
                      },
                      {
                        feature:
                          language === "th" ? "สมาร์ทวอทช์" : "Smartwatch",
                        free: "พื้นฐาน",
                        premium: "ขั้นสูง",
                        enterprise: "ขั้นสูง",
                      },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td
                          className={cn(
                            "py-3 text-mindful-text",
                            getLanguageFont(language),
                          )}
                        >
                          {row.feature}
                        </td>
                        <td className="py-3 text-center text-sm">{row.free}</td>
                        <td className="py-3 text-center text-sm">
                          {row.premium}
                        </td>
                        <td className="py-3 text-center text-sm">
                          {row.enterprise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "purchases" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2
                className={cn(
                  "text-2xl font-bold text-mindful-text mb-2",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "เนื้อหาเพิ่มเติม" : "Additional Content"}
              </h2>
              <p
                className={cn(
                  "text-mindful-text/70",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "เสริมการเดินทางสู่สุขภาพจิตด้วยเนื้อหาพิเศษ"
                  : "Enhance your mental wellness journey with premium content"}
              </p>
            </div>

            {/* Purchase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inAppPurchases.map((purchase, index) => (
                <InAppPurchaseCard
                  key={purchase.id}
                  purchase={purchase}
                  onPurchase={handlePurchase}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <motion.div
        className="mx-4 mb-6 bg-white rounded-xl p-4 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3">
          <Shield size={20} className="text-mindful-dark-green" />
          <div>
            <h4
              className={cn(
                "font-medium text-mindful-text mb-1",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "การชำระเงินปลอดภัย" : "Secure Payment"}
            </h4>
            <p
              className={cn(
                "text-sm text-mindful-text/70",
                getLanguageFont(language),
              )}
            >
              {language === "th"
                ? "ข้อมูลการชำระเงินได้รับการเข้ารหัสและปฏิบัติตาม PDPA/GDPR"
                : "Payment information is encrypted and PDPA/GDPR compliant"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

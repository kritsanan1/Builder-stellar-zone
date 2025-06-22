import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, Eye, Lock, Database } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PrivacyConsentProps {
  onConsent: (accepted: boolean) => void;
}

export default function PrivacyConsent({ onConsent }: PrivacyConsentProps) {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("mindfulThai-privacy-consent");
    if (!consent) {
      // Show consent modal after a short delay for first-time users
      setTimeout(() => setShowModal(true), 1000);
    } else {
      setHasConsented(true);
    }
  }, []);

  const handleAccept = async () => {
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const consentData = {
      accepted: true,
      timestamp: new Date().toISOString(),
      version: "1.0",
      userAgent: navigator.userAgent,
      language: language,
    };

    localStorage.setItem(
      "mindfulThai-privacy-consent",
      JSON.stringify(consentData),
    );
    setHasConsented(true);
    setIsProcessing(false);
    setShowModal(false);
    onConsent(true);
  };

  const handleDecline = () => {
    setShowModal(false);
    onConsent(false);
  };

  if (hasConsented && !showModal) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {!isProcessing ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="bg-mindful-mint rounded-full p-4 w-fit mx-auto mb-4">
                    <Shield size={32} className="text-mindful-dark-green" />
                  </div>
                  <h2
                    className={cn(
                      "text-2xl font-bold text-mindful-text mb-2",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "ความเป็นส่วนตัว" : "Privacy & Data"}
                  </h2>
                  <p
                    className={cn(
                      "text-mindful-text/70",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th"
                      ? "การปกป้องข���อมูลของคุณคือสิ่งสำคัญสำหรับเรา"
                      : "Your data protection is important to us"}
                  </p>
                </div>

                {/* Data Usage Explanation */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-mindful-soft-blue rounded-lg p-2 flex-shrink-0">
                      <Eye size={16} className="text-mindful-dark-green" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-semibold text-mindful-text mb-1",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th"
                          ? "วิเคราะห์อารมณ์ด้วย AI"
                          : "AI Mood Analysis"}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-mindful-text/70",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th"
                          ? "เราใช้ AI เพื่อวิเคราะห์ข้อความของคุณเพื่อให้คำแนะนำที่เหมาะสม"
                          : "We use AI to analyze your messages for personalized recommendations"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-mindful-soft-blue rounded-lg p-2 flex-shrink-0">
                      <Database size={16} className="text-mindful-dark-green" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-semibold text-mindful-text mb-1",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th"
                          ? "การจองนักบำบัด"
                          : "Therapist Bookings"}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-mindful-text/70",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th"
                          ? "ข้อมูลการจองของคุณจะถูกเก็บอย่างปลอดภัยเพื่อการจัดการนัดหมาย"
                          : "Your booking data is securely stored for appointment management"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-mindful-soft-blue rounded-lg p-2 flex-shrink-0">
                      <Lock size={16} className="text-mindful-dark-green" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-semibold text-mindful-text mb-1",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "ความปลอดภัย" : "Security"}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-mindful-text/70",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th"
                          ? "ข้อมูลทั้งหมดถูกเข้ารหัสและปฏิบัติตาม PDPA และ GDPR"
                          : "All data is encrypted and compliant with PDPA and GDPR"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Points */}
                <div className="bg-mindful-mint rounded-xl p-4 mb-6">
                  <h3
                    className={cn(
                      "font-semibold text-mindful-text mb-3",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "สิทธิของคุณ" : "Your Rights"}
                  </h3>
                  <ul className="space-y-2 text-sm text-mindful-text/80">
                    <li className="flex items-center space-x-2">
                      <Check
                        size={14}
                        className="text-mindful-dark-green flex-shrink-0"
                      />
                      <span className={getLanguageFont(language)}>
                        {language === "th"
                          ? "เข้าถึงและลบข้อมูลของคุณได้ตลอดเวลา"
                          : "Access and delete your data anytime"}
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check
                        size={14}
                        className="text-mindful-dark-green flex-shrink-0"
                      />
                      <span className={getLanguageFont(language)}>
                        {language === "th"
                          ? "ข้อมูลไม่ถูกแชร์กับบุคคลที่สาม"
                          : "Data never shared with third parties"}
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check
                        size={14}
                        className="text-mindful-dark-green flex-shrink-0"
                      />
                      <span className={getLanguageFont(language)}>
                        {language === "th"
                          ? "ยกเลิกความยินยอมได้ทุกเมื่อ"
                          : "Withdraw consent at any time"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleAccept}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-full bg-mindful-dark-green text-white py-4 rounded-xl font-semibold",
                      "hover:bg-mindful-dark-green/90 transition-colors duration-200",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th"
                      ? "ยอมรับและดำเนินการต่อ"
                      : "Accept & Continue"}
                  </motion.button>

                  <motion.button
                    onClick={handleDecline}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-medium",
                      "hover:bg-gray-200 transition-colors duration-200",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "ไม่ยอมรับ" : "Decline"}
                  </motion.button>
                </div>

                {/* Legal Links */}
                <div className="mt-4 text-center">
                  <p
                    className={cn(
                      "text-xs text-mindful-text/60",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "อ่านเพิ่มเติม: " : "Read more: "}
                    <button className="text-mindful-dark-green underline">
                      {language === "th"
                        ? "นโยบายความเป็นส่วนตัว"
                        : "Privacy Policy"}
                    </button>
                    {" • "}
                    <button className="text-mindful-dark-green underline">
                      {language === "th"
                        ? "เงื่อนไขการใช้งาน"
                        : "Terms of Service"}
                    </button>
                  </p>
                </div>
              </>
            ) : (
              /* Processing State */
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-16 h-16 bg-mindful-mint rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <motion.div
                    className="w-8 h-8 border-3 border-mindful-dark-green border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <h3
                  className={cn(
                    "text-xl font-bold text-mindful-text mb-2",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th" ? "กำลังประมวลผล..." : "Processing..."}
                </h3>

                <p
                  className={cn(
                    "text-mindful-text/70",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "กำลังตั้งค่าบัญชีและการรักษาความเป็นส่วนตัวของคุณ"
                    : "Setting up your account and privacy preferences"}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

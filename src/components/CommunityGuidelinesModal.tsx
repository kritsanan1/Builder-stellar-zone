import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Heart,
  Eye,
  MessageCircle,
  AlertTriangle,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface CommunityGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommunityGuidelinesModal({
  isOpen,
  onClose,
}: CommunityGuidelinesModalProps) {
  const { language } = useLanguage();

  const guidelines = {
    th: [
      {
        icon: Heart,
        title: "เคารพซึ่งกันและกัน",
        description:
          "ใช้ภาษาที่สุภาพ���ละให้กำลังใจกัน หลีกเลี่ยงการใช้คำพูดที่ก้าวร้าวหรือดูหมิ่น",
        examples: [
          "ใช้คำพูดที่อ่อนโยนและเป็นมิตร",
          "หลีกเลี่ยงการใช้คำหยาบคายหรือคำด่า",
          "ให้กำลังใจและสนับสนุนสมาชิกคนอื่น",
          "หลีกเลี่ยงการโต้เถียงหรือการขัดแย้ง",
        ],
      },
      {
        icon: MessageCircle,
        title: "แบ่งปันอย่างสร้างสรรค์",
        description: "แบ่งปันประสบการณ์และความรู้ที่เป็นประโยชน์ต่อสุขภาพจิต",
        examples: [
          "แบ่งปันเทคนิคการจัดการความเครียดที่ได้ผล",
          "เล่าประสบการณ์การฟื้นตัวและการเติบโต",
          "แนะนำกิจกรรมหรือวิธีการที่ช่วยได้",
          "ให้คำแนะนำจากประสบการณ์จริง",
        ],
      },
      {
        icon: Eye,
        title: "รักษาความเป็นส่วนตัว",
        description:
          "เคารพความเป็นส่วนตัวของตนเองและผู้อื่น ไม่เปิดเผยข้อมูลส่วนบุคคล",
        examples: [
          "ไม่แชร์ข้อมูลส่วนตัว เช่น ชื่อจริง ที่อยู่ เบอร์โทร",
          "ไม่ถ่ายภาพหน้าจอการสนทนาเพื่อแชร์ที่อื่น",
          "เคารพการเลือกใช้ชื่อแฝงหรือการไม่ระบุตัวตน",
          "ไม่บังคับให้ผู้อื่นเปิดเผยข้อมูลส่วนตัว",
        ],
      },
      {
        icon: Shield,
        title: "ไม่โฆษณาหรือขายสินค้า",
        description: "ชุมชนนี้ไม่ใช่พื้นที่สำหรับการโฆษณาหรือขายสินค้า",
        examples: [
          "ไม่โพสต์ลิงก์ขายสินค้าหรื��บริการ",
          "ไม่ชวนเข้าร่วมกลุ่มหรือแอปอื่น",
          "ไม่แนะนำยาหรือผลิตภัณฑ์เพื่อการรักษา",
          "ไม่ขอรับสมัครหรือหางาน",
        ],
      },
      {
        icon: AlertTriangle,
        title: "ระวังเนื้อหาที่ก่อให้เกิดอันตราย",
        description:
          "หลีกเลี่ยงการแบ่งปันเนื้อหาที่อาจก่อให้เกิดความเสียหายทางจิตใจ",
        examples: [
          "ไม่แบ่งปันรายละเอียดการทำร้ายตนเอง",
          "ไม่อธิบายวิธีการฆ่าตัวตาย",
          "ไม่โพสต์ภาพหรือเนื้อหาที่มีความรุนแรง",
          "ใช้คำเตือนเมื่อพูดถึงหัวข้อที่อ่อนไหว",
        ],
      },
      {
        icon: Phone,
        title: "ขอความช่วยเหลือเมื่อจำเ���็น",
        description:
          "หากมีความคิดทำร้ายตนเองหรือผู้อื่น กรุณาติดต่อผู้เชี่ยวชาญทันที",
        examples: [
          "สายด่วนสุขภาพจิต กรมสุขภาพจิต: 1323",
          "สายด่วนพิทักษ์ใจ สำนักงานพระพุทธศาสนา: 02-222-8333",
          "ศูนย์ช่วยเหลือฉุกเฉิน: 1669",
          "แอพพลิเคชัน MindfulThai: ส่วนนักบำบัด",
        ],
      },
    ],
    en: [
      {
        icon: Heart,
        title: "Be Respectful and Kind",
        description:
          "Use polite and encouraging language. Avoid aggressive or dismissive words.",
        examples: [
          "Use gentle and friendly language",
          "Avoid profanity or offensive words",
          "Encourage and support other members",
          "Avoid arguments or conflicts",
        ],
      },
      {
        icon: MessageCircle,
        title: "Share Constructively",
        description:
          "Share experiences and knowledge that benefit mental health.",
        examples: [
          "Share effective stress management techniques",
          "Tell stories of recovery and growth",
          "Recommend helpful activities or methods",
          "Give advice from real experience",
        ],
      },
      {
        icon: Eye,
        title: "Protect Privacy",
        description:
          "Respect your own and others' privacy. Don't share personal information.",
        examples: [
          "Don't share personal info like real names, addresses, phone numbers",
          "Don't screenshot conversations to share elsewhere",
          "Respect choices to use pseudonyms or stay anonymous",
          "Don't force others to reveal personal information",
        ],
      },
      {
        icon: Shield,
        title: "No Advertising or Selling",
        description:
          "This community is not a space for advertising or selling products.",
        examples: [
          "Don't post links to sell products or services",
          "Don't invite to join other groups or apps",
          "Don't recommend medications or treatment products",
          "Don't recruit or post job offers",
        ],
      },
      {
        icon: AlertTriangle,
        title: "Avoid Harmful Content",
        description:
          "Avoid sharing content that could cause psychological harm.",
        examples: [
          "Don't share details of self-harm methods",
          "Don't describe suicide methods",
          "Don't post violent images or content",
          "Use warnings when discussing sensitive topics",
        ],
      },
      {
        icon: Phone,
        title: "Seek Help When Needed",
        description:
          "If you have thoughts of harming yourself or others, contact professionals immediately.",
        examples: [
          "Mental Health Hotline, Department of Mental Health: 1323",
          "Mind Care Hotline, Office of Buddhism: 02-222-8333",
          "Emergency Help Center: 1669",
          "MindfulThai App: Therapist section",
        ],
      },
    ],
  };

  const consequences = {
    th: [
      "การแจ้งเตือนและคำแนะนำครั้งแรก",
      "การระงับการโพสต์ชั่วคราว (1-7 วัน)",
      "การระงับบัญชีชั่วคราว (1-30 วัน)",
      "การระงับบัญชีถาวร",
    ],
    en: [
      "First warning and guidance",
      "Temporary posting suspension (1-7 days)",
      "Temporary account suspension (1-30 days)",
      "Permanent account suspension",
    ],
  };

  const reportingSteps = {
    th: [
      "กดปุ่ม '...' ที่โพสต์หรือความคิดเห็น",
      "เลือก 'รายงานโพสต์'",
      "ระบุเหตุผลในการรายงาน",
      "ทีมผู้ดูแลจะตรวจสอบภายใน 24 ชั่วโมง",
    ],
    en: [
      "Click the '...' button on the post or comment",
      "Select 'Report Post'",
      "Specify the reason for reporting",
      "Moderation team will review within 24 hours",
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-mindful-mint rounded-full p-3">
                    <Shield size={24} className="text-mindful-dark-green" />
                  </div>
                  <div>
                    <h2
                      className={cn(
                        "text-2xl font-bold text-mindful-text",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th"
                        ? "หลักการชุมชน"
                        : "Community Guidelines"}
                    </h2>
                    <p
                      className={cn(
                        "text-mindful-text/70",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th"
                        ? "สร้างพื้นท���่ปลอดภัยและเป็นมิตรสำหรับทุกคน"
                        : "Creating a safe and friendly space for everyone"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Introduction */}
              <div className="bg-mindful-soft-blue rounded-xl p-6">
                <h3
                  className={cn(
                    "text-lg font-semibold text-mindful-text mb-3",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "ยินดีต้อนรับสู่ชุมชน MindfulThai"
                    : "Welcome to MindfulThai Community"}
                </h3>
                <p
                  className={cn(
                    "text-mindful-text/80 leading-relaxed",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "ชุมชนของเราคือพื้นที่ปลอดภัยสำหรับการแบ่งปันและรับการสนับสนุนด้านส��ขภาพจิต เราเชื่อว่าทุกคนมีสิทธิ์ที่จะได้รับการยอมรับและเคารพ หลักการเหล่านี้จะช่วยให้เราสร้างชุมชนที่อบอุ่นและเป็นประโยชน์สำหรับทุกคน"
                    : "Our community is a safe space for sharing and receiving mental health support. We believe everyone deserves acceptance and respect. These guidelines help us create a warm and beneficial community for all."}
                </p>
              </div>

              {/* Guidelines */}
              <div className="space-y-6">
                <h3
                  className={cn(
                    "text-xl font-semibold text-mindful-text",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "หลักการของชุมชน"
                    : "Community Guidelines"}
                </h3>

                {guidelines[language].map((guideline, index) => {
                  const Icon = guideline.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-mindful-mint rounded-lg p-3 flex-shrink-0">
                          <Icon size={24} className="text-mindful-dark-green" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={cn(
                              "text-lg font-semibold text-mindful-text mb-2",
                              getLanguageFont(language),
                            )}
                          >
                            {guideline.title}
                          </h4>
                          <p
                            className={cn(
                              "text-mindful-text/80 mb-4",
                              getLanguageFont(language),
                            )}
                          >
                            {guideline.description}
                          </p>
                          <div className="space-y-2">
                            <h5
                              className={cn(
                                "font-medium text-mindful-text text-sm",
                                getLanguageFont(language),
                              )}
                            >
                              {language === "th" ? "ตัวอย่าง:" : "Examples:"}
                            </h5>
                            {guideline.examples.map((example, exampleIndex) => (
                              <div
                                key={exampleIndex}
                                className="flex items-start space-x-2"
                              >
                                <CheckCircle
                                  size={16}
                                  className="text-mindful-dark-green flex-shrink-0 mt-0.5"
                                />
                                <span
                                  className={cn(
                                    "text-sm text-mindful-text/70",
                                    getLanguageFont(language),
                                  )}
                                >
                                  {example}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Consequences */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3
                  className={cn(
                    "text-lg font-semibold text-orange-800 mb-4",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "ผลที่ตามมาจากการไม่ปฏิบัติตามหลักการ"
                    : "Consequences of Guideline Violations"}
                </h3>
                <div className="space-y-2">
                  {consequences[language].map((consequence, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span
                        className={cn(
                          "text-orange-800",
                          getLanguageFont(language),
                        )}
                      >
                        {consequence}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reporting */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3
                  className={cn(
                    "text-lg font-semibold text-red-800 mb-4",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "วิธีการรายงานเนื้อหาที่ไม่เหมาะสม"
                    : "How to Report Inappropriate Content"}
                </h3>
                <div className="space-y-2">
                  {reportingSteps[language].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-200 text-red-800 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span
                        className={cn(
                          "text-red-800",
                          getLanguageFont(language),
                        )}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Resources */}
              <div className="bg-mindful-mint rounded-xl p-6">
                <h3
                  className={cn(
                    "text-lg font-semibold text-mindful-dark-green mb-4",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "ทรัพยากรช่วยเหลือฉุกเฉิน"
                    : "Emergency Resources"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name:
                        language === "th"
                          ? "สายด่วนสุขภาพจิต"
                          : "Mental Health Hotline",
                      number: "1323",
                      description:
                        language === "th"
                          ? "กรมสุขภาพจิต"
                          : "Department of Mental Health",
                    },
                    {
                      name:
                        language === "th"
                          ? "สายด่วนพิทักษ์ใจ"
                          : "Mind Care Hotline",
                      number: "02-222-8333",
                      description:
                        language === "th"
                          ? "สำนักงานพระพุทธศาสนา"
                          : "Office of Buddhism",
                    },
                    {
                      name:
                        language === "th"
                          ? "ศูนย์ช่วยเหลือฉุกเฉิน"
                          : "Emergency Help Center",
                      number: "1669",
                      description:
                        language === "th"
                          ? "ช่วยเหลือฉุกเฉิน 24 ชั่วโมง"
                          : "24-hour emergency assistance",
                    },
                    {
                      name: "MindfulThai",
                      number:
                        language === "th"
                          ? "ส่วนนักบำบัด"
                          : "Therapist Section",
                      description:
                        language === "th"
                          ? "นักบำบัดมืออาชีพ"
                          : "Professional therapists",
                    },
                  ].map((resource, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4
                        className={cn(
                          "font-semibold text-mindful-text",
                          getLanguageFont(language),
                        )}
                      >
                        {resource.name}
                      </h4>
                      <p
                        className={cn(
                          "text-lg font-bold text-mindful-dark-green",
                          getLanguageFont(language),
                        )}
                      >
                        {resource.number}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-mindful-text/70",
                          getLanguageFont(language),
                        )}
                      >
                        {resource.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="text-center">
                <p
                  className={cn(
                    "text-mindful-text/80 mb-6",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "การใช้ชุมชน MindfulThai หมายความว่าคุณยอมรับและปฏิบัติตามหลักการเหล่านี้"
                    : "By using the MindfulThai community, you agree to follow these guidelines"}
                </p>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "bg-mindful-dark-green text-white px-8 py-3 rounded-xl font-semibold",
                    "hover:bg-mindful-dark-green/90 transition-colors duration-200",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "เข้าใจและยอมรับ"
                    : "Understand & Accept"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

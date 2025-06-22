import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Calendar, Clock, X, Check, Crown } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Therapist {
  id: string;
  name: { th: string; en: string };
  specialty: { th: string; en: string };
  bio: { th: string; en: string };
  rating: number;
  reviewCount: number;
  price: number;
  currency: "THB" | "USD";
  location: { th: string; en: string };
  avatar: string;
  languages: string[];
  isPremium: boolean;
  nextAvailable: Date;
}

interface TherapistCardProps {
  therapist: Therapist;
  onBook?: (therapistId: string) => void;
}

export default function TherapistCard({
  therapist,
  onBook,
}: TherapistCardProps) {
  const { language } = useLanguage();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const getNextDays = (count: number) => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsBooking(true);

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsBooking(false);
    setBookingSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSuccess(false);
      setSelectedDate(null);
      setSelectedTime("");
      onBook?.(therapist.id);
    }, 2000);
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === "THB") {
      return `฿${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        whileHover={{ y: -2, shadow: "0 4px 20px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-mindful-mint rounded-full flex items-center justify-center text-2xl">
              {therapist.avatar}
            </div>
            {therapist.isPremium && (
              <div className="absolute -top-1 -right-1 bg-mindful-dark-green rounded-full p-1">
                <Crown size={12} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3
              className={cn(
                "font-semibold text-mindful-text mb-1",
                getLanguageFont(language),
              )}
            >
              {therapist.name[language]}
            </h3>
            <p
              className={cn(
                "text-sm text-mindful-text/70 mb-2",
                getLanguageFont(language),
              )}
            >
              {therapist.specialty[language]}
            </p>

            <div className="flex items-center space-x-4 text-xs text-mindful-text/60">
              <div className="flex items-center space-x-1">
                <Star size={12} className="text-yellow-500 fill-current" />
                <span>{therapist.rating}</span>
                <span>({therapist.reviewCount})</span>
              </div>

              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>{therapist.location[language]}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div
              className={cn(
                "text-lg font-bold text-mindful-dark-green",
                getLanguageFont(language),
              )}
            >
              {formatPrice(therapist.price, therapist.currency)}
            </div>
            <div
              className={cn(
                "text-xs text-mindful-text/60",
                getLanguageFont(language),
              )}
            >
              {language === "th" ? "ต่อเซสชัน" : "per session"}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p
          className={cn(
            "text-sm text-mindful-text/80 mb-4 line-clamp-3",
            getLanguageFont(language),
          )}
        >
          {therapist.bio[language]}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {therapist.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-1 bg-mindful-soft-blue rounded-full text-xs text-mindful-text"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Next Available */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-mindful-text/70">
            <Clock size={14} />
            <span className={getLanguageFont(language)}>
              {language === "th" ? "ว่างถัดไป: " : "Next available: "}
              {therapist.nextAvailable.toLocaleDateString(
                language === "th" ? "th-TH" : "en-US",
              )}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => setShowBookingModal(true)}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-full py-3 rounded-xl font-medium transition-all duration-200",
            getLanguageFont(language),
            therapist.isPremium
              ? "bg-gradient-to-r from-mindful-dark-green to-mindful-dark-green/80 text-white"
              : "bg-mindful-dark-green text-white hover:bg-mindful-dark-green/90",
          )}
        >
          {language === "th" ? "จองเลย" : "Book Now"}
        </motion.button>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {!bookingSuccess ? (
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={cn(
                        "text-xl font-bold text-mindful-text",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th" ? "จองนัดหมาย" : "Book Appointment"}
                    </h2>
                    <motion.button
                      onClick={() => setShowBookingModal(false)}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>

                  {/* Therapist Info */}
                  <div className="flex items-center space-x-3 mb-6 p-4 bg-mindful-soft-blue rounded-lg">
                    <div className="w-12 h-12 bg-mindful-mint rounded-full flex items-center justify-center">
                      {therapist.avatar}
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-semibold text-mindful-text",
                          getLanguageFont(language),
                        )}
                      >
                        {therapist.name[language]}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-mindful-text/70",
                          getLanguageFont(language),
                        )}
                      >
                        {formatPrice(therapist.price, therapist.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <h3
                      className={cn(
                        "font-semibold text-mindful-text mb-3",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th" ? "เลือกวันที่" : "Select Date"}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {getNextDays(6).map((date) => (
                        <motion.button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date)}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "p-3 rounded-lg border-2 transition-all duration-200",
                            getLanguageFont(language),
                            selectedDate?.toDateString() === date.toDateString()
                              ? "border-mindful-dark-green bg-mindful-mint"
                              : "border-gray-200 hover:border-mindful-dark-green",
                          )}
                        >
                          <div className="text-sm font-medium">
                            {date.toLocaleDateString(
                              language === "th" ? "th-TH" : "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3
                        className={cn(
                          "font-semibold text-mindful-text mb-3",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th" ? "เลือกเวลา" : "Select Time"}
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <motion.button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                              "p-2 rounded-lg border-2 transition-all duration-200 text-sm",
                              selectedTime === time
                                ? "border-mindful-dark-green bg-mindful-mint"
                                : "border-gray-200 hover:border-mindful-dark-green",
                            )}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Premium Notice */}
                  {therapist.isPremium && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-mindful-dark-green/10 to-mindful-mint rounded-lg border border-mindful-dark-green/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown size={16} className="text-mindful-dark-green" />
                        <span
                          className={cn(
                            "font-medium text-mindful-text",
                            getLanguageFont(language),
                          )}
                        >
                          {language === "th"
                            ? "นักบำบัดพรีเมียม"
                            : "Premium Therapist"}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-sm text-mindful-text/70",
                          getLanguageFont(language),
                        )}
                      >
                        {language === "th"
                          ? "จำเป็นต้องสมัครสมาชิกพรีเมียมเพื่อจองนัดหมาย"
                          : "Premium subscription required to book this therapist"}
                      </p>
                    </div>
                  )}

                  {/* Book Button */}
                  <motion.button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || isBooking}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-full py-3 rounded-xl font-medium transition-all duration-200",
                      "flex items-center justify-center space-x-2",
                      getLanguageFont(language),
                      !selectedDate || !selectedTime || isBooking
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-mindful-dark-green text-white hover:bg-mindful-dark-green/90",
                    )}
                  >
                    {isBooking ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>
                          {language === "th" ? "กำลังจอง..." : "Booking..."}
                        </span>
                      </>
                    ) : (
                      <span>
                        {language === "th" ? "ยืนยันการจอง" : "Confirm Booking"}
                      </span>
                    )}
                  </motion.button>
                </>
              ) : (
                /* Success State */
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check size={32} className="text-green-600" />
                  </motion.div>

                  <h3
                    className={cn(
                      "text-xl font-bold text-mindful-text mb-2",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "จองสำเร็จ!" : "Booking Confirmed!"}
                  </h3>

                  <p
                    className={cn(
                      "text-mindful-text/70",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th"
                      ? "คุณจะได้รับอีเมลยืนยันเร็วๆ นี้"
                      : "You'll receive a confirmation email shortly"}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

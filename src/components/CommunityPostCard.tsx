import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share,
  Flag,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { CommunityPost } from "@/lib/community";
import { cn } from "@/lib/utils";

interface CommunityPostCardProps {
  post: CommunityPost;
  onLike: (postId: string) => void;
  onReply: (postId: string, content: string, isAnonymous: boolean) => void;
  onReport: (postId: string, reason: string) => void;
  index: number;
}

export default function CommunityPostCard({
  post,
  onLike,
  onReply,
  onReport,
  index,
}: CommunityPostCardProps) {
  const { language } = useLanguage();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyAnonymous, setReplyAnonymous] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;

    onReply(post.id, replyText, replyAnonymous);
    setReplyText("");
    setShowReplyInput(false);
    setShowReplies(true);
  };

  const handleReport = () => {
    if (!reportReason.trim()) return;

    onReport(post.id, reportReason);
    setShowReportModal(false);
    setReportReason("");
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
          post.isFlagged && "border-yellow-300 bg-yellow-50",
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-mindful-mint rounded-full flex items-center justify-center text-lg">
              {post.avatar}
            </div>
            <div>
              <h4
                className={cn(
                  "font-medium text-mindful-text",
                  getLanguageFont(language),
                )}
              >
                {post.isAnonymous
                  ? language === "th"
                    ? "ไม่ระบุชื่อ"
                    : "Anonymous"
                  : post.userName}
              </h4>
              <span
                className={cn(
                  "text-xs text-mindful-text/60",
                  getLanguageFont(language),
                )}
              >
                {formatTime(post.timestamp)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {post.isAnonymous && (
              <div className="px-2 py-1 bg-mindful-soft-blue rounded-full">
                <span
                  className={cn(
                    "text-xs text-mindful-dark-green",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th" ? "ไม่ระบุชื่อ" : "Anonymous"}
                </span>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowReportModal(true)}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <MoreHorizontal size={16} className="text-gray-400" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p
            className={cn(
              "text-mindful-text leading-relaxed",
              getLanguageFont(language),
            )}
          >
            {post.content}
          </p>

          {post.images && post.images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {post.images.map((image, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-mindful-soft-blue rounded-lg flex items-center justify-center"
                >
                  <span className="text-2xl">🖼️</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onLike(post.id)}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart size={16} />
              <span className={cn("text-sm", getLanguageFont(language))}>
                {post.likes}
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center space-x-2 text-gray-600 hover:text-mindful-dark-green transition-colors"
            >
              <MessageCircle size={16} />
              <span className={cn("text-sm", getLanguageFont(language))}>
                {post.replies.length > 0 ? post.replies.length : ""}
                {language === "th" ? " ตอบกลับ" : " Reply"}
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-mindful-dark-green transition-colors"
            >
              <Share size={16} />
              <span className={cn("text-sm", getLanguageFont(language))}>
                {language === "th" ? "แชร์" : "Share"}
              </span>
            </motion.button>
          </div>

          {post.replies.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReplies(!showReplies)}
              className={cn(
                "text-sm text-mindful-dark-green hover:underline",
                getLanguageFont(language),
              )}
            >
              {showReplies
                ? language === "th"
                  ? "ซ่อนการตอบกลับ"
                  : "Hide replies"
                : language === "th"
                  ? `ดูการตอบกลับ ${post.replies.length} รายการ`
                  : `View ${post.replies.length} replies`}
            </motion.button>
          )}
        </div>

        {/* Reply Input */}
        <AnimatePresence>
          {showReplyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="space-y-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={
                    language === "th"
                      ? "เขียนการตอบกลับ..."
                      : "Write a reply..."
                  }
                  className={cn(
                    "w-full p-3 border border-gray-200 rounded-lg resize-none",
                    "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
                    getLanguageFont(language),
                  )}
                  rows={3}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={replyAnonymous}
                      onChange={(e) => setReplyAnonymous(e.target.checked)}
                      className="w-4 h-4 text-mindful-dark-green rounded focus:ring-mindful-dark-green"
                    />
                    <span
                      className={cn(
                        "text-sm text-mindful-text",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th" ? "ไม่ระบุชื่อ" : "Anonymous"}
                    </span>
                  </label>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReplyInput(false)}
                      className={cn(
                        "px-4 py-2 text-gray-600 hover:text-gray-800",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th" ? "ยกเลิก" : "Cancel"}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className={cn(
                        "px-4 py-2 bg-mindful-dark-green text-white rounded-lg",
                        "hover:bg-mindful-dark-green/90 disabled:bg-gray-300",
                        "disabled:cursor-not-allowed transition-colors",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th" ? "ตอบกลับ" : "Reply"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replies */}
        <AnimatePresence>
          {showReplies && post.replies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100 space-y-3"
            >
              {post.replies.map((reply, idx) => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="ml-4 p-3 bg-mindful-soft-blue rounded-lg"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-mindful-mint rounded-full flex items-center justify-center text-sm">
                      {reply.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={cn(
                            "text-sm font-medium text-mindful-text",
                            getLanguageFont(language),
                          )}
                        >
                          {reply.isAnonymous
                            ? language === "th"
                              ? "ไม่ระบุชื่อ"
                              : "Anonymous"
                            : reply.userName}
                        </span>
                        <span
                          className={cn(
                            "text-xs text-mindful-text/60",
                            getLanguageFont(language),
                          )}
                        >
                          {formatTime(reply.timestamp)}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-sm text-mindful-text",
                          getLanguageFont(language),
                        )}
                      >
                        {reply.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={cn(
                    "text-xl font-bold text-mindful-text",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th" ? "รายงานโพสต์" : "Report Post"}
                </h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowReportModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder={
                    language === "th"
                      ? "โปรดระบุเหตุผลในการรายงาน..."
                      : "Please specify the reason for reporting..."
                  }
                  className={cn(
                    "w-full p-3 border border-gray-200 rounded-lg resize-none",
                    "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
                    getLanguageFont(language),
                  )}
                  rows={4}
                />

                <div className="flex items-center space-x-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReportModal(false)}
                    className={cn(
                      "flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium",
                      "hover:bg-gray-200 transition-colors",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "ยกเลิก" : "Cancel"}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReport}
                    disabled={!reportReason.trim()}
                    className={cn(
                      "flex-1 py-3 bg-red-500 text-white rounded-lg font-medium",
                      "hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed",
                      "transition-colors flex items-center justify-center space-x-2",
                      getLanguageFont(language),
                    )}
                  >
                    <Flag size={16} />
                    <span>{language === "th" ? "รายงาน" : "Report"}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Plus,
  Image,
  Shield,
  Users,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import { useCommunity, communityGuidelines } from "@/lib/community";
import CommunityPostCard from "@/components/CommunityPostCard";
import { cn } from "@/lib/utils";

export default function CommunityRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const {
    rooms,
    getRoomById,
    getPostsByRoom,
    createPost,
    addReply,
    likePost,
    reportPost,
    moderateContent,
    addNotification,
  } = useCommunity();

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const room = getRoomById(roomId || "");
  const posts = getPostsByRoom(roomId || "");

  useEffect(() => {
    if (!room) {
      navigate("/community");
    }
  }, [room, navigate]);

  useEffect(() => {
    // Show guidelines on first visit to any room
    const hasSeenGuidelines = localStorage.getItem(
      "mindfulThai-community-guidelines",
    );
    if (!hasSeenGuidelines) {
      setShowGuidelines(true);
    }
  }, []);

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    setIsSubmitting(true);

    // AI Content Moderation
    const moderation = moderateContent(postContent);
    if (!moderation.isAppropriate) {
      alert(
        language === "th"
          ? `เนื้อหาไม่เหมาะสม: ${moderation.reason}`
          : `Inappropriate content: ${moderation.reason}`,
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const post = createPost(roomId || "", postContent, isAnonymous);

      // Add notification for room members
      addNotification({
        type: "new_post",
        roomId: roomId || "",
        roomName: room?.title || { th: "", en: "" },
        message: {
          th: `โพสต์ใหม่ในห้อง ${room?.title.th}`,
          en: `New post in ${room?.title.en}`,
        },
      });

      setPostContent("");
      setShowCreatePost(false);

      // Show success toast
      const event = new CustomEvent("toast", {
        detail: {
          title: language === "th" ? "สำเร็จ!" : "Success!",
          description: t("postShared"),
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (
    postId: string,
    content: string,
    isAnonymous: boolean,
  ) => {
    const moderation = moderateContent(content);
    if (!moderation.isAppropriate) {
      alert(
        language === "th"
          ? `เนื้อหาไม่เหมาะสม: ${moderation.reason}`
          : `Inappropriate content: ${moderation.reason}`,
      );
      return;
    }

    addReply(postId, content, isAnonymous);

    // Add notification
    addNotification({
      type: "new_reply",
      roomId: roomId || "",
      roomName: room?.title || { th: "", en: "" },
      message: {
        th: `มีก���รตอบกลับใหม่ในห้อง ${room?.title.th}`,
        en: `New reply in ${room?.title.en}`,
      },
    });
  };

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleReport = (postId: string, reason: string) => {
    reportPost(postId, reason);

    // Show success toast
    const event = new CustomEvent("toast", {
      detail: {
        title: language === "th" ? "รายงานแล้ว" : "Reported",
        description: t("reportSubmitted"),
      },
    });
    window.dispatchEvent(event);
  };

  const acceptGuidelines = () => {
    localStorage.setItem("mindfulThai-community-guidelines", "accepted");
    setShowGuidelines(false);
  };

  if (!room) return null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-mindful-soft-blue pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/community")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </motion.button>

            <div className="flex items-center space-x-3 flex-1">
              <div className="bg-mindful-soft-blue rounded-full p-2 text-xl">
                {room.icon}
              </div>
              <div>
                <h1
                  className={cn(
                    "text-lg font-bold text-mindful-text",
                    getLanguageFont(language),
                  )}
                >
                  {room.title[language]}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-mindful-text/60">
                  <div className="flex items-center space-x-1">
                    <Users size={12} />
                    <span>{room.userCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className={getLanguageFont(language)}>
                      {language === "th" ? "ใช้งานอยู่" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCreatePost(true)}
              className="bg-mindful-dark-green text-white p-3 rounded-xl hover:bg-mindful-dark-green/90 transition-colors"
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </div>

        {/* Room Description */}
        <div className="px-4 py-4 bg-mindful-soft-blue">
          <p
            className={cn(
              "text-mindful-text/80 text-center",
              getLanguageFont(language),
            )}
          >
            {room.description[language]}
          </p>
        </div>

        {/* Posts */}
        <div className="px-4 py-6 space-y-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <CommunityPostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onReply={handleReply}
                onReport={handleReport}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">{room.icon}</div>
              <h3
                className={cn(
                  "text-lg font-semibold text-mindful-text mb-2",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "เริ่มการสนทนาแรก"
                  : "Start the first conversation"}
              </h3>
              <p
                className={cn(
                  "text-mindful-text/70 mb-4",
                  getLanguageFont(language),
                )}
              >
                {language === "th"
                  ? "แบ่งปันประสบการณ์และรับการสนับสนุนจากชุมชน"
                  : "Share your experience and get support from the community"}
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreatePost(true)}
                className={cn(
                  "bg-mindful-dark-green text-white px-6 py-3 rounded-xl font-medium",
                  "hover:bg-mindful-dark-green/90 transition-colors",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "สร้างโพสต์แรก" : "Create First Post"}
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className={cn(
                    "text-xl font-bold text-mindful-text",
                    getLanguageFont(language),
                  )}
                >
                  {t("createPost")}
                </h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </motion.button>
              </div>

              <div className="space-y-4">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder={
                    language === "th"
                      ? "แบ่งปันความคิดของคุณ..."
                      : "Share your thoughts..."
                  }
                  className={cn(
                    "w-full p-4 border border-gray-200 rounded-xl resize-none",
                    "focus:ring-2 focus:ring-mindful-dark-green focus:border-transparent",
                    getLanguageFont(language),
                  )}
                  rows={6}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                      <Image size={20} />
                    </motion.button>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 text-mindful-dark-green rounded focus:ring-mindful-dark-green"
                      />
                      <span
                        className={cn(
                          "text-sm text-mindful-text flex items-center space-x-1",
                          getLanguageFont(language),
                        )}
                      >
                        {isAnonymous ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>
                          {language === "th"
                            ? "โพสต์แบบไม่ระบุชื่อ"
                            : "Anonymous post"}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreatePost}
                  disabled={!postContent.trim() || isSubmitting}
                  className={cn(
                    "w-full py-3 bg-mindful-dark-green text-white rounded-xl font-medium",
                    "hover:bg-mindful-dark-green/90 disabled:bg-gray-300",
                    "disabled:cursor-not-allowed transition-colors",
                    "flex items-center justify-center space-x-2",
                    getLanguageFont(language),
                  )}
                >
                  {isSubmitting ? (
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
                        {language === "th" ? "กำลังโพสต์..." : "Posting..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{language === "th" ? "โพสต์" : "Post"}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community Guidelines Modal */}
      <AnimatePresence>
        {showGuidelines && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
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
                  {t("communityGuidelines")}
                </h2>
                <p
                  className={cn(
                    "text-mindful-text/70",
                    getLanguageFont(language),
                  )}
                >
                  {language === "th"
                    ? "โปรดอ่านและปฏิบัติตามหลักการของชุมชน"
                    : "Please read and follow our community guidelines"}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {communityGuidelines[language].map((guideline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 bg-mindful-dark-green text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p
                      className={cn(
                        "text-mindful-text flex-1",
                        getLanguageFont(language),
                      )}
                    >
                      {guideline}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={acceptGuidelines}
                className={cn(
                  "w-full bg-mindful-dark-green text-white py-4 rounded-xl font-semibold",
                  "hover:bg-mindful-dark-green/90 transition-colors duration-200",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "เข้าใจและยอมรับ" : "Understand & Accept"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

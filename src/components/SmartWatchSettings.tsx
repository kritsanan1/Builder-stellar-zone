import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Watch, Check, Loader2, Smartphone, Bell, BellOff } from "lucide-react";
import { useLanguage, getLanguageFont } from "@/lib/i18n";
import {
  useSmartWatch,
  smartWatchDevices,
  type SmartWatchType,
} from "@/lib/smartwatch";
import { cn } from "@/lib/utils";

export default function SmartWatchSettings() {
  const { language, t } = useLanguage();
  const {
    connection,
    notificationSettings,
    connectDevice,
    disconnectDevice,
    updateNotificationSettings,
  } = useSmartWatch();

  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<SmartWatchType>(null);

  const handleConnect = async (
    deviceType: SmartWatchType,
    deviceName: string,
  ) => {
    setIsConnecting(true);
    setSelectedDevice(deviceType);

    try {
      await connectDevice(deviceType, deviceName);
    } catch (error) {
      console.error("Failed to connect device:", error);
    } finally {
      setIsConnecting(false);
      setSelectedDevice(null);
    }
  };

  const handleDisconnect = () => {
    disconnectDevice();
  };

  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    updateNotificationSettings({
      [setting]: !notificationSettings[setting],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-mindful-mint rounded-lg p-2">
          <Watch size={24} className="text-mindful-dark-green" />
        </div>
        <h2
          className={cn(
            "text-xl font-semibold text-mindful-text",
            getLanguageFont(language),
          )}
        >
          {language === "th" ? "เชื่อมต่อสมาร์ทวอทช์" : "Smartwatch Connection"}
        </h2>
      </div>

      {/* Connection Status */}
      <motion.div
        className="bg-mindful-soft-blue rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {connection.isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p
                    className={cn(
                      "font-medium text-mindful-text",
                      getLanguageFont(language),
                    )}
                  >
                    {connection.deviceName}
                  </p>
                  <p
                    className={cn(
                      "text-sm text-mindful-text/70",
                      getLanguageFont(language),
                    )}
                  >
                    {language === "th" ? "เชื่อมต่อแล้ว" : "Connected"}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={handleDisconnect}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium",
                  "hover:bg-red-600 transition-colors duration-200",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "ยกเลิกการเชื่อมต่อ" : "Disconnect"}
              </motion.button>
            </div>

            {connection.lastSync && (
              <p
                className={cn(
                  "text-xs text-mindful-text/60",
                  getLanguageFont(language),
                )}
              >
                {language === "th" ? "ซิงค์ล่าสุด: " : "Last synced: "}
                {connection.lastSync.toLocaleTimeString()}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <Smartphone
              size={32}
              className="text-mindful-text/40 mx-auto mb-2"
            />
            <p
              className={cn(
                "text-mindful-text/70 mb-4",
                getLanguageFont(language),
              )}
            >
              {language === "th"
                ? "เชื่อมต่อสมาร์ทวอทช์เพื่อติดตามสุขภาพและรับการแจ้งเตือน"
                : "Connect your smartwatch to track health and receive notifications"}
            </p>
          </div>
        )}
      </motion.div>

      {/* Device Selection */}
      {!connection.isConnected && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3
            className={cn(
              "font-medium text-mindful-text mb-3",
              getLanguageFont(language),
            )}
          >
            {language === "th" ? "เลือกอุปกรณ์" : "Select Device"}
          </h3>

          {smartWatchDevices.map((device) => (
            <motion.button
              key={device.type}
              onClick={() => handleConnect(device.type, device.name)}
              disabled={isConnecting}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full bg-white border border-gray-200 rounded-xl p-4 text-left",
                "hover:border-mindful-dark-green hover:bg-mindful-soft-blue/30",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{device.icon}</span>
                  <div>
                    <p
                      className={cn(
                        "font-medium text-mindful-text",
                        getLanguageFont(language),
                      )}
                    >
                      {device.name}
                    </p>
                    <p
                      className={cn(
                        "text-sm text-mindful-text/60",
                        getLanguageFont(language),
                      )}
                    >
                      {language === "th"
                        ? "อัตราการเต้นของหัวใจ, การนอน, การแจ้งเตือน"
                        : "Heart rate, sleep, notifications"}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {isConnecting && selectedDevice === device.type ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Loader2
                        size={20}
                        className="text-mindful-dark-green animate-spin"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-6 h-6 border-2 border-gray-300 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Notification Settings */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3
          className={cn(
            "font-medium text-mindful-text",
            getLanguageFont(language),
          )}
        >
          {language === "th"
            ? "การตั้งค่าการแจ้งเตือน"
            : "Notification Settings"}
        </h3>

        <div className="space-y-3">
          {[
            {
              key: "enabled" as const,
              icon: notificationSettings.enabled ? Bell : BellOff,
              label:
                language === "th" ? "เปิดการแจ้งเตือน" : "Enable Notifications",
            },
            {
              key: "stressAlerts" as const,
              icon: Bell,
              label:
                language === "th"
                  ? "แจ้งเตือนระดับความเครียด"
                  : "Stress Level Alerts",
              disabled: !notificationSettings.enabled,
            },
            {
              key: "meditationReminders" as const,
              icon: Bell,
              label:
                language === "th"
                  ? "แจ้งเตือนการทำสมาธิ"
                  : "Meditation Reminders",
              disabled: !notificationSettings.enabled,
            },
            {
              key: "sleepReminders" as const,
              icon: Bell,
              label: language === "th" ? "แจ้งเตือนก่อนนอน" : "Sleep Reminders",
              disabled: !notificationSettings.enabled,
            },
          ].map((setting) => {
            const Icon = setting.icon;
            const isEnabled = notificationSettings[setting.key];

            return (
              <motion.button
                key={setting.key}
                onClick={() => toggleNotification(setting.key)}
                disabled={setting.disabled}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full bg-white border border-gray-200 rounded-lg p-3",
                  "hover:border-mindful-dark-green disabled:opacity-50",
                  "transition-all duration-200",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon
                      size={20}
                      className={cn(
                        isEnabled ? "text-mindful-dark-green" : "text-gray-400",
                      )}
                    />
                    <span
                      className={cn(
                        "text-mindful-text",
                        getLanguageFont(language),
                      )}
                    >
                      {setting.label}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "w-11 h-6 rounded-full transition-colors duration-200",
                      isEnabled ? "bg-mindful-dark-green" : "bg-gray-300",
                    )}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full shadow-md mt-0.5"
                      animate={{
                        x: isEnabled ? 20 : 2,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="bg-mindful-mint rounded-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h4
          className={cn(
            "font-medium text-mindful-text mb-2",
            getLanguageFont(language),
          )}
        >
          {language === "th" ? "วิธีการเชื่อมต่อ" : "How to Connect"}
        </h4>
        <ul
          className={cn(
            "text-sm text-mindful-text/80 space-y-1",
            getLanguageFont(language),
          )}
        >
          <li>
            {language === "th"
              ? "1. เปิด Bluetooth บนโทรศัพท์และสมาร์ทวอทช์"
              : "1. Enable Bluetooth on your phone and smartwatch"}
          </li>
          <li>
            {language === "th"
              ? "2. เลือกอุปกรณ์ที่ต้องการเชื่อมต่อ"
              : "2. Select the device you want to connect"}
          </li>
          <li>
            {language === "th"
              ? "3. ปฏิบัติตามคำแนะนำบนหน้าจอ"
              : "3. Follow the on-screen instructions"}
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

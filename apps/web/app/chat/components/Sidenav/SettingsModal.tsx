"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Moon, Sun, Zap, Info, Bell } from "lucide-react";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialSettings?: {
    darkMode: boolean;
    notifications: boolean;
    performance: "low" | "medium" | "high";
  };
};

// Default settings for demo purposes
const defaultSettings = {
  darkMode: true,
  notifications: true,
  performance: "medium" as const,
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  initialSettings = defaultSettings,
}) => {
  const [settings, setSettings] = useState(initialSettings);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleDarkModeToggle = () => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleNotificationsToggle = () => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const handlePerformanceChange = (value: "low" | "medium" | "high") => {
    setSettings((prev) => ({ ...prev, performance: value }));
  };

  const saveSettings = () => {
    // Here you would normally save settings to your backend or localStorage
    console.log("Saving settings:", settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-gray-900/90 backdrop-blur-md border border-sky-900/30 rounded-lg w-full max-w-md p-6 shadow-2xl shadow-blue-900/20 transform transition-all animate-fade-in"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 mb-6">
          {/* Dark Mode Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <Moon size={18} className="text-indigo-400" />
              ) : (
                <Sun size={18} className="text-yellow-400" />
              )}
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-xs text-gray-400">
                  Toggle between light and dark theme
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              {/* <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.darkMode}
                onChange={handleDarkModeToggle}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div> */}
              <p className="text-[10px] p-1 text-red-600 border-red-600 border-solid border-[1px] rounded-full cursor-not-allowed">
                Coming soon
              </p>
            </label>
          </div>

          {/* Notification Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-sky-400" />
              <div>
                <p className="text-white font-medium">Notifications</p>
                <p className="text-xs text-gray-400">
                  Receive updates and alerts
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications}
                onChange={handleNotificationsToggle}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>

          {/* Performance Setting */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Zap size={18} className="text-yellow-400" />
              <div>
                <p className="text-white font-medium">Performance Mode</p>
                <p className="text-xs text-gray-400">
                  Adjust animation intensity
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePerformanceChange("low")}
                className={`py-2 rounded-md text-sm ${
                  settings.performance === "low"
                    ? "bg-sky-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Low
              </button>
              <button
                onClick={() => handlePerformanceChange("medium")}
                className={`py-2 rounded-md text-sm ${
                  settings.performance === "medium"
                    ? "bg-sky-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => handlePerformanceChange("high")}
                className={`py-2 rounded-md text-sm ${
                  settings.performance === "high"
                    ? "bg-sky-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                High
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex items-start gap-3 p-3 bg-blue-950/30 rounded-md border border-blue-900/30">
            <Info size={18} className="text-sky-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300">
              Higher performance settings may use more system resources. For the
              best experience, adjust based on your device capabilities.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveSettings}
            className="btn cursor-not-allowed btn-disabled px-4 py-2 rounded-md  bg-sky-600/80 hover:bg-sky-600 text-white transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

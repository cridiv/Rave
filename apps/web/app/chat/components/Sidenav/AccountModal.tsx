"use client";
import React, { useEffect, useRef } from "react";
import { X, Mail, Calendar, Edit } from "lucide-react";

type AccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userInfo?: {
    name: string;
    email: string;
    joined: string;
    profileImageUrl?: string;
  };
};

// Default user info for demo purposes - in a real app, this would come from props
const defaultUserInfo = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  joined: "January 2023",
  profileImageUrl: "",
};

const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  userInfo = defaultUserInfo, // Use default if not provided
}) => {
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

  if (!isOpen) return null;

  const initials = userInfo.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-gray-900/90 backdrop-blur-md border border-sky-900/30 rounded-lg w-full max-w-md p-6 shadow-2xl shadow-blue-900/20 transform transition-all animate-fade-in"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          {userInfo.profileImageUrl ? (
            <img
              src={userInfo.profileImageUrl}
              alt={userInfo.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-sky-500/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-semibold">
              {initials}
            </div>
          )}

          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-white">
              {userInfo.name}
            </h3>
            <button className="mt-1 text-xs text-sky-400 hover:text-sky-300 flex items-center justify-center gap-1">
              <Edit size={12} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-sky-950/30 border border-sky-900/30">
            <Mail size={18} className="text-sky-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-white">{userInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-sky-950/30 border border-sky-900/30">
            <Calendar size={18} className="text-sky-400" />
            <div>
              <p className="text-xs text-gray-400">Joined</p>
              <p className="text-sm text-white">{userInfo.joined}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-sky-600/80 hover:bg-sky-600 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;

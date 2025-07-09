"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Mail, Calendar } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type UserInfo = {
  name: string;
  email: string;
  joined: string;
  profileImageUrl?: string;
};

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  const generateAvatarUrl = (name: string) => {
    const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, ""));
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=0ea5e9,0284c7,0369a1&radius=50`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClientComponentClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError) throw new Error(authError.message);
        if (!user) throw new Error("No user found");

        const userData: UserInfo = {
          name: user.user_metadata?.full_name || user.user_metadata?.name || "User",
          email: user.email || "No email provided",
          joined: formatDate(user.created_at),
          profileImageUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
        };

        setUserInfo(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err instanceof Error ? err.message : "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="animate-spin text-sky-400 mb-4">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </span>
            <p className="text-gray-400 text-sm">Loading user data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 text-sm text-center mb-4">
              Failed to load user data
            </p>
            <p className="text-gray-500 text-xs text-center">{error}</p>
          </div>
        ) : userInfo ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                {!avatarError ? (
                  <img
                    src={
                      userInfo.profileImageUrl
                        ? userInfo.profileImageUrl
                        : generateAvatarUrl(userInfo.name)
                    }
                    alt={userInfo.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-sky-500/30"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-semibold border-2 border-sky-500/30">
                    {getInitials(userInfo.name)}
                  </div>
                )}
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {userInfo.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-sky-950/30 border border-sky-900/30">
                <Mail size={18} className="text-sky-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-white truncate">
                    {userInfo.email}
                  </p>
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AccountModal;

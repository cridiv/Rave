"use client";
import React, { useEffect, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { X } from "lucide-react";

type SignoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSignout: () => void;
};

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SignoutModal: React.FC<SignoutModalProps> = ({
  isOpen,
  onClose,
  onSignout,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Sign-out failed:", error.message);
    } else {
      window.location.href = "/";
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-gray-900/90 backdrop-blur-md border border-sky-900/30 rounded-lg w-full max-w-md p-6 shadow-2xl shadow-blue-900/20 transform transition-all animate-fade-in"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Sign Out</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300">Are you sure you want to sign out?</p>
        </div>

        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md bg-red-600/80 hover:bg-red-600 text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutModal;

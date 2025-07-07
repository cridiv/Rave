"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  LogOut,
  User,
  Settings,
  Menu,
} from "lucide-react";
import SignoutModal from "./SignoutModal";
import AccountModal from "./AccountModal";
import SettingsModal from "./SettingsModal";

type SidenavProps = {
  chatHistory?: { id: string; title: string; date: string }[];
};

const Sidenav: React.FC<SidenavProps> = ({
  chatHistory = [], // Default to empty array if not provided
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileSidenav = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Render the side navigation
  return (
    <>
      {/* Mobile hamburger menu */}
      <button
        onClick={toggleMobileSidenav}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-800/50 backdrop-blur-md text-white"
        aria-label="Toggle navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Sidenav container */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 
          ${isExpanded ? "w-64" : "w-16"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          bg-gray-900/70 backdrop-blur-md border-r border-sky-900/30`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button */}
          <button
            onClick={toggleExpanded}
            className="hidden lg:flex self-end p-2 m-2 rounded-full hover:bg-sky-800/20 text-sky-400"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {/* Chat history section */}
          <div className="flex-1 overflow-y-auto pt-4">
            <div className={`px-3 py-2 ${isExpanded ? "block" : "hidden"}`}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Chat History
              </h3>
            </div>

            <div className="space-y-1 px-2">
              {chatHistory.length > 0 ? (
                chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className={`flex items-center rounded-md px-2 py-2 w-full text-left
                      text-white hover:bg-sky-800/20 transition-colors
                      ${isExpanded ? "justify-start" : "justify-center"}`}
                  >
                    <MessageSquare size={18} className="text-sky-400" />
                    {isExpanded && (
                      <span className="ml-3 truncate text-sm">
                        {chat.title}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div
                  className={`px-2 py-2 text-gray-500 text-xs italic ${isExpanded ? "block" : "hidden"}`}
                >
                  No chat history yet
                </div>
              )}
            </div>
          </div>

          {/* Actions section */}
          <div className="p-2 border-t border-sky-900/30">
            <button
              onClick={() => setShowAccountModal(true)}
              className={`flex items-center rounded-md px-2 py-2 w-full text-left
                text-white hover:bg-sky-800/20 transition-colors mb-1
                ${isExpanded ? "justify-start" : "justify-center"}`}
            >
              <User size={18} className="text-sky-400" />
              {isExpanded && <span className="ml-3 text-sm">Account</span>}
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className={`flex items-center rounded-md px-2 py-2 w-full text-left
                text-white hover:bg-sky-800/20 transition-colors mb-1
                ${isExpanded ? "justify-start" : "justify-center"}`}
            >
              <Settings size={18} className="text-sky-400" />
              {isExpanded && <span className="ml-3 text-sm">Settings</span>}
            </button>

            <button
              onClick={() => setShowSignoutModal(true)}
              className={`flex items-center rounded-md px-2 py-2 w-full text-left
                text-white hover:bg-red-800/20 hover:text-red-400 transition-colors
                ${isExpanded ? "justify-start" : "justify-center"}`}
            >
              <LogOut size={18} className="text-red-400" />
              {isExpanded && <span className="ml-3 text-sm">Sign out</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Modal components */}
      {showSignoutModal && (
        <SignoutModal
          isOpen={showSignoutModal}
          onClose={() => setShowSignoutModal(false)}
          onSignout={() => {
            // Handle signout logic here
            console.log("User signed out");
            setShowSignoutModal(false);
          }}
        />
      )}

      {showAccountModal && (
        <AccountModal
          isOpen={showAccountModal}
          onClose={() => setShowAccountModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileSidenav}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidenav;

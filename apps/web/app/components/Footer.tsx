import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 px-8 bg-black/40 backdrop-blur-xl border-t border-white/10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Copyright Text */}
        <div className="text-gray-400 text-sm mb-4 sm:mb-0">
          © 2025 Rave. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {/* Twitter/X */}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-sky-500/20 hover:text-white hover:border-sky-500/50 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </Link>

          {/* Discord */}
          <Link
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-500/20 hover:text-white hover:border-indigo-500/50 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h4"></path>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="8" cy="12" r="1"></circle>
              <path d="M8 9v1"></path>
              <path d="M15 9v1"></path>
              <path d="M9 16s1 2 3 2 3-2 3-2"></path>
            </svg>
          </Link>

          {/* Instagram */}
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-pink-500/20 hover:text-white hover:border-pink-500/50 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

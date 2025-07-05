"use client";
import React from "react";
import SpotlightCard from "../bits/SpotlightCard";

const FeatureSection = () => {
  return (
    <div id="features" className="py-7 px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center px-4 py-2  border-sky-500 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
          <span className="text-sky-500 text-sm font-medium uppercase tracking-wider">
            Features
          </span>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover what makes Rave the perfect choice for creating RoadMap
          Journeys
        </p>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mx-auto max-w-6xl">
        <SpotlightCard
          className="custom-spotlight-card p-7 h-[400px] max-w-[320px] pb-20 border-none bg-gradient-to-r from-black/60 via-black/50 to-black/60 backdrop-blur-xl shadow-2xl shadow-sky-500/20 border border-white/10 hover:-translate-y-1 hover:shadow-sky-500/40 transition-all duration-300"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="flex flex-col items-start text-left h-full">
            <svg
              className="w-12 h-12 mb-4 text-sky-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,12" />
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Time-Limited Rooms
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              All chat rooms automatically expire after a set time period,
              ensuring conversations remain ephemeral.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card p-7 h-[400px] max-w-[320px] pb-20 border-none bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl shadow-pink-500/20 border border-white/10 hover:-translate-y-1 hover:shadow-pink-500/40 transition-all duration-300"
          spotlightColor="rgba(255, 0, 128, 0.2)"
        >
          <div className="flex flex-col items-start text-left h-full">
            <svg
              className="w-12 h-12 mb-4 text-pink-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">Privacy Focused</h3>
            <p className="text-gray-400 flex-grow pt-2">
              We don't store your messages after the chat expires. Your data is
              never used for training or analytics.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card p-7 h-[400px] max-w-[320px] pb-20 border-none bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl shadow-green-500/20 border border-white/10 hover:-translate-y-1 hover:shadow-green-500/40 transition-all duration-300"
          spotlightColor="rgba(0, 255, 128, 0.2)"
        >
          <div className="flex flex-col items-start text-left h-full">
            <svg
              className="w-12 h-12 mb-4 text-green-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Complete Anonymity
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Users can chat without revealing their identity, encouraging open
              and honest communication
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card p-7 h-[400px] max-w-[320px] pb-20 border-none bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl shadow-orange-500/20 border border-white/10 hover:-translate-y-1 hover:shadow-orange-500/40 transition-all duration-300"
          spotlightColor="rgba(255, 128, 0, 0.2)"
        >
          <div className="flex flex-col items-start text-left h-full">
            <svg
              className="w-12 h-12 mb-4 text-orange-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Optional Moderation
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Choose between supervised rooms with AI toxicity filtering or
              unsupervised free speech.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card p-7 h-[400px] max-w-[320px] pb-20 border-none bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl shadow-yellow-500/20 border border-white/10 hover:-translate-y-1 hover:shadow-yellow-500/40 transition-all duration-300"
          spotlightColor="rgba(240, 177, 0, 0.2)"
        >
          <div className="flex flex-col items-start text-left h-full">
            <svg
              className="w-12 h-12 mb-4 text-yellow-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M13 8H7" />
              <path d="M13 12H7" />
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">Easy Sharing</h3>
            <p className="text-gray-400 flex-grow pt-2">
              Create a room and share the link instantly with anyone you want to
              join the conversation.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default FeatureSection;

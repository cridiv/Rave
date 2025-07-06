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
          Discover what makes Rave the perfect choice for creating personalized
          AI learning roadmaps
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Personalized Roadmaps
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              AI-generated learning paths tailored to your specific goals, skill
              level, and time constraints.
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
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Customizable Journeys
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Edit and customize every aspect of your learning journey, from
              milestones to resources and deadlines.
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
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Progress Tracking
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Monitor your advancement with interactive visualizations and
              detailed analytics on your learning path.
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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Collaborative Learning
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Share your roadmaps with peers or mentors, enabling collaborative
              feedback and group learning experiences.
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
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Adaptive Recommendations
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Our AI continuously adapts your learning path based on your
              progress, feedback, and changing goals.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card p-7 h-[400px] max-w-[320px] pb-20 border-none bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl shadow-violet-500/20 border border-white/10 hover:-translate-y-1 hover:shadow-violet-500/40 transition-all duration-300"
          spotlightColor="rgba(139, 92, 246, 0.2)"
        >
          <div className="flex flex-col items-start text-left h-full">
            <svg
              className="w-12 h-12 mb-4 text-violet-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3 className="text-xl font-semibold pt-6 mb-3">
              Resource Integration
            </h3>
            <p className="text-gray-400 flex-grow pt-2">
              Seamlessly connect with the best learning materials from across the web - courses, articles, videos, and practice exercises are automatically curated and integrated into your journey.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default FeatureSection;

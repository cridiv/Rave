"use client";
import React from "react";
import Link from "next/link";
import SpotlightCard from "../bits/SpotlightCard";

const HowToUse = () => {
  return (
    <div id="how-it-works" className="py-16 px-5 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-2  border-sky-500 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
          <span className="text-sky-500 text-sm font-medium uppercase tracking-wider">
            How to use
          </span>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Create your personalized AI roadmaps called "Journeys" in just a few
          simple steps
        </p>
      </div>

      {/* Steps Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full border-[3px] border-sky-500 flex items-center justify-center text-2xl font-bold text-sky-500 mb-4 shadow-lg shadow-sky-500/30">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Log Into Your Account</h3>
          <p className="text-gray-400">
            Sign in to your Rave account to access the Journey creation
            dashboard
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full border-[3px] border-sky-500 flex items-center justify-center text-2xl font-bold text-sky-500 mb-4 shadow-lg shadow-sky-500/30">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Input Your Roadmap Topic
          </h3>
          <p className="text-gray-400">
            Enter your desired learning path, skill, or subject you want a
            roadmap for
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full border-[3px] border-sky-500 flex items-center justify-center text-2xl font-bold text-sky-500 mb-4 shadow-lg shadow-sky-500/30">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Get Your AI Roadmap</h3>
          <p className="text-gray-400">
            The AI generates a personalized Journey roadmap with milestones,
            resources, and timelines
          </p>
        </div>
      </div>

      {/* Demo/Illustration */}
      <div className="hidden mt-20 max-w-4xl mx-auto">
        <SpotlightCard
          className="p-8 border-none bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl shadow-sky-500/20 border border-white/10"
          spotlightColor="rgba(14, 165, 233, 0.2)"
        >
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-2xl font-semibold mb-4">
                  See Journeys in Action
                </div>
                <p className="text-gray-400 mb-6">
                  Experience how our AI creates personalized learning roadmaps
                  tailored to your goals
                </p>
                <Link
                  href="/signin"
                  className="btn bg-sky-500 text-white px-8 py-3 rounded-full shadow-lg shadow-sky-500/30 border-none hover:shadow-sky-500/50 hover:-translate-y-1 transition-all duration-300"
                >
                  Try Sample Journey
                </Link>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-sky-500/30 rounded-tl-lg"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-sky-500/30 rounded-br-lg"></div>
          </div>
        </SpotlightCard>
      </div>

      {/* FAQ or Additional Details */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Make Your Journey Even Better
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Customize your roadmap with additional preferences, track your
          progress, and connect with mentors along the way
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signin"
            className="btn bg-gradient-to-r from-sky-500 to-sky-400 text-white transition-all duration-300 rounded-full px-8 hover:shadow-sky-500/50 hover:-translate-y-1"
          >
            Create Your Journey
          </Link>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

export default HowToUse;

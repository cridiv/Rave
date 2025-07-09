"use client";
import React from "react";
import Link from "next/link";
import BlurText from "../bits/BlurText";
import Orb from "../bits/Orb";

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  // Function to handle button click and navigate
  const MoveToSignIn = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="pt-4 font-proxima min-h-screen relative">
      {/* Hero Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh] px-5 relative z-10">
        {/* Text Column */}

        <div className="flex flex-col justify-center space-y-6">
          <div className="text-4xl lg:text-5xl font-bold leading-tight">
            Unlock Personalized AI Roadmaps Journeys with{" "}
            <span className="font-bold border-none bg-gradient-to-r from-sky-500 to-sky-100 text-transparent bg-clip-text hover:from-sky-500 hover:to-sky-200 transition-all duration-300">
              Rave
            </span>
          </div>

          <div className="text-2xl">
            <BlurText
              text={`Experience the future of personalized journeys with Rave, where your unique path is crafted just for you.`}
              delay={15}
              animateBy="letters"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl lg:text-2xl leading-tight"
            />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/signin"
              className="btn bg-sky-500 text-white px-6 py-3 rounded-full shadow-lg shadow-sky-500/50 border-none hover:shadow-sky-500/75 hover:-translate-y-1 transition-transform duration-200"
            >
              Get Started
            </Link>

            <Link
              href="/#features"
              className="btn text-white rounded-full shadow-lg shadow-sky-500/50 border-sky-500 hover:-translate-y-1 transition-transform duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* SVG/Animation Column - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center">
          <div style={{ width: "100%", height: "600px", position: "relative" }}>
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

export default Hero;

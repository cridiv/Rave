"use client";
import React from "react";

interface SuggestionPillProps {
  text: string;
  onClick: (text: string) => void;
  index: number;
  isLoaded: boolean;
}

const SuggestionPill: React.FC<SuggestionPillProps> = ({
  text,
  onClick,
  index,
  isLoaded,
}) => {
  return (
    <button
      onClick={() => onClick(text)}
      className={`
        group px-6 py-3 
        bg-white/5 hover:bg-sky-500/10 
        border border-white/10 hover:border-sky-400/50 
        rounded-full text-sm text-gray-300 hover:text-white 
        transition-all duration-300 shadow-lg 
        hover:shadow-sky-500/30 hover:-translate-y-1 
        backdrop-blur-sm whitespace-nowrap flex-shrink-0
        ${isLoaded ? "animate-none" : "animate-pulse"}
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:to-indigo-500/10 rounded-full transition-all duration-300" />
    </button>
  );
};

export default SuggestionPill;

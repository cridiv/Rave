"use client";
import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import RoadmapDisplay from "./RoadmapDisplay";
import SuggestionPill from "./SuggestionPill";
import { useRouter } from "next/navigation";

// Define types for the API response
type Resource = {
  type: string;
  title: string;
  link: string;
};

type Node = {
  id: string | number;
  title: string;
  description: string;
  resources: Resource[];
};

type Stage = {
  id: string | number;
  title: string;
  nodes: Node[];
};

type RoadmapData = Stage[] | string | null;

type ChatContainerProps = {
  userId: string;
  roadmapId?: string | null;
};

const ChatContainer: React.FC<ChatContainerProps> = ({ userId, roadmapId }) => {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    { left: string; top: string; duration: string }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const router = useRouter();

  // Load existing roadmap if roadmapId is provided
  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!roadmapId) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/roadmap/${roadmapId}?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setRoadmap(data.roadmap);
        } else {
          console.error("❌ Error loading roadmap:", res.statusText);
          setRoadmap("⚠️ Couldn't load roadmap");
        }
      } catch (err) {
        console.error("❌ Error loading roadmap:", err);
        setRoadmap("⚠️ Couldn't load roadmap");
      }
    };

    fetchRoadmap();
  }, [roadmapId, userId]);

  // Handle window load and mouse movement effects
  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate particles after mount only (no mismatch with SSR)
    const generated = Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(generated);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Example suggestions
  const suggestions = [
    "Generate a roadmap for a frontend developer",
    "Learn machine learning in 6 months",
    "Become a full-stack developer",
    "Master React and Next.js",
  ];

  // Handle sending messages to the API
  const handleSendMessage = async (message: string) => {
    setLoading(true);
    setCurrentMessage(message);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: message }),
      });

      const data = await res.json();
      console.log("Full API response:", data);

      // Set the new roadmap
      if (data.roadmap) {
        console.log("Setting roadmap to:", data.roadmap);
        setRoadmap(data.roadmap);
        
        // Save the NEW roadmap to history
        try {
          const saveRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmap`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              title: message,
              goal: message,
              roadmap: data.roadmap,
            }),
          });

          if (saveRes.ok) {
            const savedRoadmap = await saveRes.json();
            console.log("✅ Roadmap saved:", savedRoadmap);
            
            // Redirect to the new roadmap page
            router.push(`/roadmap/${savedRoadmap.id}`);
          } else {
            console.error("❌ Failed to save roadmap:", saveRes.statusText);
          }
        } catch (saveErr) {
          console.error("❌ Error saving roadmap:", saveErr);
        }
      } else if (data.error) {
        console.log("API returned error:", data.error);
        setRoadmap(data.error);
      } else {
        console.log("No roadmap or error in response");
        setRoadmap("⚠️ No roadmap received. Try another query.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setRoadmap("❌ Failed to fetch roadmap. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking on a suggestion pill
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div
      className="min-h-screen w-full text-white font-proxima overflow-y-auto"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(14, 165, 233, 0.08) 0%, transparent 60%),
          linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0a0a0a 100%)
        `,
      }}
    >
      {/* Interactive cursor glow */}
      <div
        className="fixed pointer-events-none w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)",
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-sky-400/10 rounded-full animate-pulse"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: `${i * 0.5}s`,
              animationDuration: pos.duration,
            }}
          />
        ))}
      </div>

      <main className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 text-center relative z-10">
        {/* Heading */}
        <div
          className={`mb-8 space-y-3 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
            What do you want to plan?
          </h1>
          <p
            className={`text-[16px] text-[#BFC1C2] transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Generate personalized roadmaps Journeys with Rave AI.
          </p>
        </div>

        {/* Input */}
        <div
          className={`w-full max-w-2xl mb-8 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
        </div>

        {/* Roadmap results (when available) */}
        {roadmap && (
          <div
            className={`w-full max-w-3xl mb-8 transition-all duration-500 ${
              loading ? "opacity-50" : "opacity-100"
            }`}
          >
            <RoadmapDisplay roadmap={roadmap} />
          </div>
        )}

        {/* Suggestion Pills (show only when no roadmap is displayed) */}
        {!roadmap && (
          <div
            className={`flex flex-wrap gap-3 justify-center max-w-2xl transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {suggestions.map((text, index) => (
              <SuggestionPill
                key={text}
                text={text}
                onClick={handleSuggestionClick}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        )}

        {/* Footer Tip (show only when no roadmap is displayed) */}
        {!roadmap && (
          <div
            className={`mt-8 flex flex-col items-center gap-2 text-xs text-gray-500 transition-all duration-1000 delay-1000 justify-center ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              <span>Start typing to begin your personalized journey</span>
            </div>
          </div>
        )}

        <div className="h-24" />
      </main>
    </div>
  );
};

export default ChatContainer;
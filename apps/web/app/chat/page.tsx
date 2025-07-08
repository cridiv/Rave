'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Input from './input';
import Sidenav from './components/Sidenav/Sidenav';
import RoadmapDisplay from './components/RoadmapDisplay';

export default function ChatPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const [particles, setParticles] = useState<
    { left: string; top: string; duration: string }[]
  >([]);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const generated = Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(generated);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSendMessage = async (message: string) => {
    setLoading(true);
    setRoadmap(null);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: message }),
      });

      const data = await res.json();

      if (data.roadmap) {
        setRoadmap(data.roadmap);
      } else {
        setRoadmap('No roadmap received. Please try a different query.');
      }
    } catch (err) {
      console.error('Error:', err);
      setRoadmap('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rave – Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div
        className={`min-h-screen w-full fixed inset-0 text-white font-proxima ${
          roadmap ? 'overflow-y-auto' : 'overflow-hidden'
        } flex items-center justify-center p-4`}
        style={{ background: '#000000' }}
      >

        {/* Interactive glow */}
        <div
          className="fixed pointer-events-none w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-500"
          style={{
            background:
              'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Background particles */}
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

        <Sidenav />

        <main className="flex flex-col items-center justify-start pt-32 px-4 text-center relative z-10 w-full max-w-4xl">
          {/* Heading */}
          <div
            className={`mb-8 space-y-3 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent">
              What do you want to build?
            </h1>
            <p className="text-lg text-[#BFC1C2]">
              Generate personalized roadmaps by chatting with AI.
            </p>
          </div>

          {/* Chat Input */}
          <div className="w-full max-w-2xl mb-12">
            <Input onSendMessage={handleSendMessage} isLoading={loading} />
          </div>

          {/* Roadmap Display */}
          {roadmap && (
            <div className="w-full pb-40">
              <RoadmapDisplay roadmap={roadmap} />
            </div>
          )}

           {/* Suggestion Pills */}
          <div className={`flex gap-3 justify-center max-w-none overflow-x-auto transition-all duration-1000 delay-700 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              'Generate a roadmap for a frontend developer',
              'Learn machine learning in 6 months',
              'Become a full-stack developer',
            ].map((text, index) => (
              <button
                key={text}
                className={`group px-6 py-3 bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-400/50 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1 backdrop-blur-sm whitespace-nowrap flex-shrink-0 ${
                  isLoaded ? 'animate-none' : 'animate-pulse'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <span className="relative z-10">{text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:to-indigo-500/10 rounded-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Footer Tip */}
          <div
            className={`mt-8 flex items-center gap-2 text-xs text-gray-500 transition-all duration-1000 delay-1000 justify-center ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            <span>Start typing to begin your personalized journey</span>
          </div>

          <div className="h-24" />
        </main>
      </div>
    </>
  );
}
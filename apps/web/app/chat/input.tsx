'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Sparkles, ArrowRight, Mic } from 'lucide-react';

const Input: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ✅ Auto-resize & update typing state
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(value.length > 0);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // ✅ Handle sending prompt
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setRoadmap('');

    try {
      const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: inputValue }),
    });

      const data = await res.json();
      console.log('🌐 RESPONSE:', data);
      setRoadmap(data.roadmap || '⚠️ No roadmap received');
    } catch (err) {
      console.error('❌ Error:', err);
      setRoadmap('❌ Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Neumorphism container */}
      <div className={`relative transition-all duration-500 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
        <div
          className={`relative bg-[#1a1a1d]/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300`}
          style={{
            boxShadow: isFocused
              ? 'inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(255,255,255,0.05), 0 0 20px rgba(14,165,233,0.1)'
              : 'inset 0 2px 6px rgba(0,0,0,0.2), inset 0 -2px 6px rgba(255,255,255,0.02), 0 0 10px rgba(14,165,233,0.05)',
          }}
        >
<div
  className="absolute top-4 right-4 z-20" 
  style={{
    pointerEvents: isTyping ? 'auto' : 'none', 
    opacity: isTyping ? 1 : 0,
    transform: isTyping ? 'translateX(0) scale(1)' : 'translateX(16px) scale(0.95)',
    transition: 'all 0.3s ease-out',
  }}
>
            <button
              onClick={handleSend}
              disabled={loading}
              className="cursor-pointer relative p-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 group overflow-hidden disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* ✅ Textarea */}
          <div className="relative flex flex-col gap-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Describe your learning goal or ask anything..."
                className="w-full bg-transparent text-gray-100 placeholder-gray-400 resize-none outline-none text-base leading-relaxed min-h-[80px] max-h-[200px] transition-all duration-300"
                rows={4}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  paddingRight: isTyping ? '60px' : '0',
                }}
              />
            </div>

            {/* Bottom bar with icons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/30 transition-all duration-200 group">
                  <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-sky-400" />
                </button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/30 transition-all duration-200 group">
                  <Mic className="w-4 h-4 text-gray-400 group-hover:text-sky-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Roadmap display */}
{roadmap && (
  <div className="mt-6 bg-white/5 text-gray-100 p-4 rounded-lg border border-white/10 text-sm space-y-6">
    {roadmap.map((stage: any) => (
      <div key={stage.id}>
        <h3 className="text-lg font-semibold mb-2">{stage.title}</h3>
        <ul className="list-disc list-inside space-y-2">
          {stage.nodes.map((node: any) => (
            <li key={node.id}>
              <p className="font-medium">{node.title}</p>
              <p className="text-gray-400">{node.description}</p>
              <ul className="ml-4 mt-1 list-[circle] space-y-1">
                {node.resources.map((res: any, idx: number) => (
                  <li key={idx}>
                    <a
                      href={res.link}
                      className="text-sky-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [{res.type}] {res.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}
    </div>
  );
};

export default Input;

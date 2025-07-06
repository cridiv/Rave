'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Sparkles, ArrowRight, Mic } from 'lucide-react';

const Input: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(value.length > 0);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative w-full">
      {/* Neumorphism container */}
      <div className={`relative transition-all duration-500 ${
        isFocused ? 'transform scale-[1.01]' : ''
      }`}>
        {/* Simple neumorphism background */}
        <div className={`relative bg-[#1a1a1d]/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300`}
        style={{
          boxShadow: isFocused 
            ? 'inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(255,255,255,0.05), 0 0 20px rgba(14,165,233,0.1)'
            : 'inset 0 2px 6px rgba(0,0,0,0.2), inset 0 -2px 6px rgba(255,255,255,0.02), 0 0 10px rgba(14,165,233,0.05)'
        }}>
          
          {/* Send button - positioned at top right */}
          <div className={`absolute top-4 right-4 transition-all duration-300 ease-out ${
            isTyping 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
          }`}>
            <button className="relative p-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
          
          {/* Input container */}
          <div className="relative flex flex-col gap-4">
            {/* Textarea with enhanced styling */}
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
                  paddingRight: isTyping ? '60px' : '0'
                }}
              />
            </div>
            
            {/* Bottom bar with icons */}
            <div className="flex items-center justify-between">
              {/* Left side - Attachment and Voice buttons */}
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
    </div>
  );
};

export default Input;
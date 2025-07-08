'use client';

import React, { useState, useRef } from 'react';
import { Paperclip, Sparkles, ArrowRight, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [listening, setListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const messageToSend = inputValue.trim();
    console.log("📤 ChatInput sending message:", messageToSend);
    
    // Clear input immediately
    setInputValue('');
    setIsTyping(false);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Use the parent's onSendMessage function
    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error("❌ Error in ChatInput handleSend:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      setInputValue(text);
      setIsTyping(text.length > 0);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    } catch (err) {
      console.error('❌ Error reading file:', err);
    }
  };

  const startSpeechRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(prev => (prev ? prev + ' ' + transcript : transcript));
      setIsTyping(true);
    };

    recognition.onerror = (event: any) => {
      const silentErrors = ['aborted', 'no-speech', 'not-allowed', 'service-not-allowed'];
      if (silentErrors.includes(event.error)) {
        console.warn("Speech recognition warning:", event.error);
      } else {
        console.error("Speech recognition error:", event.error);
      }
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative w-full">
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
              disabled={isLoading}
              className="cursor-pointer relative p-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 group overflow-hidden disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <div className="relative flex flex-col gap-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                placeholder="Describe your learning goal or ask anything..."
                className="w-full bg-transparent text-gray-100 placeholder-gray-400 resize-none outline-none text-base leading-relaxed min-h-[80px] max-h-[200px] transition-all duration-300"
                rows={4}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  paddingRight: isTyping ? '60px' : '0',
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor="file-upload" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/30 transition-all duration-200 group cursor-pointer">
                  <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-sky-400" />
                </label>
                <input id="file-upload" type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
                <button
                  onClick={startSpeechRecognition}
                  className={`p-2 rounded-lg ${listening ? 'bg-sky-600' : 'bg-white/5 hover:bg-white/10'} border border-white/10 hover:border-sky-400/30 transition-all duration-200 group`}
                >
                  <Mic className="w-4 h-4 text-gray-400 group-hover:text-sky-400" />
                </button>
                {listening && (
                  <p className="text-xs text-sky-400 mt-2 animate-pulse">Listening...</p>
                )}
                {isLoading && (
                  <div className="text-sm text-sky-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                    Generating roadmap...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
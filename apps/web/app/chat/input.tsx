"use client";

import React, { useState, useRef } from "react";
import { Paperclip, Sparkles, ArrowRight, Mic } from "lucide-react";

const Input: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [listening, setListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(value.length > 0);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setRoadmap("");
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: inputValue }),
      });

      if (!res.ok) {
        if (res.status === 404)
          throw new Error("🚫 Backend route not found (404)");
        if (res.status === 500) throw new Error("💥 Server error (500)");
        throw new Error(`⚠️ Error: ${res.statusText} (${res.status})`);
      }

      const data = await res.json();
      setRoadmap(data.roadmap || "⚠️ No roadmap received");
    } catch (err: any) {
      console.error("❌ Fetch error:", err.message);
      setRoadmap(err.message || "❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
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
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    } catch (err) {
      console.error("❌ Error reading file:", err);
    }
  };

  const startSpeechRecognition = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => (prev ? prev + " " + transcript : transcript));
      setIsTyping(true);
    };

    recognition.onerror = (event: any) => {
      const silentErrors = [
        "aborted",
        "no-speech",
        "not-allowed",
        "service-not-allowed",
      ];
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
    <div className="flex h-screen">
      <Sidenav
        chatHistory={[
          { id: "1", title: "Frontend Developer Roadmap", date: "2023-05-15" },
          { id: "2", title: "Machine Learning Basics", date: "2023-05-20" },
          { id: "3", title: "Full-Stack Development Path", date: "2023-06-01" },
        ]}
      />
      <div className="flex-1">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Input;

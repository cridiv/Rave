"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
};

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="w-[80%] mx-auto mb-6"
    >
      <div
        onClick={onToggle}
        className={`
          rounded-xl p-6 cursor-pointer 
          bg-gradient-to-r from-black/80 via-black/70 to-black/80 
          backdrop-blur-xl shadow-lg 
          border border-white/10 
          hover:border-sky-500/20 
          transition-all duration-300
          ${isOpen ? "shadow-sky-500/20" : "shadow-black/20"}
        `}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-white">{question}</h3>
          <button
            className={`
              w-8 h-8 rounded-full flex items-center justify-center 
              transition-all duration-300 ease-in-out
              ${isOpen ? "bg-sky-500 rotate-180" : "bg-white/10"} 
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke={isOpen ? "white" : "currentColor"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-gray-300 leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What exactly is a Rave Journey?",
      answer:
        "A Rave Journey is a personalized AI-powered roadmap designed to guide you through learning a new skill, subject, or achieving a specific goal. Each Journey includes customized milestones, curated resources, and recommended timelines based on your specific needs and preferences.",
    },
    {
      question: "How does the AI create personalized roadmaps?",
      answer:
        "Our advanced AI analyzes your inputs including your current skill level, available time commitment, learning style preferences, and goals. It then draws from a vast database of educational resources, expert paths, and successful learning patterns to create a roadmap specifically tailored to you. The AI continuously improves as you provide feedback and track your progress.",
    },
    {
      question: "Can I customize my Journey after it's created?",
      answer:
        "Absolutely! While the AI creates an initial roadmap, you have full control to modify any aspect of your Journey. You can adjust timelines, add or remove milestones, incorporate specific resources, or even merge multiple Journeys. The platform also allows you to track progress, make notes, and receive adaptive recommendations as you advance.",
    },
    {
      question: "Is Rave suitable for teams or just individuals?",
      answer:
        "Rave works wonderfully for both individuals and teams. For teams, we offer collaborative Journeys where multiple members can follow the same roadmap, track collective progress, and share insights. Team leaders can monitor overall advancement, identify bottlenecks, and ensure everyone stays aligned with learning objectives. We also provide enterprise solutions with advanced analytics and custom integration options.",
    },
  ];

  return (
    <div id="faqs" className="py-20 px-5 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-2 border-sky-500 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
          <span className="text-sky-500 text-sm font-medium uppercase tracking-wider">
            FAQs
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about Rave and creating your personalized
          Journeys
        </p>
      </div>

      {/* FAQ Items */}
      <div className="mt-12">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Still have questions? We're here to help you get started with your
          personalized learning journey.
        </p>
        <button className="btn bg-gradient-to-r from-sky-500 to-sky-400 text-white transition-all duration-300 rounded-full px-8 hover:shadow-sky-500/50 hover:-translate-y-1">
          Contact Support
        </button>
      </motion.div>
    </div>
  );
};

export default FAQsSection;

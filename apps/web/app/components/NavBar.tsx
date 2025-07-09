"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="
        navbar 
        bg-gradient-to-r 
        from-white/10 
        via-white/15 
        to-white/10 
        backdrop-blur-xl 
        shadow-2xl 
        shadow-black/10
        rounded-full
        border 
        border-white/20 
        fixed
        top-0
        left-0
        right-0
        z-50
        mx-4
        ml-6
        mt-4
        p-2
        w-[95%]
        hover:bg-gradient-to-r
        hover:from-white/15
        hover:via-white/20
        hover:to-white/15
        transition-all
        duration-500
      "
    >
      {/* Glass shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl opacity-30 pointer-events-none"></div>

      <div className="navbar-start relative z-10">
        <div className="dropdown">
          <div
            role="button"
            onClick={toggleMenu}
            className="btn btn-ghost lg:hidden text-white border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-xl font-bold border-none bg-gradient-to-r from-sky-500 to-sky-100 text-transparent bg-clip-text hover:from-sky-500 hover:to-sky-200 transition-all duration-300"
        >
          <Image src="/rave-sm.svg" alt="Rave logo" width={24} height={24} />
          Rave
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex relative z-10">
        <ul className="menu menu-horizontal px-1">
          <li className="">
            <Link
              href="#features"
              className="relative text-white hover: transition-all duration-300 px-3 py-2 pr-6 overflow-hidden group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-full group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="relative text-white hover: transition-all duration-300 px-3 py-2 pr-6 overflow-hidden group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-full group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#faqs"
              className="relative text-white hover: transition-all duration-300 px-3 py-2 overflow-hidden group"
            >
              FAQs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-full group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end relative z-10">
        <Link href="/signin">
          <button className="btn bg-sky-500 text-white px-6 py-3 rounded-full shadow-lg shadow-sky-500/50 border-none hover:shadow-sky-500/75 hover:-translate-y-1 transition-all duration-300">
            Get Started
          </button>
        </Link>
      </div>

      {/* Full-screen mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 lg:hidden"
            style={{ height: "100vh", width: "100vw", top: 0, left: 0 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6">
                <a className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-100 text-transparent bg-clip-text">
                  Rave
                </a>
                <button
                  onClick={toggleMenu}
                  className="btn btn-circle btn-ghost text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col justify-center items-center flex-grow">
                <motion.ul className="flex flex-col items-center gap-8 text-center">
                  {[
                    { name: "Features", href: "#features" },
                    { name: "How It Works", href: "#how-it-works" },
                    { name: "FAQs", href: "#faqs" },
                  ].map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className="text-3xl font-medium text-white block py-3 px-8 relative overflow-hidden group"
                        onClick={toggleMenu}
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-1/4 w-0 h-0.5 bg-sky-500 shadow-[0_0_10px_#0ea5e9] group-hover:w-1/2 group-hover:shadow-[0_0_20px_#0ea5e9] transition-all duration-500 ease-out"></span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <Link href="/SignIn" onClick={toggleMenu}>
                    <button className="btn bg-gradient-to-r from-sky-500 to-sky-400 text-white text-xl px-10 py-4 rounded-full shadow-lg shadow-sky-500/50 border-none hover:shadow-sky-500/75 hover:-translate-y-1 transition-all duration-300">
                      Get Started
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;

"use client";
import React from "react";
import { supabase } from '@/lib/supabase';
import { motion } from "framer-motion";
import Link from "next/link";

const SignIn = () => {
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `http://localhost:3000/chat`,
      },
    });

    if (error) {
      console.error('OAuth error:', error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black/90">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] bg-sky-500/20 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl shadow-2xl shadow-black/20 rounded-3xl border border-white/10 p-8 relative overflow-hidden">
          {/* Glass shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl opacity-30 pointer-events-none"></div>

          {/* Logo */}
          <div className="flex justify-center mb-6 pb-3">
            <div className="text-3xl font-bold">
              Welcome To{" "}
              <span className=" bg-gradient-to-r from-sky-500 to-sky-100 text-transparent bg-clip-text">
                Rave
              </span>
            </div>
          </div>

          {/* Info text */}
          <p className="text-white/80 text-center mb-8 pb-4">
            To use Rave you must log into an existing account or create one
            using one of the options below
          </p>

          {/* Sign-in buttons */}
          <div className="space-y-4 pb-5">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-4 rounded-xl border border-white/10 transition duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-white/5"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* <button className="w-full bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-4 rounded-xl border border-white/10 transition duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-white/5"> */}
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              <span>Sign in with GitHub</span>
            </button>

            {/* Future sign-in options 
             <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/30 text-white/50 backdrop-blur-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30">
              <span>Sign In with Email and Password</span>
            </button> */}
          </div>

          {/* Terms and privacy */}
          <p className="mt-8 text-xs text-center text-white/50 pb-3">
            By signing in, you accept the{" "}
            <Link href="#" className="text-sky-400 hover:text-sky-300">
              Terms of Service
            </Link>{" "}
            and acknowledge our{" "}
            <Link href="#" className="text-sky-400 hover:text-sky-300">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-sm flex items-center justify-center gap-1 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

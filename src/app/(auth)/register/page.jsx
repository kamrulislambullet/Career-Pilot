import React from "react";
import { UserPlus, Mail, Lock, User, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#05070a] selection:bg-indigo-500/30 p-4 overflow-hidden relative">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-[#0d1117]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20">
            <UserPlus className="text-indigo-400" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">
            Join us to start tracking your jobs [cite: 2, 6]
          </p>
        </div>

        <form className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div className="space-y-1">
            <div className="relative group">
              <ImageIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="url"
                placeholder="Photo URL (e.g. https://...)"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* Indigo Submit Button */}
          <button className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-white/5">
            Get Started
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 ml-2 font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

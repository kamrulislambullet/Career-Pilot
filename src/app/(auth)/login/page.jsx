import LoginForm from "@/components/LoginForm";
import React, { Suspense } from "react";

function LoginFallback() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#05070a] p-4 overflow-hidden relative">
      {/* Same Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md p-8 bg-[#0d1117]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl z-10">
        {/* Header — spinner replaces icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20 relative">
            <div className="w-7 h-7 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
          </div>
          <div className="h-8 w-40 bg-white/5 rounded-xl mx-auto mb-3 animate-pulse" />
          <div className="h-4 w-56 bg-white/5 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Email Field Skeleton */}
        <div className="space-y-5">
          <div className="h-12.5 w-full bg-white/3 border border-white/10 rounded-2xl animate-pulse" />

          {/* Password Field Skeleton */}
          <div className="h-12.5 w-full bg-white/3 border border-white/10 rounded-2xl animate-pulse [animation-delay:100ms]" />

          {/* Sign In Button Skeleton */}
          <div className="h-14 w-full bg-indigo-600/40 rounded-2xl animate-pulse [animation-delay:200ms]" />

          {/* Divider */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-600 uppercase">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Button Skeleton */}
          <div className="h-12 w-full bg-white/5 rounded-2xl animate-pulse [animation-delay:300ms]" />
        </div>

        {/* Bottom register link */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
          <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

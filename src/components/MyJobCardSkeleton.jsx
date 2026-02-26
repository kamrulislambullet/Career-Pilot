import React from "react";

export default function MyJobCardSkeleton() {
  return (
    <div className="bg-[#0d1117] rounded-[1.9rem] md:rounded-[2.8rem] p-5 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
      {/* Left side */}
      <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 w-full lg:w-3/5">
        <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-4xl shrink-0" />
        <div className="space-y-3 w-full">
          <div className="h-7 bg-white/10 rounded-lg w-2/3" />
          <div className="flex flex-wrap gap-3">
            <div className="h-4 bg-white/5 rounded-md w-24" />
            <div className="h-4 bg-white/5 rounded-md w-20" />
            <div className="h-4 bg-indigo-500/10 rounded-md w-16" />
          </div>
        </div>
      </div>
      {/* Right side buttons */}
      <div className="flex flex-row items-center gap-2 md:gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/5 lg:border-none justify-between sm:justify-end">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-12 w-28 bg-indigo-500/10 rounded-xl md:rounded-2xl" />
          <div className="h-12 w-28 bg-red-500/10 rounded-xl md:rounded-2xl" />
        </div>
        <div className="h-12 w-12 bg-white/5 rounded-xl md:rounded-2xl" />
      </div>
    </div>
  );
}

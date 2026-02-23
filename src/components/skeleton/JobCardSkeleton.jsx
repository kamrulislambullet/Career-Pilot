import React from "react";

export default function JobCardSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] animate-pulse"
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Left Side: Content */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-4">
                {/* Icon Placeholder */}
                <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10" />
                
                {/* Title & Company Placeholder */}
                <div className="space-y-3">
                  <div className="h-6 w-48 bg-white/10 rounded-lg" />
                  <div className="h-4 w-32 bg-white/5 rounded-md" />
                </div>
              </div>

              {/* Description Placeholder */}
              <div className="space-y-2.5">
                <div className="h-3.5 w-full bg-white/5 rounded-md" />
                <div className="h-3.5 w-4/5 bg-white/5 rounded-md" />
              </div>

              {/* Tags Placeholder */}
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-7 w-16 bg-white/5 rounded-lg" />
                <div className="h-7 w-20 bg-white/5 rounded-lg" />
                <div className="h-7 w-14 bg-white/5 rounded-lg" />
              </div>
            </div>

            {/* Right Side: Meta & Button */}
            <div className="flex flex-col justify-between items-end gap-6">
              <div className="text-right space-y-3">
                {/* Location Placeholder */}
                <div className="flex items-center gap-2 justify-end">
                  <div className="h-4 w-24 bg-white/5 rounded-md" />
                </div>
                {/* Salary Placeholder */}
                <div className="h-7 w-32 bg-indigo-500/10 rounded-lg ml-auto" />
              </div>

              {/* Apply Button Placeholder */}
              <div className="h-11 w-36 bg-white/10 rounded-xl border border-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
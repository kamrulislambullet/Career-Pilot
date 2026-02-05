import Link from "next/link";
import {
  Briefcase,
  FileText,
  PieChart,
  ArrowRight,
  Search,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Hero Section  */}
        <div className="text-center mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            The All-in-One Career Suite
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Land Your Dream Job <br className="hidden md:block" /> With
            Precision.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Track your job applications, build professional resumes, and monitor
            your career growth with detailed analytics—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              href="/register"
              className="group px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-500 font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-600/20"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 font-semibold transition-all backdrop-blur-sm"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Tracking [cite: 7] */}
          <div className="group p-8 rounded-4xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Briefcase className="text-blue-400 w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Tracking</h3>
            <p className="text-gray-400 leading-relaxed">
              Keep your interview stages and application statuses updated in
              real-time. Never miss a follow-up again[cite: 8, 9].
            </p>
          </div>

          {/* Resume Builder */}
          <div className="group p-8 rounded-4xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <FileText className="text-emerald-400 w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Pro Resume Builder</h3>
            <p className="text-gray-400 leading-relaxed">
              Create sleek, industry-standard resumes using modern schemas and
              export them instantly as high-quality PDFs[cite: 12, 20].
            </p>
          </div>

          {/* Dashboard/Analytics */}
          <div className="group p-8 rounded-4xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <PieChart className="text-purple-400 w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Deep Analytics</h3>
            <p className="text-gray-400 leading-relaxed">
              Visualize your progress with interactive charts. Track total
              applications and success rates effortlessly[cite: 16, 18].
            </p>
          </div>
        </div>

        {/* Search & Filter Preview */}
        <div className="mt-6 p-8 rounded-4xl bg-linear-to-r from-white/5 to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" /> Instant Search
            </h3>
            <p className="text-gray-400 text-sm">
              Quickly find specific companies or filter jobs by their current
              status.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400">
              Applied
            </span>
            <span className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
              Interviewing
            </span>
            <span className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              Rejected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

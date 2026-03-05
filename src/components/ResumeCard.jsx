"use client";
import React, { useState, useEffect } from "react";
import {
  Download,
  PlusCircle,
  Mail,
  Briefcase,
  Loader2,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function ResumeCard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    title: "",
    portfolio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email }));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-cyan-500/30 animate-pulse rounded-full"></div>
          <Loader2
            size={48}
            className="text-cyan-400 animate-spin relative z-10"
          />
        </div>
        <p className="text-cyan-400/60 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
          Initializing Engine
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError("Job Title is required.");
      return;
    }
    if (!formData.portfolio.trim()) {
      setError("Portfolio Website is required.");
      return;
    }
    if (!formData.skills.trim()) {
      setError("Skills are required.");
      return;
    }
    if (!formData.experience.trim()) {
      setError("Experience Summary is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: session.user.email,
          name: session.user.name,
          userId: session.user.id || session.user.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Resume generated successfully! Redirecting to profile...");
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 md:px-8 px-2 pt-28 pb-14 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE: Editor */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 md:p-8 p-4 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Create Your Masterpiece
          </h2>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-cyan-400 transition-colors">
                Full Name
              </label>
              <input
                name="name"
                value={session?.user?.name || ""}
                readOnly
                className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 outline-none text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Job Title
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  value={session?.user?.email || ""}
                  readOnly
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 outline-none text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-cyan-400 transition-colors">
                Portfolio Website
              </label>
              <div className="relative">
                <Globe
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors"
                />
                <input
                  name="portfolio"
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Skills (Comma separated)
              </label>
              <textarea
                name="skills"
                onChange={handleChange}
                placeholder="React, Node.js, Tailwind..."
                className="w-full h-20 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Experience Summary
              </label>
              <textarea
                name="experience"
                onChange={handleChange}
                placeholder="Describe your work experience..."
                className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin" /> Saving...
                </span>
              ) : (
                <>
                  <Download size={20} /> Save & Generate PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Real-time Preview */}
        <div className="sticky top-8">
          <div className="bg-white text-slate-900 md:p-10 p-6 rounded-xl min-h-176 flex flex-col transform hover:scale-[1.01] transition-transform shadow-[0_20px_50px_rgba(8,112,184,0.7)]">
            <header className="border-b-4 border-cyan-500 pb-6 mb-8">
              <h1 className="text-4xl font-black uppercase tracking-tighter">
                {session?.user?.name}
              </h1>
              <p className="text-cyan-600 font-bold text-lg mt-1 tracking-widest">
                {formData.title || "Professional Title"}
              </p>
              <div className="flex gap-4 mt-4 text-sm text-slate-500 italic">
                <span className="flex items-center gap-1">
                  <Mail size={14} /> {session?.user?.email}
                </span>
              </div>
            </header>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-xl font-bold border-l-4 border-cyan-500 pl-3 mb-4">
                <Briefcase size={20} className="text-cyan-600" /> EXPERIENCE
              </h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {formData.experience ||
                  "Tell the world about your achievements..."}
              </p>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-xl font-bold border-l-4 border-cyan-500 pl-3 mb-4">
                <Globe size={20} className="text-cyan-600" /> PORTFOLIO
              </h3>
              <a
                href={formData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold hover:underline break-all"
              >
                <ExternalLink size={15} />
                {formData.portfolio}
              </a>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-xl font-bold border-l-4 border-cyan-500 pl-3 mb-4">
                <PlusCircle size={20} className="text-cyan-600" /> SKILLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {(formData.skills || "React, Node.js, Tailwind")
                  .split(",")
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold border border-slate-200"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { PlusCircle, Mail, Briefcase } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ResumeOutput() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/resume/me");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load resume");
        setData(json.resume);
        setTimeout(() => setVisible(true), 150);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center text-slate-400 space-y-3">
        <Link href="/resume">
          <PlusCircle
            size={40}
            className="opacity-20 text-cyan-500 hover:text-blue-600"
          />
        </Link>
        <p className="text-sm font-semibold uppercase tracking-widest">
          No Resume Found
        </p>
        <p className="text-xs text-slate-500">
          Fill in the form to generate your resume
        </p>
      </div>
    );
  }

  const formData = data || {};

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <header className="border-b-4 border-slate-100 pb-6 mb-8">
          <div className="h-8 w-64 bg-slate-200 rounded mb-2"></div>{" "}
          <div className="h-4 w-40 bg-slate-100 rounded mt-2"></div>{" "}
          <div className="flex gap-4 mt-5">
            <div className="h-3 w-32 bg-slate-100 rounded"></div>
          </div>
        </header>

        {/* Experience Section Skeleton */}
        <section className="mb-8">
          <div className="h-6 w-32 bg-slate-200 rounded-sm border-l-4 border-slate-200 pl-3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-100 rounded"></div>
            <div className="h-3 w-full bg-slate-100 rounded"></div>
            <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
          </div>
        </section>

        {/* Skills Section Skeleton */}
        <section>
          <div className="h-6 w-24 bg-slate-200 rounded-sm border-l-4 border-slate-200 pl-3 mb-4"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-16 bg-slate-100 rounded-full"></div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <header className="border-b-4 border-cyan-500 pb-6 mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          {formData.name || "Your Name"}
        </h1>
        <p className="text-cyan-600 font-bold text-lg mt-1 tracking-widest">
          {formData.title || "Professional Title"}
        </p>
        <div className="flex gap-4 mt-4 text-sm text-slate-500 italic">
          <span className="flex items-center gap-1">
            <Mail size={14} /> {formData.email || "email@example.com"}
          </span>
        </div>
      </header>

      <section className="mb-8">
        <h3 className="flex items-center gap-2 text-xl font-bold border-l-4 border-cyan-500 pl-3 mb-4">
          <Briefcase size={20} className="text-cyan-600" /> EXPERIENCE
        </h3>
        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
          {formData.experience || "Tell the world about your achievements..."}
        </p>
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
  );
}

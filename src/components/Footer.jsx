"use client";
import Link from "next/link";
import React from "react";
import {
  Briefcase,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  if (role === "super_admin") return null;

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/10 bg-linear-to-b from-[#0f1115] via-[#090a0f] to-[#050505]">
      {/* Dynamic Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-6 group"
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-white">
                Career<span className="text-blue-500">Pilot</span>
              </span>
            </Link>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
              Navigate your professional journey with precision-engineered tools
              for the modern era.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Github size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:ml-auto">
            <h4 className="text-white font-bold mb-7 text-sm uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-4 text-[15px]">
              {[
                "AI Resume Builder",
                "Job Tracker",
                "Growth Analytics",
                "Mock Interviews",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-1 group"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="text-white font-bold mb-7 text-sm uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-4 text-[15px]">
              {[
                "Our Story",
                "Privacy Policy",
                "Terms of Service",
                "Support",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Newsletter Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-4xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#0f1115] p-7 rounded-4xl border border-white/10 backdrop-blur-xl">
              <h4 className="text-white font-bold mb-2">Weekly Career Intel</h4>
              <p className="text-gray-400 text-xs mb-5">
                Join 5,000+ pilots getting ahead.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="pilot@example.com"
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
                  <Mail size={16} />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-xs font-medium tracking-tight">
              © 2026 CAREERPILOT INC.
            </p>
            <div className="h-1 w-1 rounded-full bg-gray-700" />
            <p className="text-gray-500 text-xs">ENGINEERED FOR EXCELLENCE</p>
          </div>

          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

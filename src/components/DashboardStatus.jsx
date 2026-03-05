"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import {
  Briefcase,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Target,
  LogIn,
  ShieldOff,
  ArrowRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import DashboardSkeleton from "./skeleton/DashboardSkeleton";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardStatus() {
  const [applications, setApplications] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    interview: 0,
    rejected: 0,
  });
  const { data: session, status } = useSession();
  const user = session?.user;

  const calculateStats = (apps) => {
    console.log(apps);
    return {
      total: apps.length,
      pending: apps.filter((app) => app.status === "pending").length,
      interview: apps.filter((app) => app.status === "interview").length,
      rejected: apps.filter((app) => app.status === "rejected").length,
    };
  };

  const STATS = [
    {
      id: 1,
      label: "Total Applied",
      value: stats.total,
      icon: Briefcase,
      path: "/user-dashboard/total-applied",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      path: "/user-dashboard/pending",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      id: 3,
      label: "Interviews",
      value: stats.interview,
      icon: Users,
      path: "/user-dashboard/interviews",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      id: 4,
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      path: "/user-dashboard/rejected",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
  ];

  useEffect(() => {
    if (!user) return;
    fetch("/api/user/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setChartData(generateChartData(data));
        setStats(calculateStats(data));
      });
  }, [user]);

  function generateChartData(apps) {
    const result = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = month.toLocaleString("default", { month: "short" });
      const count = apps.filter(
        (app) =>
          new Date(app.createdAt).getMonth() === month.getMonth() &&
          new Date(app.createdAt).getFullYear() === month.getFullYear(),
      ).length;
      result.push({ month: monthStr, apps: count });
    }
    return result;
  }

  // ── Loading state ────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div>
        <DashboardSkeleton />
      </div>
    );
  }

  // ── Unauthenticated state ────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-[#05070a] text-white flex items-center justify-center relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-rose-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-sm px-6">
          {/* Icon */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
            <ShieldOff className="text-indigo-400" size={36} />
          </div>

          {/* Copy */}
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Access Restricted
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              You need to be signed in to view your analytics dashboard and
              application history.
            </p>
          </div>

          {/* CTA */}
          <a
            href="/login"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-3 rounded-2xl font-semibold text-sm"
          >
            <LogIn size={16} />
            Sign In to Continue
          </a>

          <p className="text-gray-600 text-xs">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    );
  }

  // ── Authenticated dashboard ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white p-6 md:p-10 overflow-x-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative pt-24">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Analytics Overview
          </h1>
          <p className="text-gray-400">
            Track your application performance and conversion.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map((stat) => (
            <Link
              href={stat.path}
              key={stat.id}
              className="bg-[#0d1117] border border-white/5 p-6 rounded-4xl hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} p-3 rounded-2xl`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                  <TrendingUp size={12} /> +12%
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </Link>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Area Chart */}
          <div className="lg:col-span-2 bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] h-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Target className="text-indigo-400" size={20} /> Application
                Growth
              </h3>
              <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none cursor-pointer">
                <option className="text-black">Last 6 Months</option>
                <option className="text-black">Last Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="apps"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorApps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
            {/* Subtle Background Glow for the card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold tracking-tight">
                Recent Activity
              </h3>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                Live Feed
              </span>
            </div>

            <div className="relative space-y-1">
              {/* Vertical Line in the background for Timeline feel */}
              {applications.length > 0 && (
                <div className="absolute left-3.75 top-2 bottom-2 w-px bg-linear-to-b from-blue-500/50 via-white/5 to-transparent" />
              )}

              {applications.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500 text-sm italic font-light">
                    No applications tracked yet.
                  </p>
                </div>
              ) : (
                applications.slice(0, 4).map((app, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={app._id}
                    className="flex gap-4 items-start py-4 px-2 rounded-2xl hover:bg-white/2 transition-all group cursor-pointer"
                  >
                    {/* Timeline Dot/Icon */}
                    <div className="relative z-10 mt-1">
                      <div className="w-8 h-8 rounded-xl bg-[#161b22] border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors shadow-lg">
                        <Briefcase
                          size={14}
                          className="text-gray-400 group-hover:text-blue-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-200 truncate group-hover:text-white transition-colors">
                        {app.position}{" "}
                        <span className="text-gray-500 font-normal ml-1">
                          at
                        </span>{" "}
                        {app.companyName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tight">
                          {new Date(app.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <p className="text-[11px] text-blue-500/70 font-semibold uppercase">
                          {app.status || "Applied"}
                        </p>
                      </div>
                    </div>

                    <Link href={`/user-dashboard/${app.status === "interview" ? "interviews" : app.status}`} className="self-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 bg-blue-500/10 text-blue-400 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            <Link
              href="/user-dashboard/total-applied"
              className="w-full mt-8 py-4 bg-white/3 border border-white/5 rounded-2xl font-bold hover:bg-white/8 hover:border-white/10 transition-all text-[13px] text-gray-400 hover:text-white flex items-center justify-center gap-2 group"
            >
              View Full History
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

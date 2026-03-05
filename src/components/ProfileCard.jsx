"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ResumeOutput from "./ResumeOutput";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  CalendarCheck,
  Plus,
  ArrowUpRight,
  User,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, colorClass }) {
  return (
    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col gap-2 transition-all">
      <div
        className={`w-9 h-9 rounded-xl ${colorClass.bg} border ${colorClass.border} flex items-center justify-center`}
      >
        <Icon size={16} className={colorClass.icon} />
      </div>
      <p className={`text-3xl font-black font-mono ${colorClass.text}`}>
        {value}
      </p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
    </div>
  );
}

// ── Recent Applicant Card ────────────────────────────────────────────────────
function RecentApplicantCard({ app }) {
  const statusMap = {
    interview: {
      label: "Interview",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    rejected: {
      label: "Rejected",
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/20",
    },
  };
  const s = statusMap[app.status] || {
    label: "Pending",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
  };

  return (
    <div className="flex items-center justify-between gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/20 transition-all">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <User size={15} className="text-indigo-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white leading-tight truncate">
            {app.userName}
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1 truncate">
            <Briefcase size={10} /> {app.jobPosition}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${s.bg} ${s.text} border ${s.border}`}
        >
          {s.label}
        </span>
        <p className="text-[10px] text-gray-500 flex items-center gap-1">
          <Clock size={9} />
          {new Date(app.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>
    </div>
  );
}

// ── Company Dashboard Skeleton ───────────────────────────────────────────────
function CompanyDashboardSkeleton() {
  return (
    <div className="px-6 mt-8">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Stats Row Skeleton */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 animate-pulse shrink-0" />
              <div className="h-8 w-10 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-2.5 w-14 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Recent Applicants Skeleton */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-white/10 animate-pulse" />
              <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse shrink-0" />
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="h-3.5 w-24 bg-white/10 rounded animate-pulse" />
                    <div className="h-2.5 w-32 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="h-5 w-16 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-2.5 w-14 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post Job CTA Skeleton */}
        <div className="flex items-center justify-between w-full p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 animate-pulse shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-28 bg-white/10 rounded animate-pulse" />
              <div className="h-2.5 w-40 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-5 h-5 rounded bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ProfileCard() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const loading = status === "loading";

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    interviews: 0,
  });
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (loading || role !== "company") return;

    const fetchCompanyData = async () => {
      setDataLoading(true);
      try {
        const jobsRes = await fetch("/api/jobs?company=true");
        const jobs = await jobsRes.json();

        const appResults = await Promise.allSettled(
          jobs.map((job) => {
            const jobId = job._id?.$oid || job._id;
            return fetch(`/api/applications/${encodeURIComponent(jobId)}`).then(
              (r) => r.json(),
            );
          }),
        );

        const allApps = appResults
          .filter((r) => r.status === "fulfilled" && Array.isArray(r.value))
          .flatMap((r, i) =>
            r.value.map((app) => ({
              ...app,
              jobPosition: jobs[i]?.position || "Unknown",
            })),
          );

        setStats({
          totalJobs: jobs.length,
          totalApplicants: allApps.length,
          interviews: allApps.filter((a) => a.status === "interview").length,
        });

        const sorted = [...allApps].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setRecentApplicants(sorted.slice(0, 3));
      } catch (err) {
        console.error("Company data fetch error:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchCompanyData();
  }, [loading, role]);

  const statCards = [
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: stats.totalJobs,
      colorClass: {
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        icon: "text-indigo-400",
        text: "text-indigo-300",
      },
    },
    {
      icon: Users,
      label: "Applicants",
      value: stats.totalApplicants,
      colorClass: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        icon: "text-cyan-400",
        text: "text-cyan-300",
      },
    },
    {
      icon: CalendarCheck,
      label: "Interviews",
      value: stats.interviews,
      colorClass: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: "text-emerald-400",
        text: "text-emerald-300",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pt-28 pb-12">
      {/* ── Profile Card ──────────────────────────────────────────────── */}
      {loading ? (
        <div className="px-6">
          <div className="max-w-lg mx-auto bg-slate-800/50 border border-slate-700 rounded-3xl p-4 md:p-8 flex items-center gap-6 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-cyan-500/20 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-7 w-3/4 bg-slate-700 rounded-lg" />
              <div className="h-4 w-1/2 bg-slate-700/60 rounded-lg" />
              <div className="h-5 w-32 bg-slate-700/40 rounded-full mt-1" />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6">
          <div className="max-w-lg mx-auto bg-slate-800/50 border border-slate-700 rounded-3xl p-4 md:p-8 flex items-center gap-6">
            {session?.user?.image && (
              <div className="rounded-full border-2 border-cyan-500 shrink-0 overflow-hidden w-20 h-20">
                <Image
                  src={session.user.image}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {session?.user?.name || "Anonymous"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {session?.user?.email}
              </p>
              {role === "company" && (
                <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                  <Zap size={10} className="fill-indigo-400" /> Company Account
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Company Dashboard ─────────────────────────────────────────── */}
      {!loading && role === "company" && (
        <>
          {dataLoading ? (
            <CompanyDashboardSkeleton />
          ) : (
            <div className="px-6 mt-8">
              <div className="max-w-lg mx-auto space-y-4">
                {/* Stats Row */}
                <div className="flex gap-3">
                  {statCards.map((s) => (
                    <StatCard key={s.label} {...s} />
                  ))}
                </div>

                {/* Recent Applicants */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={15} className="text-indigo-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                        Recent Applicants
                      </h3>
                    </div>
                    <Link
                      href="/my-jobs"
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                    >
                      View All <ArrowUpRight size={11} />
                    </Link>
                  </div>

                  {recentApplicants.length === 0 ? (
                    <div className="py-8 text-center">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                        <Users size={18} className="text-gray-600" />
                      </div>
                      <p className="text-gray-500 text-sm">No applicants yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {recentApplicants.map((app, i) => (
                        <RecentApplicantCard key={app._id || i} app={app} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Post a Job CTA */}
                <Link
                  href="/post-job"
                  className="flex items-center justify-between w-full p-5 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Plus size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Post a New Job
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Reach thousands of candidates
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Candidate Resume ──────────────────────────────────────────── */}
      {!loading && role !== "company" && (
        <div className="px-6">
          <div className="max-w-2xl mx-auto bg-white mt-16 text-slate-900 md:p-10 p-6 rounded-xl">
            <ResumeOutput />
          </div>
        </div>
      )}
    </div>
  );
}

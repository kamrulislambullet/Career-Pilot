"use client";
import { useEffect, useState } from "react";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const TYPE_CLS = {
  "full-time": "bg-emerald-950 text-emerald-400 border-emerald-400/40",
  "part-time": "bg-blue-950   text-blue-400   border-blue-400/40",
  remote: "bg-violet-950 text-violet-400 border-violet-400/40",
  contract: "bg-amber-950  text-amber-400  border-amber-400/40",
  internship: "bg-pink-950   text-pink-400   border-pink-400/40",
};

function TypeBadge({ type }) {
  const cls =
    TYPE_CLS[type?.toLowerCase()] ??
    "bg-zinc-800 text-zinc-400 border-zinc-700";
  return (
    <span
      className={`px-2 py-0.5 rounded-sm text-xs font-mono font-semibold tracking-wider uppercase border ${cls}`}
    >
      {type ?? "?"}
    </span>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-sm px-5 py-4 flex flex-col gap-1">
      <span className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
      <span className="text-zinc-100 font-mono text-2xl font-bold">
        {value}
      </span>
      {sub && <span className="text-zinc-600 text-xs">{sub}</span>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-zinc-800/60 rounded-sm animate-pulse" />
      ))}
    </div>
  );
}

function DeleteModal({ job, onClose, onConfirm, deleting }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-8 w-full max-w-sm mx-4 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="m-0 text-zinc-100 font-mono text-base font-bold">
            Delete Job
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-300 text-xl bg-transparent border-none cursor-pointer"
          >
            x
          </button>
        </div>
        <p className="text-zinc-500 font-mono text-sm mb-2">
          Are you sure you want to delete:
        </p>
        <p className="text-amber-400 font-mono text-sm font-semibold mb-6">
          {job.position} @ {job.companyName}
        </p>
        <div className="flex gap-2.5 justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-sm border
              bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-sm border
              bg-red-500 text-white border-red-500 hover:opacity-90
              disabled:opacity-40 disabled:cursor-default cursor-pointer transition-opacity"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => setJobs(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const id = deleteModal._id?.$oid ?? deleteModal._id;
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((j) => (j._id?.$oid ?? j._id) !== id));
      setDeleteModal(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  };

  const jobTypes = ["all", ...new Set(jobs.map((j) => j.type).filter(Boolean))];

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      j.position?.toLowerCase().includes(q) ||
      j.companyName?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q) ||
      j.tags?.some((t) => t.toLowerCase().includes(q));
    const matchType = typeFilter === "all" || j.type === typeFilter;
    return matchSearch && matchType;
  });

  // stats
  const totalJobs = jobs.length;
  const topType = jobs.filter((j) => j.type?.toLowerCase() === "remote").length;
  const latestJob = jobs.reduce(
    (a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? a : b),
    jobs[0],
  );

  const latestPost = jobs.length
    ? (() => {
        const diff = Math.floor(
          (Date.now() - new Date(latestJob.createdAt)) / (1000 * 60 * 60 * 24),
        );
        return diff === 0 ? "Today" : `${diff}d ago`;
      })()
    : "—";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <h2 className="m-0 text-zinc-100 font-mono text-xl font-bold">
            {loading ? "Loading..." : `${filtered.length}`} Jobs Found
          </h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2 rounded-sm
              text-sm font-mono outline-none focus:border-amber-400/60 transition-colors cursor-pointer"
          >
            {jobTypes.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All Types" : t}
              </option>
            ))}
          </select>
          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 pl-3 pr-3 py-2 rounded-sm
              text-sm outline-none w-56 font-mono placeholder-zinc-700 focus:border-amber-400/60 transition-colors"
          />
        </div>
      </div>

      {/* Stat cards */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total Jobs" value={totalJobs} />
          <StatCard
            label="Remote Roles"
            value={topType}
            sub={`${Math.round((jobs.filter((j) => j.type?.toLowerCase() === "remote").length / (totalJobs || 1)) * 100)}% of all jobs`}
          />
          <StatCard
            label="Latest Post"
            value={latestPost}
            sub={jobs[0]?.companyName ?? ""}
          />
          <StatCard
            label="This Month"
            value={
              jobs.filter((j) => {
                const d = new Date(j.createdAt);
                const now = new Date();
                return (
                  d.getMonth() === now.getMonth() &&
                  d.getFullYear() === now.getFullYear()
                );
              }).length
            }
            sub="new postings"
          />
        </div>
      )}

      {error && (
        <div className="bg-red-950/50 border border-red-500/40 text-red-400 font-mono text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {[
                    "Position",
                    "Company",
                    "Location",
                    "Salary",
                    "Type",
                    "Posted",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-zinc-600 font-mono font-semibold
                        tracking-widest uppercase border-b border-zinc-800 whitespace-nowrap text-xs"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-zinc-700 font-mono text-sm"
                    >
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  filtered.map((j) => (
                    <tr
                      key={j._id?.$oid ?? j._id}
                      className="border-b border-zinc-900 hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* Position */}
                      <td className="px-4 py-3">
                        <p className="text-zinc-200 font-mono text-sm m-0 whitespace-nowrap">
                          {j.position ?? "?"}
                        </p>
                      </td>

                      {/* Company */}
                      <td className="px-4 py-3">
                        <span className="text-zinc-400 font-mono text-xs">
                          {j.companyName ?? "?"}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3">
                        <span className="text-zinc-500 text-xs font-mono">
                          {j.location ?? "?"}
                        </span>
                      </td>

                      {/* Salary */}
                      <td className="px-4 py-3">
                        <span className="text-amber-400/80 text-xs font-mono">
                          {j.salary ?? "?"}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3">
                        <TypeBadge type={j.type} />
                      </td>

                      {/* Posted */}
                      <td className="px-4 py-3">
                        <span className="text-zinc-600 text-xs">
                          {j.createdAt ? fmtDate(j.createdAt) : "?"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setDeleteModal(j)}
                          className="px-3 py-1.5 text-xs font-mono font-semibold rounded-sm border
                            bg-transparent text-zinc-500 border-zinc-800
                            hover:text-red-400 hover:border-red-400/50 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteModal && (
        <DeleteModal
          job={deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
}

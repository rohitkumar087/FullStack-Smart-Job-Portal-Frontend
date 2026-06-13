import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllJobsAdmin } from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";
import {
  BriefcaseBusiness,
  Search,
  MapPin,
  IndianRupee,
  Building2,
  UserRound,
  Sparkles,
  RefreshCcw,
  Filter,
  Clock3,
  BadgeCheck,
  Briefcase,
  Layers,
  AlertCircle,
} from "lucide-react";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllJobsAdmin();
      setJobs(data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load admin jobs."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        job.title?.toLowerCase().includes(keyword) ||
        job.company?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword) ||
        job.recruiter?.name?.toLowerCase().includes(keyword) ||
        job.recruiter?.email?.toLowerCase().includes(keyword);

      const matchesJobType =
        selectedJobType === "ALL" || job.jobType === selectedJobType;

      return matchesSearch && matchesJobType;
    });
  }, [jobs, search, selectedJobType]);

  const totalFullTime = jobs.filter((job) => job.jobType === "Full Time").length;
  const totalInternship = jobs.filter(
    (job) => job.jobType === "Internship"
  ).length;

  const jobTypes = ["ALL", ...new Set(jobs.map((job) => job.jobType).filter(Boolean))];

  const statCards = [
    {
      title: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseBusiness,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      title: "Full Time",
      value: totalFullTime,
      icon: Briefcase,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Internships",
      value: totalInternship,
      icon: Clock3,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Companies",
      value: new Set(jobs.map((job) => job.company).filter(Boolean)).size,
      icon: Building2,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8 overflow-hidden mb-8">
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-violet-50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-5">
                <Sparkles size={16} className="text-violet-600" />
                <span className="text-sm font-bold text-violet-600">
                  Admin Job Monitoring
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Monitor All Posted Jobs
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                View all jobs posted by recruiters, track company hiring
                activity, and monitor job data across the platform.
              </p>
            </div>

            <button
              onClick={fetchJobs}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
        </section>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-extrabold">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon size={26} className={item.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Filters */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-5 sm:p-6 mb-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by title, company, recruiter, email or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-semibold"
              />
            </div>

            <div className="relative">
              <Filter
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-bold appearance-none"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "ALL" ? "All Job Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold">All Jobs</h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
            </div>

            {loading && (
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                Loading...
              </span>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                <BriefcaseBusiness size={36} className="text-slate-400" />
              </div>

              <h3 className="text-xl font-bold">No jobs found</h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing search keyword or selected job type.
              </p>
            </div>
          ) : (
            <div className="grid xl:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-[1.7rem] border border-gray-100 bg-slate-50/70 p-5 hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center shrink-0">
                        <BriefcaseBusiness
                          size={25}
                          className="text-violet-600"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-extrabold text-lg text-slate-950">
                            {job.title}
                          </h3>

                          <span className="px-3 py-1 rounded-full border text-xs font-bold bg-green-50 text-green-700 border-green-100">
                            {job.status || "ACTIVE"}
                          </span>
                        </div>

                        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                          <Building2 size={14} />
                          {job.company || "Company not available"}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <MapPin size={14} />
                          {job.location || "Location not available"}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <IndianRupee size={14} />₹{job.minSalary} - ₹
                          {job.maxSalary}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <UserRound size={14} />
                          Posted by: {job.recruiter?.name || "Recruiter"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {job.jobType && (
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold">
                        {job.jobType}
                      </span>
                    )}

                    {job.experience && (
                      <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 text-xs font-bold">
                        {job.experience}
                      </span>
                    )}

                    {job.openings && (
                      <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100 text-xs font-bold">
                        {job.openings} Openings
                      </span>
                    )}
                  </div>

                  {job.description && (
                    <div className="mt-5 rounded-2xl bg-white/80 border border-gray-100 p-4">
                      <p className="text-xs font-bold text-slate-500 mb-1">
                        Job Description
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Layers size={16} />
                      Job ID: #{job.id}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                      <BadgeCheck size={16} />
                      Monitored
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminJobs;
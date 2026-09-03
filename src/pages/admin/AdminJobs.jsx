import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllJobs } from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";

import {
  BriefcaseBusiness,
  Search,
  MapPin,
  Building2,
  CalendarDays,
  IndianRupee,
  Sparkles,
  LayoutDashboard,
  Briefcase,
  Activity,
  Filter,
  RefreshCcw,
  AlertCircle,
  FileSearch,
  TrendingUp,
  ArrowRight,
  Layers3,
  BadgeCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH JOBS ================= */

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllJobs();

      console.log("Jobs API Response:", response);

      // Safely extract array from different possible API response structures
      let jobsData = [];

      if (Array.isArray(response)) {
        jobsData = response;
      } else if (Array.isArray(response?.data)) {
        jobsData = response.data;
      } else if (Array.isArray(response?.content)) {
        jobsData = response.content;
      } else if (Array.isArray(response?.jobs)) {
        jobsData = response.jobs;
      } else if (Array.isArray(response?.data?.content)) {
        jobsData = response.data.content;
      }

      setJobs(jobsData);
    } catch (err) {
      console.error("Error fetching jobs:", err);

      setJobs([]);

      setError(
        getErrorMessage(err, "Failed to load jobs.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ================= FILTERED JOBS ================= */

  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) {
      return [];
    }

    return jobs.filter((job) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        job?.title?.toLowerCase().includes(keyword) ||
        job?.location?.toLowerCase().includes(keyword) ||
        job?.jobType?.toLowerCase().includes(keyword) ||
        job?.company?.companyName
          ?.toLowerCase()
          .includes(keyword);

      const matchesType =
        jobType === "ALL" ||
        job?.jobType === jobType;

      return matchesSearch && matchesType;
    });
  }, [jobs, search, jobType]);

  /* ================= JOB TYPES ================= */

  const jobTypes = useMemo(() => {
    if (!Array.isArray(jobs)) {
      return ["ALL"];
    }

    const types = jobs
      .map((job) => job?.jobType)
      .filter(Boolean);

    return ["ALL", ...new Set(types)];
  }, [jobs]);

  /* ================= CLEAR FILTER ================= */

  const clearFilters = () => {
    setSearch("");
    setJobType("ALL");
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-52 left-[8%] w-[520px] h-[520px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute top-[20%] -right-60 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[190px]" />

        <div className="absolute bottom-[-280px] left-[30%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[190px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* ================= HERO SECTION ================= */}

        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_25px_80px_rgba(37,99,235,0.10)]
            mb-7 sm:mb-9
          "
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -bottom-36 -left-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="hidden lg:block absolute top-10 right-[28%] w-16 h-16 rounded-[1.5rem] border border-blue-200 rotate-[25deg]" />

            <div className="hidden lg:block absolute bottom-12 right-[10%] w-12 h-12 rounded-xl bg-indigo-500/10 rotate-[30deg]" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT */}

              <div className="max-w-2xl">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-blue-50
                    border border-blue-100
                  "
                >
                  <Sparkles
                    size={16}
                    className="text-blue-600"
                  />

                  <span className="text-xs sm:text-sm font-black text-blue-700">
                    Job Portal Administration
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Monitor every job

                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                    posted on the platform.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                  Explore job listings across the SmartJob platform,
                  monitor recruiter activity, and review opportunities
                  available to candidates.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div
                    className="
                      inline-flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      bg-blue-50/80
                      border border-blue-100
                    "
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <BriefcaseBusiness
                        size={19}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-blue-500 uppercase">
                        Total Jobs
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {jobs.length} Active Listings
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      inline-flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      bg-indigo-50/80
                      border border-indigo-100
                    "
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <Activity
                        size={19}
                        className="text-indigo-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-indigo-500 uppercase">
                        Platform
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        Job Monitoring
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT 3D ICON */}

              <div className="flex flex-col lg:items-center gap-5">

                <div className="hidden lg:flex relative w-36 h-36 items-center justify-center">
                  <div className="absolute inset-0 rounded-[2.7rem] bg-blue-500/15 rotate-6 translate-y-3" />

                  <div
                    className="
                      absolute inset-2
                      rounded-[2.5rem]
                      bg-gradient-to-br
                      from-blue-500
                      via-indigo-600
                      to-cyan-500
                      shadow-2xl shadow-blue-500/25
                      rotate-[-6deg]
                      transition-transform duration-500
                      hover:rotate-0
                      hover:scale-105
                    "
                  />

                  <div
                    className="
                      relative
                      w-24 h-24
                      rounded-[2rem]
                      bg-white
                      shadow-xl
                      flex items-center justify-center
                    "
                  >
                    <BriefcaseBusiness
                      size={46}
                      className="text-blue-600"
                    />
                  </div>
                </div>

                <button
                  onClick={fetchJobs}
                  disabled={loading}
                  className="
                    group
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    rounded-2xl
                    bg-slate-950
                    text-white
                    text-sm
                    font-black
                    shadow-xl shadow-slate-950/10
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-blue-600
                    disabled:opacity-60
                  "
                >
                  <RefreshCcw
                    size={18}
                    className={
                      loading
                        ? "animate-spin"
                        : "transition-transform duration-300 group-hover:rotate-180"
                    }
                  />

                  {loading
                    ? "Refreshing..."
                    : "Refresh Jobs"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ERROR ================= */}

        {error && (
          <div
            className="
              mb-7
              flex items-start gap-3
              rounded-[1.6rem]
              border border-red-100
              bg-red-50
              px-5 py-4
              text-sm
              font-semibold
              text-red-700
            "
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertCircle size={19} />
            </div>

            <div>
              <p className="font-black">
                Unable to load jobs
              </p>

              <p className="mt-1 opacity-80">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ================= STAT CARDS ================= */}

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-7 sm:mb-9">

          {/* TOTAL JOBS */}

          <div
            className="
              group relative overflow-hidden
              rounded-[1.8rem]
              bg-white
              border border-white
              shadow-lg shadow-blue-500/5
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-xl hover:shadow-blue-500/10
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Total Jobs
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  {jobs.length}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Available listings
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition">
                <BriefcaseBusiness
                  size={28}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* JOB TYPES */}

          <div
            className="
              group
              rounded-[1.8rem]
              bg-white
              border border-white
              shadow-lg shadow-indigo-500/5
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Job Types
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  {jobTypes.length - 1}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Different categories
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition">
                <Layers3
                  size={28}
                  className="text-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* FILTERED JOBS */}

          <div
            className="
              group
              rounded-[1.8rem]
              bg-white
              border border-white
              shadow-lg shadow-cyan-500/5
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Visible Jobs
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  {filteredJobs.length}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Matching filters
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition">
                <FileSearch
                  size={28}
                  className="text-cyan-600"
                />
              </div>
            </div>
          </div>

          {/* STATUS */}

          <div
            className="
              group
              rounded-[1.8rem]
              bg-white
              border border-white
              shadow-lg shadow-emerald-500/5
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Admin Status
                </p>

                <h3 className="mt-2 text-xl font-black">
                  Monitoring
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Platform overview
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition">
                <BadgeCheck
                  size={28}
                  className="text-emerald-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEARCH FILTER ================= */}

        <section
          className="
            rounded-[2rem]
            bg-white/90
            backdrop-blur-xl
            border border-white
            shadow-xl shadow-blue-500/5
            p-5 sm:p-7
            mb-7 sm:mb-9
          "
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 text-blue-600">
              <SlidersHorizontal size={17} />

              <span className="text-xs font-black uppercase tracking-[0.15em]">
                Job Filters
              </span>
            </div>

            <h2 className="mt-2 text-xl sm:text-2xl font-black">
              Search & Filter Jobs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find jobs by title, company, location or job type.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_260px] gap-4">

            {/* SEARCH */}

            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />

              <input
                type="text"
                placeholder="Search job title, company or location..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  pl-12 pr-4 py-4
                  rounded-2xl
                  bg-slate-50
                  border border-slate-100
                  outline-none
                  text-sm
                  font-semibold
                  text-slate-700
                  placeholder:text-slate-400
                  transition-all duration-300
                  focus:bg-white
                  focus:border-blue-300
                  focus:ring-4
                  focus:ring-blue-50
                "
              />
            </div>

            {/* JOB TYPE */}

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />

              <select
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value)
                }
                className="
                  w-full
                  appearance-none
                  pl-12 pr-4 py-4
                  rounded-2xl
                  bg-slate-50
                  border border-slate-100
                  outline-none
                  text-sm
                  font-bold
                  text-slate-700
                  cursor-pointer
                  transition-all
                  focus:bg-white
                  focus:border-blue-300
                  focus:ring-4
                  focus:ring-blue-50
                "
              >
                {jobTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type === "ALL"
                      ? "All Job Types"
                      : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(search || jobType !== "ALL") && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-slate-100
                  text-slate-600
                  text-sm font-bold
                  hover:bg-red-50
                  hover:text-red-600
                  transition
                "
              >
                <X size={16} />

                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* ================= JOB LIST ================= */}

        <section
          className="
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/90
            backdrop-blur-xl
            border border-white
            shadow-xl shadow-blue-500/5
            p-5 sm:p-7 lg:p-8
          "
        >
          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <div className="flex items-center gap-2 text-blue-600">
                <LayoutDashboard size={17} />

                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  Job Directory
                </span>
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                All Platform Jobs
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Showing{" "}
                <span className="font-black text-slate-700">
                  {filteredJobs.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-slate-700">
                  {jobs.length}
                </span>{" "}
                available jobs
              </p>
            </div>

            {loading && (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-black">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />

                Loading Jobs...
              </div>
            )}
          </div>

          {/* EMPTY STATE */}

          {!loading && filteredJobs.length === 0 ? (
            <div className="py-16 sm:py-20 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-[2rem] bg-blue-500/10 rotate-6" />

                <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
                  <BriefcaseBusiness
                    size={40}
                    className="text-blue-600"
                  />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black">
                No jobs found
              </h3>

              <p className="mt-2 max-w-md mx-auto text-sm text-slate-500">
                There are no jobs matching your current search
                or filter selection.
              </p>

              {(search || jobType !== "ALL") && (
                <button
                  onClick={clearFilters}
                  className="
                    mt-6
                    inline-flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                    text-sm
                    font-bold
                    shadow-lg shadow-blue-500/20
                    hover:-translate-y-0.5
                    hover:bg-blue-700
                    transition
                  "
                >
                  Clear Filters

                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ) : (
            /* ================= JOB CARDS ================= */

            <div className="grid xl:grid-cols-2 gap-5 sm:gap-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job?.id || index}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[1.8rem]
                    bg-blue-50/35
                    border border-blue-100/70
                    p-5 sm:p-6
                    transition-all duration-300
                    hover:-translate-y-1.5
                    hover:bg-white
                    hover:border-white
                    hover:shadow-[0_22px_55px_rgba(37,99,235,0.13)]
                  "
                >
                  <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-blue-500/10 blur-3xl group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">

                    {/* JOB HEADER */}

                    <div className="flex gap-4">
                      <div
                        className="
                          shrink-0
                          w-14 h-14 sm:w-16 sm:h-16
                          rounded-2xl
                          bg-gradient-to-br
                          from-blue-500
                          via-indigo-600
                          to-cyan-500
                          shadow-lg shadow-blue-500/20
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:scale-110
                          group-hover:-rotate-3
                        "
                      >
                        <Briefcase
                          size={27}
                          className="text-white"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-black text-slate-950 break-words">
                              {job?.title || "Job Title"}
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                              <Building2
                                size={15}
                                className="text-slate-400"
                              />

                              <span className="font-semibold">
                                {job?.company?.companyName ||
                                  job?.companyName ||
                                  "Company"}
                              </span>
                            </div>
                          </div>

                          {job?.jobType && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-black whitespace-nowrap">
                              {job.jobType}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                          <MapPin
                            size={15}
                            className="text-slate-400"
                          />

                          <p className="text-sm text-slate-500">
                            {job?.location ||
                              "Location not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DESCRIPTION */}

                    {job?.description && (
                      <div className="mt-5 rounded-2xl bg-white/75 border border-blue-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileSearch
                            size={15}
                            className="text-blue-600"
                          />

                          <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                            Job Description
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    )}

                    {/* JOB DETAILS */}

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">

                      {/* SALARY */}

                      <div className="rounded-2xl bg-white/80 border border-slate-100 p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <IndianRupee
                              size={15}
                              className="text-emerald-600"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase text-slate-400">
                              Salary
                            </p>

                            <p className="mt-0.5 text-xs font-bold text-slate-700 truncate">
                              {job?.salary ||
                                "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* EXPERIENCE */}

                      <div className="rounded-2xl bg-white/80 border border-slate-100 p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <TrendingUp
                              size={15}
                              className="text-blue-600"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase text-slate-400">
                              Experience
                            </p>

                            <p className="mt-0.5 text-xs font-bold text-slate-700 truncate">
                              {job?.experience ||
                                "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* POSTED DATE */}

                      <div className="rounded-2xl bg-white/80 border border-slate-100 p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                            <CalendarDays
                              size={15}
                              className="text-violet-600"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase text-slate-400">
                              Posted
                            </p>

                            <p className="mt-0.5 text-xs font-bold text-slate-700 truncate">
                              {job?.createdAt
                                ? new Date(
                                    job.createdAt
                                  ).toLocaleDateString()
                                : "Recently"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}

                    <div className="mt-5 pt-5 border-t border-blue-100/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Activity
                          size={15}
                          className="text-blue-500"
                        />

                        <span className="font-semibold">
                          Platform Job Listing
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-xs font-black text-blue-600 group-hover:translate-x-1 transition-transform">
                        Job Details

                        <ArrowRight size={15} />
                      </div>
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
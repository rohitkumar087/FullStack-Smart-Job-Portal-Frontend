import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  IndianRupee,
  CalendarDays,
  Users,
  Eye,
  Edit3,
  Trash2,
  Sparkles,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  X,
  ArrowRight,
  RefreshCw,
  LayoutGrid,
  CheckCircle2,
  CircleDot,
  Ban,
  Clock,
  Layers3,
  FileText,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../services/jobService";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, jobs]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyJobs();

      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (err) {
      setError("Failed to load your posted jobs.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...jobs];

    if (searchText.trim()) {
      result = result.filter((job) => {
        const title = job.title || "";
        const company = job.company || "";
        const location = job.location || "";

        return (
          title.toLowerCase().includes(searchText.toLowerCase()) ||
          company.toLowerCase().includes(searchText.toLowerCase()) ||
          location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    if (statusFilter !== "ALL") {
      result = result.filter((job) => job.status === statusFilter);
    }

    setFilteredJobs(result);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently";
    }

    return new Date(dateValue).toLocaleDateString();
  };

  const formatSalary = (job) => {
    if (job?.minSalary && job?.maxSalary) {
      return `₹${job.minSalary} - ₹${job.maxSalary}`;
    }

    if (job?.minSalary) {
      return `₹${job.minSalary}+`;
    }

    if (job?.maxSalary) {
      return `Up to ₹${job.maxSalary}`;
    }

    return "Not disclosed";
  };

  const handleDeleteJob = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteError("");
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedJobId(null);
    setDeleteError("");
  };

  const confirmDeleteJob = async () => {
    if (!selectedJobId) return;

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await deleteJob(selectedJobId);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== selectedJobId)
      );

      setFilteredJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== selectedJobId)
      );

      closeDeleteModal();
    } catch (err) {
      setDeleteError(err.response?.data || "Failed to delete job.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const activeJobs = jobs.filter((job) => job.status === "ACTIVE").length;
  const closedJobs = jobs.filter((job) => job.status === "CLOSED").length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-100",
          dot: "bg-emerald-500",
        };

      case "CLOSED":
        return {
          bg: "bg-orange-50",
          text: "text-orange-700",
          border: "border-orange-100",
          dot: "bg-orange-500",
        };

      case "PENDING":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-100",
          dot: "bg-amber-500",
        };

      case "BLOCKED":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-100",
          dot: "bg-red-500",
        };

      default:
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-100",
          dot: "bg-blue-500",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-52 left-[5%] w-[520px] h-[520px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute top-[25%] -right-56 w-[520px] h-[520px] rounded-full bg-indigo-500/10 blur-[160px]" />

        <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-[160px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* HERO */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_25px_70px_rgba(37,99,235,0.08)]
            p-6 sm:p-8 lg:p-10
            mb-7 sm:mb-9
          "
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="absolute -bottom-28 left-[35%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="hidden lg:block absolute right-[16%] top-8 w-20 h-20 border border-blue-300/20 rounded-[2rem] rotate-[22deg]" />

            <div className="hidden lg:block absolute right-[30%] bottom-7 w-12 h-12 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl rotate-[28deg]" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

            <div className="max-w-2xl">
              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-blue-50 border border-blue-100
                  shadow-sm
                "
              >
                <Sparkles size={16} className="text-blue-600" />

                <span className="text-xs sm:text-sm font-black text-blue-600">
                  Recruiter Workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Manage your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  hiring opportunities.
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                View, manage, edit, and monitor all the jobs you have posted
                from one powerful recruiter workspace.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2.5 rounded-2xl
                    bg-slate-50 border border-slate-100
                  "
                >
                  <LayoutGrid size={17} className="text-blue-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    {jobs.length} Total Job Posts
                  </span>
                </div>

                <div
                  className="
                    hidden sm:inline-flex items-center gap-2
                    px-4 py-2.5 rounded-2xl
                    bg-slate-50 border border-slate-100
                  "
                >
                  <CheckCircle2 size={17} className="text-emerald-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    {activeJobs} Active Opportunities
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Desktop Icon */}
            <div className="hidden sm:flex relative shrink-0 w-36 h-36 lg:w-44 lg:h-44 items-center justify-center">

              <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

              <div
                className="
                  absolute inset-2
                  rounded-[2.5rem]
                  bg-gradient-to-br from-blue-500 to-indigo-700
                  shadow-2xl shadow-blue-500/25
                  rotate-[-7deg]
                  transition-transform duration-500
                  hover:rotate-0
                "
              />

              <div
                className="
                  relative w-24 h-24 lg:w-28 lg:h-28
                  rounded-[2rem]
                  bg-white
                  border border-white
                  shadow-xl
                  flex items-center justify-center
                "
              >
                <BriefcaseBusiness
                  size={48}
                  className="text-blue-600"
                />
              </div>
            </div>

            <Link
              to="/postJob"
              className="
                lg:absolute lg:right-10 lg:bottom-10
                inline-flex items-center justify-center gap-2
                px-6 py-3.5 rounded-2xl
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white text-sm font-black
                shadow-xl shadow-blue-500/20
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-2xl hover:shadow-blue-500/30
              "
            >
              <Plus size={18} />
              Post New Job
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7 sm:mb-8">

          <StatCard
            title="Total Jobs"
            value={jobs.length}
            icon={BriefcaseBusiness}
            bg="bg-blue-50"
            color="text-blue-600"
            glow="bg-blue-500/10"
          />

          <StatCard
            title="Active Jobs"
            value={activeJobs}
            icon={CheckCircle2}
            bg="bg-emerald-50"
            color="text-emerald-600"
            glow="bg-emerald-500/10"
          />

          <StatCard
            title="Closed Jobs"
            value={closedJobs}
            icon={Clock3}
            bg="bg-orange-50"
            color="text-orange-600"
            glow="bg-orange-500/10"
          />

          <StatCard
            title="Total Openings"
            value={jobs.reduce(
              (total, job) => total + (job.openings || 0),
              0
            )}
            icon={Users}
            bg="bg-violet-50"
            color="text-violet-600"
            glow="bg-violet-500/10"
          />
        </section>

        {/* SEARCH & FILTER */}
        <section
          className="
            relative overflow-hidden
            bg-white/85 backdrop-blur-xl
            border border-white
            rounded-[2rem]
            shadow-[0_18px_55px_rgba(15,23,42,0.06)]
            p-4 sm:p-5
            mb-7 sm:mb-8
          "
        >
          <div className="absolute -top-24 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-[1fr_230px_auto] gap-4">

            {/* Search */}
            <div
              className="
                group flex items-center gap-3
                bg-slate-50/80
                rounded-2xl px-4 py-3.5
                border border-slate-100
                transition-all duration-300
                focus-within:bg-white
                focus-within:border-blue-300
                focus-within:ring-4
                focus-within:ring-blue-500/5
              "
            >
              <Search
                size={20}
                className="
                  text-slate-400
                  transition-colors
                  group-focus-within:text-blue-600
                "
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title, company, or location..."
                className="
                  w-full bg-transparent outline-none
                  text-sm text-slate-700
                  placeholder:text-slate-400
                "
              />
            </div>

            {/* Filter */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Filter
                  size={18}
                  className="
                    text-slate-400
                    group-focus-within:text-blue-600
                    transition-colors
                  "
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  w-full appearance-none
                  bg-slate-50/80
                  rounded-2xl
                  pl-11 pr-10 py-3.5
                  border border-slate-100
                  outline-none
                  text-sm font-bold text-slate-700
                  transition-all duration-300
                  focus:bg-white
                  focus:border-blue-300
                  focus:ring-4
                  focus:ring-blue-500/5
                "
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="CLOSED">Closed</option>
                <option value="PENDING">Pending</option>
                <option value="BLOCKED">Blocked</option>
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ArrowRight
                  size={15}
                  className="rotate-90 text-slate-400"
                />
              </div>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={fetchMyJobs}
              className="
                group inline-flex items-center justify-center gap-2
                px-6 py-3.5
                rounded-2xl
                bg-slate-950 text-white
                text-sm font-black
                shadow-lg shadow-slate-950/10
                transition-all duration-300
                hover:bg-blue-600
                hover:-translate-y-0.5
              "
            >
              <RefreshCw
                size={17}
                className="transition-transform duration-500 group-hover:rotate-180"
              />

              Refresh
            </button>
          </div>
        </section>

        {/* JOB RESULTS TITLE */}
        {!loading && !error && filteredJobs.length > 0 && (
          <div className="flex items-center justify-between mb-5 px-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Your Job Posts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredJobs.length} of {jobs.length} job posts
              </p>
            </div>

            <div
              className="
                hidden sm:flex items-center gap-2
                px-4 py-2 rounded-full
                bg-white border border-slate-100
                text-xs font-bold text-slate-500
                shadow-sm
              "
            >
              <CircleDot size={15} className="text-blue-600" />
              Live Management
            </div>
          </div>
        )}

        {/* JOB LIST */}
        <section className="space-y-5">

          {/* Loading */}
          {loading && (
            <div
              className="
                rounded-[2rem]
                bg-white/85 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(15,23,42,0.06)]
                p-10 text-center
              "
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center animate-pulse">
                <BriefcaseBusiness
                  size={27}
                  className="text-blue-600"
                />
              </div>

              <p className="mt-5 text-sm font-bold text-slate-500">
                Loading your posted jobs...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="
                rounded-[2rem]
                bg-red-50/90
                border border-red-100
                p-7 text-center
              "
            >
              <AlertTriangle
                size={28}
                className="mx-auto text-red-600"
              />

              <p className="mt-4 font-bold text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchMyJobs}
                className="
                  mt-5 inline-flex items-center gap-2
                  px-5 py-3 rounded-xl
                  bg-red-600 text-white
                  text-sm font-bold
                  hover:bg-red-700 transition
                "
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredJobs.length === 0 && (
            <div
              className="
                relative overflow-hidden
                rounded-[2rem]
                bg-white/85 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(15,23,42,0.06)]
                p-8 sm:p-12
                text-center
              "
            >
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />

              <div
                className="
                  relative w-20 h-20 mx-auto
                  rounded-[1.8rem]
                  bg-blue-50 border border-blue-100
                  flex items-center justify-center
                  shadow-lg shadow-blue-500/5
                "
              >
                <BriefcaseBusiness
                  size={34}
                  className="text-blue-600"
                />
              </div>

              <h2 className="relative mt-6 text-2xl font-black">
                No posted jobs found
              </h2>

              <p className="relative mt-2 text-sm text-slate-500">
                Start building your team by posting your first opportunity.
              </p>

              <Link
                to="/postJob"
                className="
                  relative mt-6 inline-flex items-center justify-center gap-2
                  px-6 py-3.5 rounded-2xl
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white text-sm font-black
                  shadow-xl shadow-blue-500/20
                  hover:-translate-y-1 transition-all duration-300
                "
              >
                <Plus size={18} />
                Post Your First Job
              </Link>
            </div>
          )}

          {/* Job Cards */}
          {!loading &&
            !error &&
            filteredJobs.map((job) => {
              const statusStyle = getStatusStyle(
                job.status || "ACTIVE"
              );

              return (
                <article
                  key={job.id}
                  className="
                    group relative overflow-hidden
                    rounded-[2rem] sm:rounded-[2.2rem]
                    bg-white/85 backdrop-blur-xl
                    border border-white
                    shadow-[0_15px_45px_rgba(15,23,42,0.06)]
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_25px_70px_rgba(37,99,235,0.12)]
                  "
                >
                  {/* Card Glow */}
                  <div
                    className="
                      absolute -top-28 -right-20
                      w-56 h-56
                      bg-blue-500/[0.06]
                      rounded-full blur-3xl
                      transition-opacity duration-500
                      opacity-0 group-hover:opacity-100
                    "
                  />

                  <div className="relative p-5 sm:p-6 lg:p-7">

                    {/* TOP SECTION */}
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

                      {/* Job Info */}
                      <div className="flex gap-4 sm:gap-5 min-w-0">

                        {/* Icon */}
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 rounded-[1.4rem] bg-blue-500/10 blur-lg" />

                          <div
                            className="
                              relative w-14 h-14 sm:w-16 sm:h-16
                              rounded-[1.3rem]
                              bg-gradient-to-br from-blue-500 to-indigo-700
                              text-white
                              shadow-xl shadow-blue-500/20
                              flex items-center justify-center
                              transition-transform duration-500
                              group-hover:rotate-[-5deg]
                              group-hover:scale-105
                            "
                          >
                            <BriefcaseBusiness size={28} />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2
                              className="
                                text-xl sm:text-2xl
                                font-black tracking-tight
                                text-slate-950
                                break-words
                              "
                            >
                              {job.title}
                            </h2>

                            <span
                              className={`
                                inline-flex items-center gap-2
                                px-3 py-1.5 rounded-full
                                border text-[11px] sm:text-xs font-black
                                ${statusStyle.bg}
                                ${statusStyle.text}
                                ${statusStyle.border}
                              `}
                            >
                              <span
                                className={`
                                  w-1.5 h-1.5 rounded-full
                                  ${statusStyle.dot}
                                `}
                              />

                              {job.status || "ACTIVE"}
                            </span>
                          </div>

                          <p
                            className="
                              mt-2 flex items-center gap-2
                              text-sm font-bold
                              text-blue-600
                            "
                          >
                            <Building2 size={16} />
                            {job.company}
                          </p>

                          {/* Job Details */}
                          <div className="mt-5 grid grid-cols-2 md:flex md:flex-wrap gap-3">

                            <JobMeta
                              icon={MapPin}
                              text={job.location}
                              color="text-blue-600"
                            />

                            <JobMeta
                              icon={Clock3}
                              text={job.jobType || "Not specified"}
                              color="text-indigo-600"
                            />

                            <JobMeta
                              icon={IndianRupee}
                              text={formatSalary(job)}
                              color="text-emerald-600"
                            />

                            <JobMeta
                              icon={Users}
                              text={`${job.openings || 1} openings`}
                              color="text-violet-600"
                            />

                            <JobMeta
                              icon={CalendarDays}
                              text={formatDate(job.createdAt)}
                              color="text-orange-600"
                            />
                          </div>

                          {/* Skills */}
                          {job.skills?.length > 0 && (
                            <div className="mt-5">
                              <p className="text-[10px] font-black tracking-[0.15em] text-slate-400 mb-2.5">
                                REQUIRED SKILLS
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {job.skills
                                  .slice(0, 5)
                                  .map((skill, index) => (
                                    <span
                                      key={index}
                                      className="
                                        px-3 py-1.5
                                        rounded-full
                                        bg-blue-50/80
                                        border border-blue-100
                                        text-[11px] sm:text-xs
                                        font-bold text-blue-600
                                        transition-all duration-300
                                        hover:-translate-y-0.5
                                        hover:bg-blue-100
                                      "
                                    >
                                      {skill}
                                    </span>
                                  ))}

                                {job.skills.length > 5 && (
                                  <span
                                    className="
                                      px-3 py-1.5
                                      rounded-full
                                      bg-slate-100
                                      text-[11px] sm:text-xs
                                      font-bold text-slate-500
                                    "
                                  >
                                    +{job.skills.length - 5}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div
                        className="
                          flex flex-wrap
                          items-center gap-2.5
                          xl:flex-nowrap
                          xl:justify-end
                          shrink-0
                        "
                      >
                        <Link
                          to={`/jobDetails/${job.id}`}
                          className="
                            flex-1 sm:flex-none
                            inline-flex items-center justify-center gap-2
                            px-4 py-3 rounded-xl
                            bg-slate-950 text-white
                            text-xs sm:text-sm font-bold
                            transition-all duration-300
                            hover:bg-blue-600
                            hover:-translate-y-0.5
                          "
                        >
                          <Eye size={16} />
                          <span className="sm:inline">View</span>
                        </Link>

                        <Link
                          to={`/applicationManagement?jobId=${job.id}`}
                          className="
                            flex-1 sm:flex-none
                            inline-flex items-center justify-center gap-2
                            px-4 py-3 rounded-xl
                            bg-gradient-to-r from-blue-600 to-indigo-600
                            text-white
                            text-xs sm:text-sm font-bold
                            shadow-lg shadow-blue-500/15
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:shadow-xl hover:shadow-blue-500/20
                          "
                        >
                          <Users size={16} />
                          Applicants
                        </Link>

                        <Link
                          to={`/editJob/${job.id}`}
                          className="
                            w-11 h-11
                            rounded-xl
                            bg-slate-50 border border-slate-100
                            flex items-center justify-center
                            text-slate-500
                            transition-all duration-300
                            hover:text-blue-600
                            hover:bg-blue-50
                            hover:border-blue-100
                            hover:-translate-y-0.5
                          "
                          title="Edit Job"
                        >
                          <Edit3 size={17} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="
                            w-11 h-11
                            rounded-xl
                            bg-slate-50 border border-slate-100
                            flex items-center justify-center
                            text-slate-500
                            transition-all duration-300
                            hover:text-red-600
                            hover:bg-red-50
                            hover:border-red-100
                            hover:-translate-y-0.5
                          "
                          title="Delete Job"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div
                      className="
                        mt-6 pt-5
                        border-t border-slate-100
                      "
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FileText
                          size={15}
                          className="text-slate-400"
                        />

                        <span className="text-xs font-black text-slate-400">
                          JOB DESCRIPTION
                        </span>
                      </div>

                      <p
                        className="
                          text-sm text-slate-500
                          leading-relaxed
                          max-w-5xl
                        "
                      >
                        {job.description?.length > 180
                          ? job.description.substring(0, 180) + "..."
                          : job.description ||
                            "No description added."}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
        </section>
      </main>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-slate-950/60 backdrop-blur-md
            px-4
          "
        >
          <div
            className="
              relative overflow-hidden
              w-full max-w-md
              rounded-[2rem]
              bg-white
              border border-red-100
              shadow-2xl
              p-6 sm:p-7
              animate-[fadeIn_.25s_ease-out]
            "
          >
            {/* Modal Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />

            <div className="relative">

              <div className="flex items-start justify-between gap-4">

                <div
                  className="
                    relative
                    w-15 h-15
                  "
                >
                  <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-lg" />

                  <div
                    className="
                      relative w-14 h-14
                      rounded-2xl
                      bg-red-50 border border-red-100
                      flex items-center justify-center
                    "
                  >
                    <AlertTriangle
                      size={28}
                      className="text-red-600"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleteLoading}
                  className="
                    w-10 h-10 rounded-xl
                    bg-slate-50 border border-slate-100
                    flex items-center justify-center
                    text-slate-500
                    transition
                    hover:text-red-600
                    hover:bg-red-50
                    disabled:opacity-60
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <h2 className="mt-6 text-2xl sm:text-3xl font-black tracking-tight">
                Delete this job?
              </h2>

              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete this job posting?
                Candidates will no longer be able to view or apply for this
                opportunity.
              </p>

              {deleteError && (
                <div
                  className="
                    mt-5 flex items-center gap-3
                    rounded-2xl
                    bg-red-50 border border-red-100
                    px-4 py-3
                    text-sm font-bold text-red-600
                  "
                >
                  <AlertTriangle size={17} />
                  {deleteError}
                </div>
              )}

              <div className="mt-7 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleteLoading}
                  className="
                    px-5 py-3.5 rounded-xl
                    bg-slate-100 text-slate-700
                    text-sm font-black
                    transition
                    hover:bg-slate-200
                    disabled:opacity-60
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDeleteJob}
                  disabled={deleteLoading}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-5 py-3.5 rounded-xl
                    bg-red-600 text-white
                    text-sm font-black
                    shadow-lg shadow-red-500/15
                    transition-all duration-300
                    hover:bg-red-700
                    hover:-translate-y-0.5
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                >
                  <Trash2 size={17} />

                  {deleteLoading
                    ? "Deleting..."
                    : "Delete Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Component Utility Styles */}
      <style>
        {`
          .input-field {
            width: 100%;
            background: transparent;
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  bg,
  color,
  glow,
}) => {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[1.5rem] sm:rounded-[1.7rem]
        bg-white/85 backdrop-blur-xl
        border border-white
        shadow-[0_12px_35px_rgba(15,23,42,0.05)]
        p-4 sm:p-6
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(37,99,235,0.10)]
      "
    >
      <div
        className={`
          absolute -top-12 -right-12
          w-28 h-28 rounded-full
          ${glow}
          blur-2xl
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
        `}
      />

      <div className="relative flex items-center justify-between gap-3">

        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold text-slate-500 truncate">
            {title}
          </p>

          <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
            {value}
          </h3>
        </div>

        <div
          className={`
            w-11 h-11 sm:w-14 sm:h-14
            rounded-2xl
            ${bg}
            flex items-center justify-center
            shrink-0
            transition-transform duration-500
            group-hover:rotate-[-6deg]
            group-hover:scale-105
          `}
        >
          <Icon
            size={24}
            className={color}
          />
        </div>
      </div>
    </div>
  );
};

const JobMeta = ({
  icon: Icon,
  text,
  color,
}) => {
  return (
    <div
      className="
        flex items-center gap-2
        min-w-0
        text-xs sm:text-sm
        text-slate-500
      "
    >
      <div
        className="
          w-8 h-8 shrink-0
          rounded-xl
          bg-slate-50 border border-slate-100
          flex items-center justify-center
        "
      >
        <Icon
          size={15}
          className={color}
        />
      </div>

      <span className="font-semibold truncate">
        {text}
      </span>
    </div>
  );
};

export default MyPostedJobs;


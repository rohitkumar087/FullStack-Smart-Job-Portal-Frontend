import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  CalendarDays,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Sparkles,
  Eye,
  IndianRupee,
  Send,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getMyApplications } from "../services/jobService";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, applications]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyApplications();

      setApplications(data || []);
      setFilteredApplications(data || []);
    } catch (err) {
      setError("Failed to load your applications.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...applications];

    if (searchText.trim()) {
      result = result.filter((application) => {
        const jobTitle = application.job?.title || "";
        const company = application.job?.company || "";
        const location = application.job?.location || "";

        return (
          jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          company.toLowerCase().includes(searchText.toLowerCase()) ||
          location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    if (statusFilter !== "ALL") {
      result = result.filter(
        (application) => application.status === statusFilter
      );
    }

    setFilteredApplications(result);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return {
          label: "Shortlisted",
          icon: CheckCircle2,
          className:
            "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",
          glow: "shadow-emerald-500/10",
          dot: "bg-emerald-500",
        };

      case "REJECTED":
        return {
          label: "Rejected",
          icon: XCircle,
          className:
            "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
          glow: "shadow-red-500/10",
          dot: "bg-red-500",
        };

      case "PENDING":
      default:
        return {
          label: "Pending",
          icon: AlertCircle,
          className:
            "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
          glow: "shadow-amber-500/10",
          dot: "bg-amber-500",
        };
    }
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

  const pendingCount = applications.filter(
    (app) => app.status === "PENDING"
  ).length;

  const shortlistedCount = applications.filter(
    (app) => app.status === "SHORTLISTED"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "REJECTED"
  ).length;

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("ALL");
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] dark:bg-slate-950 text-slate-950 dark:text-white overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="absolute top-[25%] -right-40 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[35%] w-[350px] h-[350px] rounded-full bg-cyan-400/5 blur-[100px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
        
        {/* Hero Header */}
        <section className="relative mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(37,99,235,0.08)]">

            {/* Decorative 3D Shapes */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-16 w-64 h-64 rounded-[3rem] bg-gradient-to-br from-blue-500/20 to-indigo-500/5 rotate-12 blur-2xl" />
              <div className="absolute -bottom-20 left-[45%] w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="hidden lg:block absolute top-10 right-[28%] w-20 h-20 rounded-3xl border border-blue-300/20 rotate-[25deg]" />
              <div className="hidden lg:block absolute bottom-8 right-[15%] w-12 h-12 rounded-2xl bg-blue-500/5 border border-blue-500/10 rotate-[18deg]" />
            </div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-7">

                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50/90 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 shadow-sm">
                    <Sparkles size={15} className="text-blue-600 dark:text-blue-400" />

                    <span className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      Candidate Workspace
                    </span>
                  </div>

                  <div className="mt-5">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                      My
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        {" "}Applications
                      </span>
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                      Keep track of every opportunity you have applied for and
                      follow your hiring journey in one organized workspace.
                    </p>
                  </div>
                </div>

                <Link
                  to="/jobs"
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-6 py-3.5 rounded-2xl
                    bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600
                    text-white text-sm font-bold
                    shadow-xl shadow-blue-500/25
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl hover:shadow-blue-500/30
                    active:translate-y-0
                  "
                >
                  <Send
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-12"
                  />

                  Explore More Jobs

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
          <StatCard
            title="Total Applied"
            value={applications.length}
            icon={BriefcaseBusiness}
            bg="bg-blue-500/10"
            color="text-blue-600"
            accent="from-blue-500 to-indigo-500"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={AlertCircle}
            bg="bg-amber-500/10"
            color="text-amber-600"
            accent="from-amber-400 to-orange-500"
          />

          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            icon={CheckCircle2}
            bg="bg-emerald-500/10"
            color="text-emerald-600"
            accent="from-emerald-400 to-green-600"
          />

          <StatCard
            title="Rejected"
            value={rejectedCount}
            icon={XCircle}
            bg="bg-red-500/10"
            color="text-red-600"
            accent="from-red-400 to-rose-600"
          />
        </section>

        {/* Search & Filter */}
        <section className="
          relative mb-8 sm:mb-10
          rounded-[1.8rem] sm:rounded-[2rem]
          bg-white/75 dark:bg-slate-900/75
          backdrop-blur-xl
          border border-white/70 dark:border-slate-800
          shadow-[0_15px_50px_rgba(15,23,42,0.06)]
          p-4 sm:p-5
        ">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
              <SlidersHorizontal size={17} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Find Applications
              </h2>

              <p className="text-xs text-slate-400">
                Search and filter your application history
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_230px_auto] gap-3 sm:gap-4">

            {/* Search */}
            <div className="
              group flex items-center gap-3
              bg-slate-50/90 dark:bg-slate-950/50
              rounded-2xl px-4 py-3.5
              border border-slate-100 dark:border-slate-800
              transition-all duration-300
              focus-within:bg-white dark:focus-within:bg-slate-900
              focus-within:border-blue-300 dark:focus-within:border-blue-800
              focus-within:shadow-lg focus-within:shadow-blue-500/5
            ">
              <Search
                size={20}
                className="text-slate-400 transition-colors group-focus-within:text-blue-600"
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search job title, company or location..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  w-full appearance-none
                  bg-slate-50/90 dark:bg-slate-950/50
                  rounded-2xl px-4 py-3.5 pr-10
                  border border-slate-100 dark:border-slate-800
                  outline-none
                  text-sm font-bold
                  text-slate-700 dark:text-slate-200
                  transition-all duration-300
                  focus:bg-white dark:focus:bg-slate-900
                  focus:border-blue-300
                "
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Clear */}
            <button
              type="button"
              onClick={clearFilters}
              className="
                group inline-flex items-center justify-center gap-2
                px-6 py-3.5 rounded-2xl
                bg-slate-950 dark:bg-white
                text-white dark:text-slate-950
                text-sm font-bold
                transition-all duration-300
                hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white
                hover:-translate-y-0.5
                hover:shadow-lg hover:shadow-blue-500/20
                active:translate-y-0
              "
            >
              <Filter
                size={17}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              Clear Filters
            </button>
          </div>
        </section>

        {/* Application Section Header */}
        {!loading && !error && filteredApplications.length > 0 && (
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                Application History
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Showing {filteredApplications.length} application
                {filteredApplications.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500">
              <Briefcase size={15} className="text-blue-600" />
              Your career journey
            </div>
          </div>
        )}

        {/* Applications */}
        <section className="space-y-5">

          {loading && (
            <div className="
              rounded-[2rem]
              bg-white/80 dark:bg-slate-900/80
              border border-white dark:border-slate-800
              backdrop-blur-xl
              p-10 sm:p-14 text-center
              shadow-xl shadow-blue-500/5
            ">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center animate-pulse">
                <BriefcaseBusiness size={30} className="text-blue-600" />
              </div>

              <p className="mt-5 text-sm font-bold text-slate-600 dark:text-slate-300">
                Loading your applications...
              </p>
            </div>
          )}

          {error && (
            <div className="
              rounded-[2rem]
              bg-red-50/80 dark:bg-red-950/20
              border border-red-100 dark:border-red-900/40
              p-8 sm:p-10 text-center
            ">
              <XCircle size={35} className="mx-auto text-red-500" />

              <p className="mt-4 font-bold text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && filteredApplications.length === 0 && (
            <div className="
              relative overflow-hidden
              rounded-[2rem] sm:rounded-[2.5rem]
              bg-white/80 dark:bg-slate-900/80
              backdrop-blur-xl
              border border-white dark:border-slate-800
              p-10 sm:p-16
              text-center
              shadow-[0_20px_60px_rgba(37,99,235,0.07)]
            ">
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="
                relative w-20 h-20 mx-auto
                rounded-[1.7rem]
                bg-gradient-to-br from-blue-500 to-indigo-600
                text-white
                flex items-center justify-center
                shadow-xl shadow-blue-500/25
                rotate-3
              ">
                <BriefcaseBusiness size={35} />
              </div>

              <h2 className="relative mt-6 text-xl sm:text-2xl font-black">
                No applications found
              </h2>

              <p className="relative mt-2 text-sm text-slate-500 dark:text-slate-400">
                You have not applied to any matching jobs yet.
              </p>

              <Link
                to="/jobs"
                className="
                  relative mt-6 inline-flex items-center gap-2
                  px-6 py-3.5 rounded-2xl
                  bg-blue-600 text-white
                  text-sm font-bold
                  shadow-lg shadow-blue-500/20
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-indigo-600
                "
              >
                Browse Jobs
                <ArrowUpRight size={17} />
              </Link>
            </div>
          )}

          {!loading &&
            !error &&
            filteredApplications.map((application) => {
              const job = application.job;
              const statusInfo = getStatusInfo(application.status);
              const StatusIcon = statusInfo.icon;

              return (
                <article
                  key={application.id}
                  className="
                    group relative overflow-hidden
                    rounded-[2rem] sm:rounded-[2.3rem]
                    bg-white/85 dark:bg-slate-900/85
                    backdrop-blur-xl
                    border border-white/80 dark:border-slate-800
                    shadow-[0_12px_35px_rgba(15,23,42,0.05)]
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_25px_70px_rgba(37,99,235,0.12)]
                  "
                >
                  {/* Hover Accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                  {/* Decorative Glow */}
                  <div className="pointer-events-none absolute -top-24 -right-24 w-52 h-52 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

                  <div className="relative p-5 sm:p-7">

                    {/* Top Section */}
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

                      <div className="flex gap-4 sm:gap-5 min-w-0">

                        {/* Company Icon */}
                        <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                          <div className="absolute inset-0 translate-y-1 rounded-2xl bg-blue-950/10 group-hover:translate-y-2 transition-transform duration-300" />

                          <div className="
                            relative w-full h-full
                            rounded-2xl
                            bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700
                            text-white
                            flex items-center justify-center
                            border border-white/20
                            shadow-lg shadow-blue-500/20
                            transition-all duration-500
                            group-hover:-translate-y-1
                            group-hover:rotate-[-4deg]
                          ">
                            <Building2 size={27} />
                          </div>
                        </div>

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h2 className="text-lg sm:text-2xl font-black text-slate-950 dark:text-white break-words">
                              {job?.title || "Job Title"}
                            </h2>

                            <span
                              className={`
                                inline-flex items-center gap-2
                                px-3 py-1.5 rounded-full border
                                text-[11px] font-black
                                shadow-sm ${statusInfo.glow}
                                ${statusInfo.className}
                              `}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot} animate-pulse`} />

                              <StatusIcon size={14} />

                              {statusInfo.label}
                            </span>
                          </div>

                          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                            <Building2 size={16} />
                            {job?.company || "Company"}
                          </p>

                          {/* Job Meta */}
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">

                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={14} className="text-blue-500" />
                              {job?.location || "Location"}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 size={14} className="text-indigo-500" />
                              {job?.jobType || "Not specified"}
                            </span>

                            {/* Hide Salary on very small screens */}
                            <span className="hidden sm:inline-flex items-center gap-1.5">
                              <IndianRupee size={14} className="text-emerald-500" />
                              {formatSalary(job)}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={14} className="text-slate-400" />
                              Applied {formatDate(application.appliedAt)}
                            </span>

                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <Link
                        to={`/jobDetails/${job?.id}`}
                        className="
                          group/btn shrink-0
                          inline-flex items-center justify-center gap-2
                          px-5 py-3 rounded-2xl
                          bg-slate-950 dark:bg-white
                          text-white dark:text-slate-950
                          text-sm font-bold
                          shadow-lg shadow-slate-950/10
                          transition-all duration-300
                          hover:bg-blue-600 dark:hover:bg-blue-500
                          hover:dark:text-white
                          hover:-translate-y-0.5
                          active:translate-y-0
                        "
                      >
                        <Eye size={17} />

                        View Job

                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </Link>
                    </div>

                    {/* Application Details */}
                    <div className="mt-6 pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800">

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <InfoCard
                          title="Experience"
                          value={application.experience || "Not added"}
                          icon={Clock3}
                          color="text-blue-600"
                          bg="bg-blue-500/5"
                        />

                        <InfoCard
                          title="Expected Salary"
                          value={
                            application.expectedSalary
                              ? `₹${application.expectedSalary}`
                              : "Not disclosed"
                          }
                          icon={IndianRupee}
                          color="text-emerald-600"
                          bg="bg-emerald-500/5"
                        />

                        <InfoCard
                          title="Resume"
                          value={
                            application.resumeUrl
                              ? "Uploaded"
                              : "Not uploaded"
                          }
                          icon={FileText}
                          color="text-orange-600"
                          bg="bg-orange-500/5"
                        />
                      </div>

                      {/* Skills */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                            <Sparkles size={14} className="text-blue-600" />
                          </div>

                          <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                            Skills Submitted
                          </p>
                        </div>

                        {application.skills?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {application.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="
                                  px-3 py-1.5 rounded-xl
                                  bg-blue-50/80 dark:bg-blue-950/30
                                  border border-blue-100 dark:border-blue-900/40
                                  text-xs font-bold
                                  text-blue-600 dark:text-blue-400
                                  transition-all duration-300
                                  hover:-translate-y-0.5
                                  hover:shadow-md hover:shadow-blue-500/10
                                "
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            No skills submitted.
                          </p>
                        )}
                      </div>

                      {/* Cover Letter */}
                      {application.coverLetter && (
                        <div className="
                          mt-6
                          rounded-[1.4rem]
                          bg-slate-50/80 dark:bg-slate-950/40
                          border border-slate-100 dark:border-slate-800
                          p-4 sm:p-5
                        ">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                              <FileText size={15} className="text-indigo-600 dark:text-indigo-400" />
                            </div>

                            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                              Cover Letter
                            </p>
                          </div>

                          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
        </section>
      </main>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  bg,
  color,
  accent,
}) => {
  return (
    <div className="
      group relative overflow-hidden
      rounded-[1.5rem] sm:rounded-[1.8rem]
      bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl
      border border-white dark:border-slate-800
      shadow-[0_10px_30px_rgba(15,23,42,0.05)]
      transition-all duration-500
      hover:-translate-y-1
      hover:shadow-[0_20px_50px_rgba(37,99,235,0.10)]
      p-4 sm:p-6
    ">
      {/* Accent */}
      <div
        className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${accent}`}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 truncate">
            {title}
          </p>

          <h3 className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            {value}
          </h3>
        </div>

        <div className="relative shrink-0">
          <div className={`absolute inset-0 rounded-2xl ${bg} blur-lg opacity-0 group-hover:opacity-70 transition-opacity`} />

          <div
            className={`
              relative w-11 h-11 sm:w-14 sm:h-14
              rounded-2xl ${bg}
              flex items-center justify-center
              transition-all duration-300
              group-hover:rotate-[-5deg]
              group-hover:scale-110
            `}
          >
            <Icon
              size={24}
              className={color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
}) => {
  return (
    <div className={`
      group rounded-[1.3rem]
      ${bg}
      border border-slate-100 dark:border-slate-800
      p-4
      transition-all duration-300
      hover:-translate-y-0.5
      hover:bg-white dark:hover:bg-slate-800
      hover:shadow-lg hover:shadow-slate-950/5
    `}>
      <div className="flex items-center gap-2">
        <Icon
          size={17}
          className={`${color} transition-transform duration-300 group-hover:scale-110`}
        />

        <p className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200">
          {title}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
        {value}
      </p>
    </div>
  );
};

export default MyApplications;

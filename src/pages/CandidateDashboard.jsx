import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  FileText,
  Bookmark,
  Eye,
  Bell,
  MapPin,
  Clock3,
  CalendarDays,
  TrendingUp,
  UserRound,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  IndianRupee,
  Target,
  Search,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getMyApplications, getAllJobs } from "../services/jobService";

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [error, setError] = useState("");
  const userName = localStorage.getItem("userName") || "Candidate";

  useEffect(() => {
    fetchApplications();
    fetchRecommendedJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      setError("");

      const data = await getMyApplications();

      setApplications(data || []);
    } catch (err) {
      setError("Failed to load your applications");
    } finally {
      setLoadingApplications(false);
    }
  };

  const fetchRecommendedJobs = async () => {
    try {
      const data = await getAllJobs();

      setRecommendedJobs(data.content?.slice(0, 3) || []);
    } catch (err) {
      console.log("Recommended jobs error:", err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return {
          label: "Shortlisted",
          icon: CheckCircle2,
          className:
            "bg-emerald-50 text-emerald-700 border-emerald-100",
        };

      case "REJECTED":
        return {
          label: "Rejected",
          icon: XCircle,
          className: "bg-red-50 text-red-700 border-red-100",
        };

      case "PENDING":
      default:
        return {
          label: "Pending",
          icon: AlertCircle,
          className: "bg-amber-50 text-amber-700 border-amber-100",
        };
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently applied";
    }

    return `Applied on ${new Date(
      dateValue
    ).toLocaleDateString()}`;
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

  const stats = [
    {
      title: "Applied Jobs",
      value: applications.length,
      icon: BriefcaseBusiness,
      bg: "bg-blue-50",
      color: "text-blue-600",
      glow: "group-hover:shadow-blue-100/80",
    },
    {
      title: "Saved Jobs",
      value: "0",
      icon: Bookmark,
      bg: "bg-violet-50",
      color: "text-violet-600",
      glow: "group-hover:shadow-violet-100/80",
    },
    {
      title: "Profile Views",
      value: "0",
      icon: Eye,
      bg: "bg-orange-50",
      color: "text-orange-600",
      glow: "group-hover:shadow-orange-100/80",
    },
    {
      title: "Shortlisted",
      value: applications.filter(
        (app) => app.status === "SHORTLISTED"
      ).length,
      icon: Target,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      glow: "group-hover:shadow-emerald-100/80",
    },
  ];

  const savedJobs = [];

  return (
    <div className="relative min-h-screen bg-[#f7faff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Desktop Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden md:block absolute -top-48 -right-48 w-[38rem] h-[38rem] rounded-full bg-blue-200/30 blur-3xl" />

        <div className="hidden lg:block absolute top-[55rem] -left-56 w-[34rem] h-[34rem] rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="hidden xl:block absolute top-44 right-[6%] w-36 h-36 rounded-[2.5rem] border border-blue-200/40 rotate-12" />

        <div className="hidden xl:block absolute top-[70rem] left-[4%] w-24 h-24 rounded-3xl border border-indigo-200/40 -rotate-12" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Premium Dashboard Hero */}
        <section className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/60">

          {/* Background Depth */}
          <div className="absolute -top-32 -right-28 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

              {/* Welcome */}
              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                  <Sparkles
                    size={16}
                    className="text-blue-300"
                  />

                  <span className="text-sm font-bold text-blue-100">
                    Candidate Dashboard
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Welcome back,{" "}
                  <span className="text-blue-300">
                    {userName}
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Track your applications, manage your professional profile,
                  and discover new opportunities that match your career goals.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">

                  <Link
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-900/30 hover:bg-blue-500 active:scale-[0.98] transition"
                    to="/jobs"
                  >
                    <Search size={18} />
                    Find New Jobs
                  </Link>

                  <Link
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white/15 transition"
                    to="/candidateProfile"
                  >
                    <UserRound size={18} />
                    Update Profile
                  </Link>

                </div>

              </div>

              {/* Desktop Profile Strength */}
              <div className="hidden sm:block w-full xl:w-[300px] shrink-0">

                <div className="rounded-[1.8rem] bg-white/10 border border-white/10 backdrop-blur-md p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm font-bold text-white">
                        Profile Strength
                      </p>

                      <p className="mt-1 text-xs text-slate-300">
                        Keep your profile updated
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <TrendingUp
                        size={21}
                        className="text-blue-300"
                      />
                    </div>

                  </div>

                  <div className="mt-7 flex items-end justify-between">

                    <span className="text-4xl font-extrabold text-white">
                      {applications.length > 0 ? "70%" : "20%"}
                    </span>

                    <span className="text-xs font-bold text-blue-200">
                      Completion
                    </span>

                  </div>

                  <div className="mt-4 w-full h-2.5 bg-white/10 rounded-full overflow-hidden">

                    <div
                      className={`${
                        applications.length > 0
                          ? "w-[70%]"
                          : "w-[20%]"
                      } h-full rounded-full bg-blue-400`}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Mobile Profile Progress */}
        <section className="sm:hidden mt-5">

          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="font-bold">
                    Profile Strength
                  </h2>

                  <p className="text-xs text-slate-500">
                    Complete your profile
                  </p>
                </div>

              </div>

              <span className="text-xl font-extrabold text-blue-600">
                {applications.length > 0 ? "70%" : "20%"}
              </span>

            </div>

            <div className="mt-4 w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">

              <div
                className={`${
                  applications.length > 0
                    ? "w-[70%]"
                    : "w-[20%]"
                } h-full bg-blue-600 rounded-full`}
              />

            </div>

          </div>

        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6 sm:mt-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden bg-white rounded-[1.4rem] sm:rounded-[1.7rem] border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl ${item.glow} transition-all p-4 sm:p-6`}
              >

                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-slate-50 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon
                      size={24}
                      className={item.color}
                    />
                  </div>

                </div>

              </div>
            );
          })}

        </section>

        {/* Main Dashboard */}
        <section className="grid xl:grid-cols-[minmax(0,1fr)_340px] gap-7 lg:gap-8 mt-7 lg:mt-8">

          {/* Main Content */}
          <div className="space-y-7 lg:space-y-8">

            {/* Recent Applications */}
            <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm p-5 sm:p-7">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FileText
                        size={19}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold">
                        Recent Applications
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Track your latest application status.
                      </p>
                    </div>

                  </div>
                </div>

                <Link
                  to="/myApplications"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  View All
                  <ArrowRight size={17} />
                </Link>

              </div>

              <div className="space-y-4">

                {loadingApplications && (
                  <div className="rounded-[1.4rem] bg-slate-50 border border-slate-100 p-8 text-center">

                    <div className="w-10 h-10 mx-auto rounded-xl border-4 border-blue-100 border-t-blue-600 animate-spin" />

                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      Loading your applications...
                    </p>

                  </div>
                )}

                {error && (
                  <div className="rounded-[1.4rem] bg-red-50 border border-red-100 p-6 text-center text-red-600 text-sm font-semibold">
                    {error}
                  </div>
                )}

                {!loadingApplications &&
                  !error &&
                  applications.length === 0 && (
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-50 border border-slate-100 p-7 sm:p-10 text-center">

                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-100/40 blur-2xl" />

                      <div className="relative z-10">

                        <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                          <BriefcaseBusiness
                            size={25}
                            className="text-blue-600"
                          />
                        </div>

                        <h3 className="mt-5 font-extrabold text-lg">
                          No applications yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Start exploring opportunities and take the next step
                          in your career.
                        </p>

                        <Link
                          to="/jobs"
                          className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                        >
                          Browse Jobs
                          <ArrowRight size={17} />
                        </Link>

                      </div>

                    </div>
                  )}

                {!loadingApplications &&
                  !error &&
                  applications.slice(0, 3).map((application) => {
                    const job = application.job;
                    const statusInfo = getStatusStyle(
                      application.status
                    );
                    const StatusIcon = statusInfo.icon;

                    return (
                      <div
                        key={application.id}
                        className="group rounded-[1.4rem] border border-slate-100 bg-slate-50/60 p-4 sm:p-5 hover:bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/40 transition-all"
                      >

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                          <div className="flex gap-3 sm:gap-4 min-w-0">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition">
                              <Building2
                                size={24}
                                className="text-blue-600"
                              />
                            </div>

                            <div className="min-w-0">

                              <h3 className="font-extrabold text-base sm:text-lg text-slate-950 truncate">
                                {job?.title || "Job Title"}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {job?.company || "Company"}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">

                                <span className="flex items-center gap-1.5">
                                  <MapPin size={14} />
                                  {job?.location || "Location"}
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <Clock3 size={14} />
                                  {formatDate(
                                    application.appliedAt
                                  )}
                                </span>

                              </div>

                            </div>

                          </div>

                          <div
                            className={`inline-flex self-start md:self-center items-center justify-center gap-2 px-4 py-2 rounded-full border text-xs font-bold whitespace-nowrap ${statusInfo.className}`}
                          >
                            <StatusIcon size={15} />
                            {statusInfo.label}
                          </div>

                        </div>

                      </div>
                    );
                  })}

              </div>

            </section>

            {/* Recommended Jobs */}
            <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm p-5 sm:p-7">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Sparkles
                      size={19}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      Recommended Jobs
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Explore the latest opportunities on SmartJob.
                    </p>
                  </div>

                </div>

                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  Explore More
                  <ArrowRight size={17} />
                </Link>

              </div>

              {recommendedJobs.length === 0 ? (
                <div className="rounded-[1.4rem] bg-slate-50 border border-slate-100 p-7 text-center text-sm font-semibold text-slate-500">
                  No recommended jobs available right now.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-5 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all"
                    >

                      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-50 group-hover:scale-150 transition-transform duration-500" />

                      <div className="relative z-10">

                        <div className="flex items-start justify-between gap-3">

                          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                            <BriefcaseBusiness
                              size={23}
                              className="text-blue-600"
                            />
                          </div>

                          <ChevronRight
                            size={19}
                            className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                          />

                        </div>

                        <h3 className="mt-5 text-base sm:text-lg font-extrabold text-slate-950 line-clamp-2">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 truncate">
                          {job.company}
                        </p>

                        <div className="mt-5 space-y-3 text-sm text-slate-500">

                          <p className="flex items-center gap-2 min-w-0">
                            <MapPin
                              size={16}
                              className="text-blue-600 shrink-0"
                            />

                            <span className="truncate">
                              {job.location}
                            </span>
                          </p>

                          <p className="flex items-center gap-2">
                            <IndianRupee
                              size={16}
                              className="text-emerald-600 shrink-0"
                            />
                            {formatSalary(job)}
                          </p>

                          <p className="flex items-center gap-2">
                            <Clock3
                              size={16}
                              className="text-orange-500 shrink-0"
                            />
                            {job.jobType || "Not specified"}
                          </p>

                        </div>

                        <Link
                          to={`/jobDetails/${job.id}`}
                          className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                        >
                          View Job
                          <ArrowRight size={16} />
                        </Link>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </section>

          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden xl:block">

            <div className="sticky top-24 space-y-6">

              {/* Notifications */}
              <section className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-extrabold">
                      Notifications
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Latest activity
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Bell
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                </div>

                <div className="mt-6">

                  {applications.length > 0 ? (
                    <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">

                      <div className="flex items-center gap-2">

                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                          <CheckCircle2
                            size={16}
                            className="text-blue-600"
                          />
                        </div>

                        <p className="text-sm font-bold text-slate-950">
                          Application submitted
                        </p>

                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-slate-500">
                        Your latest application is currently under review.
                      </p>

                    </div>
                  ) : (
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">

                      <p className="text-sm font-bold text-slate-950">
                        Start your journey
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        Browse jobs and apply to your first opportunity.
                      </p>

                    </div>
                  )}

                </div>

              </section>

              {/* Saved Jobs */}
              <section className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-extrabold">
                      Saved Jobs
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Jobs you bookmarked
                    </p>
                  </div>

                  <Bookmark
                    size={21}
                    className="text-blue-600"
                  />

                </div>

                {savedJobs.length === 0 ? (
                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-5 text-center">

                    <Bookmark
                      size={22}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-500">
                      No saved jobs yet.
                    </p>

                  </div>
                ) : (
                  <div className="mt-5 space-y-4">

                    {savedJobs.map((job, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
                      >

                        <h3 className="font-bold text-slate-950">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {job.company}
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <MapPin size={14} />
                          {job.location}
                        </p>

                      </div>
                    ))}

                  </div>
                )}

                <button className="mt-5 w-full py-3 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition">
                  View Saved Jobs
                </button>

              </section>

              {/* Profile CTA */}
              <section className="relative overflow-hidden bg-slate-950 rounded-[1.8rem] shadow-xl shadow-slate-200 p-6 text-white">

                <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-600/25 rounded-full blur-3xl" />

                <div className="relative z-10">

                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <UserRound
                      size={23}
                      className="text-blue-300"
                    />
                  </div>

                  <h2 className="mt-5 text-xl font-extrabold">
                    Candidate Profile
                  </h2>

                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Keep your professional details updated to make your
                    applications stronger.
                  </p>

                  <Link
                    to="/candidateProfile"
                    className="mt-6 w-full py-3 rounded-xl bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 transition text-center block"
                  >
                    View Profile
                  </Link>

                </div>

              </section>

            </div>

          </aside>

        </section>

        {/* Mobile / Tablet Quick Actions */}
        <section className="xl:hidden mt-7 grid sm:grid-cols-2 gap-4">

          <Link
            to="/candidateProfile"
            className="group rounded-[1.5rem] bg-slate-950 text-white p-5 hover:-translate-y-0.5 transition"
          >

            <div className="flex items-center justify-between">

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <UserRound
                  size={21}
                  className="text-blue-300"
                />
              </div>

              <ArrowRight
                size={19}
                className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition"
              />

            </div>

            <h2 className="mt-5 text-lg font-extrabold">
              Manage Profile
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              Update your professional information.
            </p>

          </Link>

          <Link
            to="/jobs"
            className="group rounded-[1.5rem] bg-white border border-slate-100 shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100/50 transition"
          >

            <div className="flex items-center justify-between">

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <BriefcaseBusiness
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <ArrowRight
                size={19}
                className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition"
              />

            </div>

            <h2 className="mt-5 text-lg font-extrabold">
              Find Opportunities
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore new jobs that match your skills.
            </p>

          </Link>

        </section>

      </main>
    </div>
  );
};

export default CandidateDashboard;


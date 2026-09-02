import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Users,
  Eye,
  UserCheck,
  Plus,
  Building2,
  MapPin,
  Clock3,
  CalendarDays,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileText,
  Edit3,
  MoreHorizontal,
  IndianRupee,
  UserRound,
  ArrowUpRight,
  BarChart3,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyJobs } from "../services/jobService";

const RecruiterDashboard = () => {
  const recruiterName = localStorage.getItem("userName") || "Recruiter";

  const [myJobs, setMyJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoadingJobs(true);
      setError("");

      const data = await getMyJobs();

      setMyJobs(data || []);
    } catch (err) {
      setError("Failed to load recruiter jobs");
    } finally {
      setLoadingJobs(false);
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

  const activeJobs = myJobs.filter((job) => job.status === "ACTIVE").length;

  const stats = [
    {
      title: "Posted Jobs",
      value: myJobs.length,
      icon: BriefcaseBusiness,
      bg: "bg-blue-500/10",
      color: "text-blue-600",
      accent: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: Users,
      bg: "bg-violet-500/10",
      color: "text-violet-600",
      accent: "from-violet-500 to-purple-600",
    },
    {
      title: "Profile Views",
      value: "0",
      icon: Eye,
      bg: "bg-orange-500/10",
      color: "text-orange-600",
      accent: "from-orange-400 to-amber-500",
    },
    {
      title: "Shortlisted",
      value: "0",
      icon: UserCheck,
      bg: "bg-emerald-500/10",
      color: "text-emerald-600",
      accent: "from-emerald-400 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Premium Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-[8%] w-[480px] h-[480px] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute top-[20%] -right-48 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-[35%] w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[130px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Top Welcome Section */}
        <section className="grid xl:grid-cols-[1fr_340px] gap-6 sm:gap-8 mb-7 sm:mb-9">

          {/* Main Hero */}
          <div className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/80 backdrop-blur-xl
            border border-white/80
            shadow-[0_25px_70px_rgba(37,99,235,0.08)]
          ">
            {/* Decorative Elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-28 left-[35%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="hidden lg:block absolute top-12 right-[28%] w-16 h-16 rounded-3xl border border-blue-300/20 rotate-[25deg]" />
              <div className="hidden lg:block absolute bottom-10 right-[12%] w-12 h-12 rounded-2xl bg-blue-500/5 border border-blue-500/10 rotate-[18deg]" />
            </div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

                <div className="max-w-2xl">
                  <div className="
                    inline-flex items-center gap-2
                    px-3.5 py-2 rounded-full
                    bg-blue-50/90 border border-blue-100
                    shadow-sm
                  ">
                    <Sparkles size={15} className="text-blue-600" />

                    <span className="text-xs sm:text-sm font-extrabold text-blue-600">
                      Recruiter Workspace
                    </span>
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                    Welcome back,
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                      {recruiterName}!
                    </span>
                  </h1>

                  <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                    Manage job posts, review applicants, and build your ideal
                    team from one powerful hiring workspace.
                  </p>

                  {/* Actions */}
                  <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">

                    <Link
                      className="
                        group inline-flex items-center justify-center gap-2
                        px-6 py-3.5 rounded-2xl
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        text-white text-sm font-bold
                        shadow-xl shadow-blue-500/25
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-2xl hover:shadow-blue-500/30
                        active:translate-y-0
                      "
                      to="/postJob"
                    >
                      <Plus
                        size={18}
                        className="transition-transform duration-300 group-hover:rotate-90"
                      />
                      Post New Job
                    </Link>

                    <Link
                      className="
                        inline-flex items-center justify-center gap-2
                        px-6 py-3.5 rounded-2xl
                        bg-slate-950 text-white
                        text-sm font-bold
                        transition-all duration-300
                        hover:bg-slate-800
                        hover:-translate-y-1
                        hover:shadow-xl hover:shadow-slate-950/10
                      "
                      to="/applicationManagement"
                    >
                      <Users size={18} />
                      View Applicants
                    </Link>

                    {/* Hidden on small mobile to reduce clutter */}
                    <Link
                      className="
                        hidden sm:inline-flex
                        items-center justify-center gap-2
                        px-6 py-3.5 rounded-2xl
                        bg-white border border-slate-100
                        text-slate-700 text-sm font-bold
                        transition-all duration-300
                        hover:bg-blue-50
                        hover:text-blue-600
                        hover:-translate-y-1
                        hover:shadow-lg hover:shadow-blue-500/5
                      "
                      to="/myPostedJobs"
                    >
                      <Briefcase size={17} />
                      My Posted Jobs
                    </Link>
                  </div>
                </div>

                {/* Recruiter Visual */}
                <div className="hidden sm:flex relative shrink-0 w-32 h-32 lg:w-40 lg:h-40 items-center justify-center">
                  <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

                  <div className="
                    absolute inset-2
                    rounded-[2.5rem]
                    bg-gradient-to-br from-blue-500 to-indigo-700
                    shadow-2xl shadow-blue-500/25
                    rotate-[-5deg]
                    transition-transform duration-500
                    hover:rotate-0
                  " />

                  <div className="
                    relative w-24 h-24 lg:w-28 lg:h-28
                    rounded-[2rem]
                    bg-white
                    border border-white
                    shadow-xl
                    flex items-center justify-center
                  ">
                    <Building2
                      size={50}
                      className="text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hiring Performance */}
          <div className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.3rem]
            bg-slate-950 text-white
            shadow-2xl shadow-slate-950/10
            p-6 sm:p-7
          ">
            <div className="absolute -top-20 -right-16 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                    Performance
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Hiring Progress
                  </h2>
                </div>

                <div className="
                  w-12 h-12 rounded-2xl
                  bg-white/10 border border-white/10
                  flex items-center justify-center
                  backdrop-blur-md
                ">
                  <TrendingUp size={23} className="text-blue-300" />
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-300">
                      Jobs Published
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Your hiring activity
                    </p>
                  </div>

                  <span className="text-5xl font-black text-white">
                    {myJobs.length}
                  </span>
                </div>

                <div className="mt-6 w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`
                      ${myJobs.length > 0 ? "w-[70%]" : "w-[10%]"}
                      h-full rounded-full
                      bg-gradient-to-r from-blue-400 to-indigo-400
                      transition-all duration-700
                    `}
                  />
                </div>

                <p className="mt-5 text-sm text-slate-300 leading-relaxed">
                  Your published opportunities are visible to candidates and
                  ready to receive applications.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-300">
                  <BarChart3 size={15} />
                  Keep building your hiring pipeline
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-7 sm:mb-9">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group relative overflow-hidden
                  rounded-[1.5rem] sm:rounded-[1.8rem]
                  bg-white/80 backdrop-blur-xl
                  border border-white
                  shadow-[0_12px_35px_rgba(15,23,42,0.05)]
                  p-4 sm:p-6
                  transition-all duration-500
                  hover:-translate-y-1.5
                  hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)]
                "
              >
                <div
                  className={`
                    absolute top-0 left-0 w-full h-1
                    bg-gradient-to-r ${item.accent}
                  `}
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 truncate">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-2xl sm:text-3xl font-black">
                      {item.value}
                    </h3>
                  </div>

                  <div className="relative shrink-0">
                    <div
                      className={`
                        absolute inset-0 rounded-2xl ${item.bg}
                        blur-lg opacity-0
                        group-hover:opacity-100
                        transition-opacity
                      `}
                    />

                    <div
                      className={`
                        relative w-11 h-11 sm:w-14 sm:h-14
                        rounded-2xl ${item.bg}
                        flex items-center justify-center
                        transition-all duration-300
                        group-hover:rotate-[-6deg]
                        group-hover:scale-110
                      `}
                    >
                      <Icon
                        size={24}
                        className={item.color}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid xl:grid-cols-[minmax(0,1fr)_350px] gap-7 sm:gap-8">

          {/* Left Main Area */}
          <div className="space-y-7 sm:space-y-8">

            {/* Recent Job Posts */}
            <div className="
              rounded-[2rem] sm:rounded-[2.4rem]
              bg-white/80 backdrop-blur-xl
              border border-white
              shadow-[0_18px_55px_rgba(15,23,42,0.06)]
              p-5 sm:p-7
            ">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="
                      w-10 h-10 rounded-2xl
                      bg-blue-50
                      flex items-center justify-center
                    ">
                      <BriefcaseBusiness
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-black">
                        Recent Job Posts
                      </h2>

                      <p className="mt-1 text-xs sm:text-sm text-slate-500">
                        Manage your latest published opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/myPostedJobs"
                  className="
                    group inline-flex items-center gap-2
                    text-sm font-bold text-blue-600
                    transition-all
                    hover:gap-3
                  "
                >
                  Manage All
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="space-y-4">

                {loadingJobs && (
                  <div className="
                    rounded-[1.7rem]
                    bg-slate-50
                    border border-slate-100
                    p-8 text-center
                  ">
                    <div className="
                      w-12 h-12 mx-auto rounded-2xl
                      bg-blue-50
                      flex items-center justify-center
                      animate-pulse
                    ">
                      <BriefcaseBusiness
                        size={23}
                        className="text-blue-600"
                      />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-500">
                      Loading your posted jobs...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="
                    rounded-[1.7rem]
                    bg-red-50
                    border border-red-100
                    p-7 text-center
                    text-red-600 font-semibold
                  ">
                    {error}
                  </div>
                )}

                {!loadingJobs && !error && myJobs.length === 0 && (
                  <div className="
                    relative overflow-hidden
                    rounded-[1.8rem]
                    bg-slate-50
                    border border-slate-100
                    p-8 sm:p-10 text-center
                  ">
                    <div className="
                      w-16 h-16 mx-auto
                      rounded-[1.5rem]
                      bg-gradient-to-br from-blue-500 to-indigo-600
                      flex items-center justify-center
                      text-white
                      shadow-xl shadow-blue-500/20
                    ">
                      <BriefcaseBusiness size={28} />
                    </div>

                    <p className="mt-5 text-slate-700 font-bold">
                      You haven't posted any jobs yet.
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Start building your team by creating your first job post.
                    </p>

                    <Link
                      to="/postJob"
                      className="
                        mt-6 inline-flex items-center gap-2
                        px-6 py-3 rounded-2xl
                        bg-blue-600 text-white
                        text-sm font-bold
                        shadow-lg shadow-blue-500/20
                        transition-all
                        hover:-translate-y-1
                        hover:bg-indigo-600
                      "
                    >
                      <Plus size={17} />
                      Post Your First Job
                    </Link>
                  </div>
                )}

                {!loadingJobs &&
                  !error &&
                  myJobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="
                        group relative overflow-hidden
                        rounded-[1.7rem]
                        bg-slate-50/80
                        border border-slate-100
                        p-5
                        transition-all duration-500
                        hover:bg-white
                        hover:-translate-y-1
                        hover:shadow-xl hover:shadow-blue-500/10
                      "
                    >
                      {/* Hover Accent */}
                      <div className="
                        absolute top-0 left-0 w-1 h-full
                        bg-gradient-to-b from-blue-500 to-indigo-500
                        scale-y-0 group-hover:scale-y-100
                        origin-top transition-transform duration-500
                      " />

                      <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                        <div className="flex gap-4 min-w-0">

                          {/* Job Icon */}
                          <div className="relative shrink-0 w-13 h-13">
                            <div className="
                              w-14 h-14 rounded-2xl
                              bg-gradient-to-br from-blue-500 to-indigo-700
                              flex items-center justify-center
                              text-white
                              shadow-lg shadow-blue-500/20
                              transition-all duration-300
                              group-hover:rotate-[-5deg]
                              group-hover:-translate-y-1
                            ">
                              <BriefcaseBusiness size={24} />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-black text-base sm:text-lg text-slate-950">
                                {job.title}
                              </h3>

                              <span className="
                                inline-flex items-center gap-1.5
                                px-3 py-1 rounded-full
                                bg-emerald-50 text-emerald-700
                                border border-emerald-100
                                text-[11px] font-black
                              ">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {job.status || "ACTIVE"}
                              </span>
                            </div>

                            <div className="
                              mt-3 flex flex-wrap gap-x-4 gap-y-2
                              text-xs font-semibold text-slate-500
                            ">
                              <span className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-blue-500" />
                                {job.location}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Clock3 size={14} className="text-indigo-500" />
                                {job.jobType || "Not specified"}
                              </span>

                              {/* Hide salary on very small screens */}
                              <span className="hidden sm:flex items-center gap-1.5">
                                <IndianRupee size={14} className="text-emerald-500" />
                                {formatSalary(job)}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <CalendarDays size={14} />
                                {formatDate(job.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Job Actions */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                          <Link
                            to={`/jobDetails/${job.id}`}
                            className="
                              inline-flex items-center gap-2
                              px-4 py-2.5 rounded-xl
                              bg-white border border-slate-100
                              text-sm font-bold text-blue-600
                              transition-all
                              hover:bg-blue-50
                              hover:-translate-y-0.5
                            "
                          >
                            <Eye size={16} />
                            <span className="hidden sm:inline">
                              View Job
                            </span>
                          </Link>

                          <Link
                            to={`/applicationManagement?jobId=${job.id}`}
                            className="
                              inline-flex items-center gap-2
                              px-4 py-2.5 rounded-xl
                              bg-slate-950 text-white
                              text-sm font-bold
                              transition-all
                              hover:bg-blue-600
                              hover:-translate-y-0.5
                              shadow-lg shadow-slate-950/10
                            "
                          >
                            <Users size={16} />
                            Applicants
                          </Link>

                          <Link
                            to={`/editJob/${job.id}`}
                            className="
                              w-10 h-10 rounded-xl
                              bg-white border border-slate-100
                              flex items-center justify-center
                              text-slate-500
                              transition-all
                              hover:text-blue-600
                              hover:bg-blue-50
                              hover:-translate-y-0.5
                            "
                          >
                            <Edit3 size={17} />
                          </Link>

                          <button
                            className="
                              hidden sm:flex
                              w-10 h-10 rounded-xl
                              bg-white border border-slate-100
                              items-center justify-center
                              text-slate-500
                              transition-all
                              hover:text-blue-600
                              hover:bg-blue-50
                            "
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Latest Applicants */}
            <div className="
              rounded-[2rem] sm:rounded-[2.4rem]
              bg-white/80 backdrop-blur-xl
              border border-white
              shadow-[0_18px_55px_rgba(15,23,42,0.05)]
              p-5 sm:p-7
            ">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="
                    w-10 h-10 rounded-2xl
                    bg-violet-50
                    flex items-center justify-center
                  ">
                    <UserRound
                      size={20}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black">
                      Latest Applicants
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                      Review candidates who applied recently.
                    </p>
                  </div>
                </div>

                <Link
                  to="/applicationManagement"
                  className="
                    group inline-flex items-center gap-2
                    text-sm font-bold text-blue-600
                    transition-all hover:gap-3
                  "
                >
                  View All
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="
                relative overflow-hidden
                rounded-[1.8rem]
                bg-gradient-to-br from-slate-50 to-blue-50/50
                border border-slate-100
                p-7 sm:p-9 text-center
              ">
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="
                  relative w-16 h-16 mx-auto
                  rounded-[1.5rem]
                  bg-white
                  shadow-lg shadow-blue-500/10
                  border border-blue-50
                  flex items-center justify-center
                ">
                  <UserRound size={29} className="text-blue-600" />
                </div>

                <p className="relative mt-5 text-slate-700 font-bold">
                  Applicant data is ready to manage.
                </p>

                <p className="relative mt-2 text-sm text-slate-500 max-w-md mx-auto">
                  Review candidates, check applications, and manage hiring
                  decisions from Application Management.
                </p>

                <Link
                  to="/applicationManagement"
                  className="
                    relative mt-6 inline-flex items-center gap-2
                    px-6 py-3 rounded-2xl
                    bg-blue-600 text-white
                    text-sm font-bold
                    shadow-lg shadow-blue-500/20
                    transition-all
                    hover:-translate-y-1
                    hover:bg-indigo-600
                  "
                >
                  Open Applications
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* Quick Actions */}
            <div className="
              rounded-[2rem]
              bg-white/80 backdrop-blur-xl
              border border-white
              shadow-[0_18px_55px_rgba(15,23,42,0.06)]
              p-5 sm:p-6
            ">
              <div className="flex items-center gap-3">
                <div className="
                  w-10 h-10 rounded-2xl
                  bg-blue-50
                  flex items-center justify-center
                ">
                  <Sparkles size={19} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-black">
                    Quick Actions
                  </h2>

                  <p className="text-xs text-slate-500">
                    Manage your hiring faster
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">

                <Link
                  className="
                    group w-full flex items-center justify-between gap-4
                    p-4 rounded-2xl
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    text-white
                    shadow-lg shadow-blue-500/20
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl hover:shadow-blue-500/25
                  "
                  to="/postJob"
                >
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <span className="
                      w-9 h-9 rounded-xl
                      bg-white/15
                      flex items-center justify-center
                    ">
                      <Plus size={18} />
                    </span>
                    Post New Job
                  </span>

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <QuickAction
                  to="/myPostedJobs"
                  icon={BriefcaseBusiness}
                  text="Manage Posted Jobs"
                />

                <QuickAction
                  to="/applicationManagement"
                  icon={Users}
                  text="View Applications"
                />

                <QuickAction
                  to="/companyProfile"
                  icon={FileText}
                  text="My Company Profile"
                />
              </div>
            </div>

            {/* Company Card */}
            <div className="
              relative overflow-hidden
              rounded-[2rem]
              bg-white/80 backdrop-blur-xl
              border border-white
              shadow-[0_18px_55px_rgba(15,23,42,0.05)]
              p-6
            ">
              <div className="absolute -top-20 -right-16 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="
                  relative w-14 h-14 shrink-0
                ">
                  <div className="
                    absolute inset-0 translate-y-1
                    rounded-2xl bg-blue-500/10
                  " />

                  <div className="
                    relative w-full h-full rounded-2xl
                    bg-gradient-to-br from-blue-500 to-indigo-700
                    text-white
                    flex items-center justify-center
                    shadow-lg shadow-blue-500/20
                  ">
                    <Building2 size={27} />
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-black">
                    Recruiter Account
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 truncate">
                    {localStorage.getItem("userEmail") ||
                      "recruiter@email.com"}
                  </p>
                </div>
              </div>

              <div className="relative mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-500">
                    Company Profile
                  </span>

                  <span className="text-sm font-black text-blue-600">
                    Basic
                  </span>
                </div>

                <div className="
                  w-full h-3 rounded-full
                  bg-slate-100 overflow-hidden
                ">
                  <div className="
                    w-[35%] h-full rounded-full
                    bg-gradient-to-r from-blue-500 to-indigo-600
                  " />
                </div>

                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  Complete your company profile to build stronger trust with
                  candidates.
                </p>
              </div>

              <Link
                to="/companyProfile"
                className="
                  relative mt-6
                  w-full py-3 rounded-2xl
                  bg-blue-50 text-blue-600
                  text-sm font-bold text-center block
                  transition-all
                  hover:bg-blue-600 hover:text-white
                  hover:-translate-y-0.5
                "
              >
                Update Company
              </Link>
            </div>

            {/* Hiring Summary */}
            <div className="
              relative overflow-hidden
              rounded-[2rem]
              bg-slate-950 text-white
              shadow-2xl shadow-slate-950/10
              p-6
            ">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl" />

              <div className="relative">
                <div className="
                  w-12 h-12 rounded-2xl
                  bg-white/10 border border-white/10
                  flex items-center justify-center
                  backdrop-blur-md
                ">
                  <UserCheck size={24} className="text-blue-300" />
                </div>

                <h2 className="mt-5 text-xl font-black">
                  Hiring Summary
                </h2>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  You have posted{" "}
                  <span className="text-white font-black">
                    {myJobs.length}
                  </span>{" "}
                  jobs. Manage candidate applications and continue building
                  your team.
                </p>

                <Link
                  to="/applicationManagement"
                  className="
                    mt-6 w-full py-3 rounded-2xl
                    bg-white text-slate-950
                    text-sm font-bold text-center block
                    transition-all duration-300
                    hover:bg-blue-50
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  View Applications
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

const QuickAction = ({ to, icon: Icon, text }) => {
  return (
    <Link
      to={to}
      className="
        group w-full flex items-center justify-between gap-4
        p-4 rounded-2xl
        bg-slate-50/80 border border-slate-100
        text-slate-700
        transition-all duration-300
        hover:bg-white
        hover:text-blue-600
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-blue-500/5
      "
    >
      <span className="flex items-center gap-3 text-sm font-bold">
        <span className="
          w-9 h-9 rounded-xl
          bg-white border border-slate-100
          flex items-center justify-center
          text-blue-600
          transition-transform duration-300
          group-hover:scale-110 group-hover:rotate-[-5deg]
        ">
          <Icon size={17} />
        </span>

        {text}
      </span>

      <ArrowRight
        size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
};

export default RecruiterDashboard;

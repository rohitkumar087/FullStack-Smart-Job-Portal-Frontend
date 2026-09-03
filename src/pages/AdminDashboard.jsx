import React, { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock3,
  Activity,
  AlertCircle,
  UserCheck,
  UserX,
  LayoutDashboard,
  CheckCircle2,
  CircleAlert,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getPendingRecruiters,
  getAllRecruiters,
  getAllCandidates,
  getAllUsersAdmin,
  getAllJobsAdmin,
} from "../services/jobService";

const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const usersData = await getAllUsersAdmin();
      const candidatesData = await getAllCandidates();
      const recruitersData = await getAllRecruiters();
      const pendingRecruitersData = await getPendingRecruiters();
      const jobsData = await getAllJobsAdmin();

      setAllUsers(usersData || []);
      setCandidates(candidatesData || []);
      setRecruiters(recruitersData || []);
      setPendingRecruiters(pendingRecruitersData || []);
      setJobs(jobsData || []);
    } catch (error) {
      setError("Failed to load admin dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const verifiedRecruiters = recruiters.filter(
    (item) => item.recruiterStatus === "VERIFIED"
  ).length;

  const rejectedRecruiters = recruiters.filter(
    (item) => item.recruiterStatus === "REJECTED"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: allUsers.length,
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600",
      lightBg: "bg-blue-50",
      color: "text-blue-600",
      link: "/admin/users",
      description: "Platform accounts",
    },
    {
      title: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseBusiness,
      iconBg: "from-violet-500 to-purple-600",
      lightBg: "bg-violet-50",
      color: "text-violet-600",
      link: "/admin/jobs",
      description: "Active opportunities",
    },
    {
      title: "Recruiters",
      value: recruiters.length,
      icon: Building2,
      iconBg: "from-orange-500 to-amber-500",
      lightBg: "bg-orange-50",
      color: "text-orange-600",
      link: "/admin/recruiters",
      description: "Hiring companies",
    },
    {
      title: "Pending Reviews",
      value: pendingRecruiters.length,
      icon: Clock3,
      iconBg: "from-amber-400 to-orange-500",
      lightBg: "bg-yellow-50",
      color: "text-yellow-600",
      link: "/admin/recruiters/pending",
      description: "Awaiting approval",
    },
  ];

  const managementCards = [
    {
      title: "Manage Users",
      desc: "View and manage all candidates, recruiters, and admin accounts from one place.",
      icon: Users,
      bg: "bg-blue-50",
      iconBg: "from-blue-500 to-indigo-600",
      color: "text-blue-600",
      link: "/admin/users",
      button: "Open User Management",
      accent: "group-hover:border-blue-200",
    },
    {
      title: "Manage Recruiters",
      desc: "Review recruiter companies and monitor their verification status.",
      icon: Building2,
      bg: "bg-orange-50",
      iconBg: "from-orange-500 to-amber-500",
      color: "text-orange-600",
      link: "/admin/recruiters",
      button: "Open Recruiters",
      accent: "group-hover:border-orange-200",
    },
    {
      title: "Pending Recruiters",
      desc: "Review company requests and approve or reject recruiter accounts.",
      icon: Clock3,
      bg: "bg-yellow-50",
      iconBg: "from-amber-400 to-orange-500",
      color: "text-yellow-600",
      link: "/admin/recruiters/pending",
      button: "Review Requests",
      accent: "group-hover:border-yellow-200",
    },
    {
      title: "Monitor Jobs",
      desc: "View all jobs posted by recruiters across the SmartJob platform.",
      icon: BriefcaseBusiness,
      bg: "bg-violet-50",
      iconBg: "from-violet-500 to-purple-600",
      color: "text-violet-600",
      link: "/admin/jobs",
      button: "Open Job Management",
      accent: "group-hover:border-violet-200",
    },
  ];

  const candidatePercentage = allUsers.length
    ? Math.min((candidates.length / allUsers.length) * 100, 100)
    : 0;

  const verifiedPercentage = recruiters.length
    ? Math.min((verifiedRecruiters / recruiters.length) * 100, 100)
    : 0;

  const pendingPercentage = recruiters.length
    ? Math.min((pendingRecruiters.length / recruiters.length) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-52 left-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute top-[15%] -right-64 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[170px]" />

        <div className="absolute bottom-[-250px] left-[25%] w-[550px] h-[550px] rounded-full bg-violet-500/5 blur-[180px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* ================= HEADER ================= */}
        <section className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8 mb-7 sm:mb-9">
          {/* Welcome Section */}
          <div
            className="
              relative overflow-hidden
              rounded-[2rem] sm:rounded-[2.5rem]
              bg-white/80 backdrop-blur-xl
              border border-white
              shadow-[0_25px_80px_rgba(37,99,235,0.09)]
            "
          >
            {/* Decorative Shapes */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="hidden lg:block absolute top-10 right-[18%] w-16 h-16 rounded-3xl border border-blue-200/50 rotate-[25deg]" />

              <div className="hidden lg:block absolute bottom-10 right-[7%] w-10 h-10 rounded-2xl bg-indigo-500/10 rotate-[30deg]" />
            </div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <div
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-blue-50/90
                      border border-blue-100
                      shadow-sm
                    "
                  >
                    <Sparkles size={16} className="text-blue-600" />

                    <span className="text-xs sm:text-sm font-extrabold text-blue-600">
                      SmartJob Administration
                    </span>
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                    Platform control,
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                      all in one place.
                    </span>
                  </h1>

                  <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                    Monitor users, recruiters, job activity, and platform
                    verification requests from your central administration
                    workspace.
                  </p>

                  {/* Status */}
                  {loading && (
                    <div
                      className="
                        mt-5 inline-flex items-center gap-3
                        px-4 py-3
                        rounded-2xl
                        bg-blue-50
                        border border-blue-100
                        text-sm font-bold text-blue-600
                      "
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />

                      Loading platform data...
                    </div>
                  )}

                  {error && (
                    <div
                      className="
                        mt-5 flex items-start gap-3
                        max-w-xl
                        px-4 py-3.5
                        rounded-2xl
                        bg-red-50
                        border border-red-100
                        text-sm font-semibold text-red-600
                      "
                    >
                      <AlertCircle
                        size={19}
                        className="shrink-0 mt-0.5"
                      />

                      <span>{error}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/admin/recruiters/pending"
                      className="
                        group inline-flex items-center justify-center gap-2
                        px-6 py-3.5
                        rounded-2xl
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        text-white text-sm font-black
                        shadow-xl shadow-blue-500/20
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-2xl hover:shadow-blue-500/25
                      "
                    >
                      <ShieldCheck size={18} />

                      Review Recruiters

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      to="/admin/users"
                      className="
                        inline-flex items-center justify-center gap-2
                        px-6 py-3.5
                        rounded-2xl
                        bg-slate-950
                        text-white text-sm font-black
                        shadow-lg shadow-slate-950/10
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-slate-800
                      "
                    >
                      <Users size={18} />

                      View Users
                    </Link>
                  </div>
                </div>

                {/* 3D Admin Icon */}
                <div className="hidden sm:flex relative shrink-0 w-36 h-36 lg:w-44 lg:h-44 items-center justify-center">
                  <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

                  <div
                    className="
                      absolute inset-2
                      rounded-[2.6rem]
                      bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700
                      shadow-2xl shadow-blue-500/25
                      rotate-[-6deg]
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
                    <ShieldCheck
                      size={48}
                      className="text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ADMIN ACTIVITY PANEL ================= */}
          <div
            className="
              relative overflow-hidden
              rounded-[2rem] sm:rounded-[2.5rem]
              bg-slate-950
              text-white
              shadow-2xl shadow-slate-950/15
              p-6 sm:p-7
            "
          >
            <div className="absolute -top-20 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-20 -left-16 w-48 h-48 bg-violet-500/15 rounded-full blur-3xl" />

            <div className="relative h-full flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-blue-300">
                    <Activity size={16} />

                    <span className="text-xs font-bold uppercase tracking-[0.16em]">
                      Platform Overview
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-black">
                    Admin Insights
                  </h2>

                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    A quick snapshot of your current platform activity.
                  </p>
                </div>

                <div
                  className="
                    w-11 h-11 shrink-0
                    rounded-2xl
                    bg-white/10
                    border border-white/10
                    flex items-center justify-center
                    backdrop-blur-xl
                  "
                >
                  <BarChart3
                    size={21}
                    className="text-blue-300"
                  />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <SummaryProgress
                  label="Candidates"
                  value={candidates.length}
                  percentage={candidatePercentage}
                  bar="bg-blue-500"
                  dot="bg-blue-400"
                />

                <SummaryProgress
                  label="Verified Recruiters"
                  value={verifiedRecruiters}
                  percentage={verifiedPercentage}
                  bar="bg-emerald-500"
                  dot="bg-emerald-400"
                />

                <SummaryProgress
                  label="Pending Reviews"
                  value={pendingRecruiters.length}
                  percentage={pendingPercentage}
                  bar="bg-amber-400"
                  dot="bg-amber-400"
                />
              </div>

              <div
                className="
                  mt-auto pt-7
                  grid grid-cols-2 gap-3
                "
              >
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Total Jobs
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {jobs.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Rejected
                  </p>

                  <p className="mt-1 text-2xl font-black text-red-300">
                    {rejectedRecruiters}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                to={item.link}
                key={index}
                className="
                  group relative overflow-hidden
                  rounded-[1.7rem] sm:rounded-[2rem]
                  bg-white/85 backdrop-blur-xl
                  border border-white
                  shadow-[0_15px_45px_rgba(15,23,42,0.05)]
                  p-4 sm:p-6
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:shadow-[0_25px_55px_rgba(37,99,235,0.12)]
                "
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-slate-100/60 group-hover:scale-125 transition-transform duration-500" />

                <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">
                      {item.value}
                    </h3>

                    <p className="hidden sm:block mt-2 text-xs text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative">
                    <div
                      className={`
                        w-11 h-11 sm:w-14 sm:h-14
                        rounded-2xl
                        bg-gradient-to-br ${item.iconBg}
                        text-white
                        shadow-lg
                        flex items-center justify-center
                        transition-all duration-300
                        group-hover:scale-110
                        group-hover:rotate-3
                      `}
                    >
                      <Icon size={23} />
                    </div>
                  </div>
                </div>

                <div
                  className="
                    relative mt-5
                    flex items-center gap-1
                    text-xs font-black
                    text-slate-400
                    group-hover:text-blue-600
                    transition-colors
                  "
                >
                  View details

                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </section>

        {/* ================= QUICK MANAGEMENT ================= */}
        <section className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-600">
                <LayoutDashboard size={17} />

                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  Administration
                </span>
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                Quick Management
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Access the main administration sections of your platform.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-400">
              <Activity size={17} />
              SmartJob Admin Panel
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {managementCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.link}
                  key={index}
                  className={`
                    group relative overflow-hidden
                    rounded-[2rem]
                    bg-white/85 backdrop-blur-xl
                    border border-white
                    shadow-[0_18px_50px_rgba(15,23,42,0.05)]
                    p-5 sm:p-7
                    transition-all duration-300
                    hover:-translate-y-1.5
                    hover:shadow-[0_28px_60px_rgba(37,99,235,0.10)]
                    ${item.accent}
                  `}
                >
                  <div
                    className={`
                      absolute -right-16 -bottom-16
                      w-40 h-40 rounded-full
                      ${item.bg}
                      opacity-60
                      transition-transform duration-500
                      group-hover:scale-125
                    `}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`
                          w-14 h-14 sm:w-16 sm:h-16
                          rounded-[1.4rem]
                          bg-gradient-to-br ${item.iconBg}
                          text-white
                          shadow-lg
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:scale-110
                          group-hover:-rotate-3
                        `}
                      >
                        <Icon size={27} />
                      </div>

                      <div
                        className="
                          w-10 h-10
                          rounded-xl
                          bg-slate-50
                          border border-slate-100
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:bg-blue-600
                          group-hover:border-blue-600
                          group-hover:text-white
                        "
                      >
                        <ChevronRight
                          size={19}
                          className="text-slate-400 group-hover:text-white"
                        />
                      </div>
                    </div>

                    <h2 className="mt-6 text-xl sm:text-2xl font-black">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-md">
                      {item.desc}
                    </p>

                    <div
                      className={`
                        mt-6 inline-flex items-center gap-2
                        text-sm font-black
                        ${item.color}
                      `}
                    >
                      {item.button}

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================= RECRUITER STATUS ================= */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="
                w-11 h-11
                rounded-2xl
                bg-blue-50
                border border-blue-100
                flex items-center justify-center
              "
            >
              <ShieldCheck
                size={21}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Recruiter Verification Status
              </h2>

              <p className="text-sm text-slate-500">
                Current overview of recruiter account verification.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {/* Verified */}
            <StatusCard
              title="Verified Recruiters"
              value={verifiedRecruiters}
              description="Companies approved to post jobs on the platform."
              icon={UserCheck}
              iconClass="text-emerald-600"
              iconBg="bg-emerald-50"
              borderClass="hover:border-emerald-200"
              valueClass="text-emerald-600"
              accentClass="bg-emerald-500"
              label="Approved"
            />

            {/* Pending */}
            <StatusCard
              title="Pending Reviews"
              value={pendingRecruiters.length}
              description="Recruiter companies currently waiting for approval."
              icon={Clock3}
              iconClass="text-amber-600"
              iconBg="bg-amber-50"
              borderClass="hover:border-amber-200"
              valueClass="text-amber-600"
              accentClass="bg-amber-500"
              label="Action Required"
            />

            {/* Rejected */}
            <StatusCard
              title="Rejected Recruiters"
              value={rejectedRecruiters}
              description="Recruiter accounts that were rejected by administration."
              icon={UserX}
              iconClass="text-red-600"
              iconBg="bg-red-50"
              borderClass="hover:border-red-200"
              valueClass="text-red-600"
              accentClass="bg-red-500"
              label="Rejected"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

/* ================= SUMMARY PROGRESS ================= */

const SummaryProgress = ({
  label,
  value,
  percentage,
  bar,
  dot,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-2.5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dot}`} />

          <span className="text-sm font-semibold text-slate-300">
            {label}
          </span>
        </div>

        <span className="text-sm font-black text-white">
          {value}
        </span>
      </div>

      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${bar} transition-all duration-700`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

/* ================= STATUS CARD ================= */

const StatusCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  iconBg,
  borderClass,
  valueClass,
  accentClass,
  label,
}) => {
  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-[2rem]
        bg-white/85 backdrop-blur-xl
        border border-white
        shadow-[0_15px_45px_rgba(15,23,42,0.05)]
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_55px_rgba(15,23,42,0.08)]
        ${borderClass}
      `}
    >
      <div
        className={`
          absolute top-0 left-0
          w-full h-1
          ${accentClass}
        `}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className={`
            w-13 h-13
            rounded-2xl
            ${iconBg}
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-110
            group-hover:rotate-3
          `}
        >
          <Icon
            size={25}
            className={iconClass}
          />
        </div>

        <div
          className="
            px-3 py-1.5
            rounded-full
            bg-slate-50
            border border-slate-100
            text-[11px]
            font-black
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          {label}
        </div>
      </div>

      <h3 className="mt-6 text-lg sm:text-xl font-black">
        {title}
      </h3>

      <p className={`mt-2 text-4xl font-black ${valueClass}`}>
        {value}
      </p>

      <p className="mt-3 text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default AdminDashboard;
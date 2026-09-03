import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAllRecruiters,
  updateRecruiterStatus,
} from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";

import {
  Building2,
  Search,
  MapPin,
  Globe,
  Mail,
  UserRound,
  CheckCircle2,
  XCircle,
  Clock3,
  Sparkles,
  Filter,
  RefreshCcw,
  ShieldCheck,
  AlertCircle,
  Activity,
  Users,
  ArrowRight,
  SlidersHorizontal,
  LayoutDashboard,
  X,
  CircleAlert,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllRecruiters();

      setRecruiters(data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load recruiters."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleStatusUpdate = async (companyProfileId, status) => {
    try {
      setUpdatingId(companyProfileId);
      setError("");
      setSuccess("");

      await updateRecruiterStatus(companyProfileId, status);

      setSuccess(`Recruiter status updated to ${status}.`);

      await fetchRecruiters();
    } catch (error) {
      console.error("Error updating recruiter status:", error);

      setError(
        getErrorMessage(
          error,
          "Failed to update recruiter status."
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredRecruiters = useMemo(() => {
    return recruiters.filter((company) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        company.companyName
          ?.toLowerCase()
          .includes(keyword) ||
        company.companyLocation
          ?.toLowerCase()
          .includes(keyword) ||
        company.recruiter?.name
          ?.toLowerCase()
          .includes(keyword) ||
        company.recruiter?.email
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        selectedStatus === "ALL" ||
        company.recruiterStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [recruiters, search, selectedStatus]);

  const totalVerified = recruiters.filter(
    (item) => item.recruiterStatus === "VERIFIED"
  ).length;

  const totalPending = recruiters.filter(
    (item) => item.recruiterStatus === "PENDING"
  ).length;

  const totalRejected = recruiters.filter(
    (item) => item.recruiterStatus === "REJECTED"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "VERIFIED") {
      return {
        badge:
          "bg-emerald-50 text-emerald-700 border-emerald-100",
        iconBg:
          "bg-gradient-to-br from-emerald-500 to-green-600",
        iconColor: "text-white",
        softBg: "bg-emerald-50",
        softText: "text-emerald-600",
        glow: "bg-emerald-500/10",
        border: "hover:border-emerald-200",
        Icon: CheckCircle2,
      };
    }

    if (status === "REJECTED") {
      return {
        badge:
          "bg-red-50 text-red-700 border-red-100",
        iconBg:
          "bg-gradient-to-br from-red-500 to-rose-600",
        iconColor: "text-white",
        softBg: "bg-red-50",
        softText: "text-red-600",
        glow: "bg-red-500/10",
        border: "hover:border-red-200",
        Icon: XCircle,
      };
    }

    return {
      badge:
        "bg-amber-50 text-amber-700 border-amber-100",
      iconBg:
        "bg-gradient-to-br from-amber-400 to-orange-500",
      iconColor: "text-white",
      softBg: "bg-amber-50",
      softText: "text-amber-600",
      glow: "bg-amber-500/10",
      border: "hover:border-amber-200",
      Icon: Clock3,
    };
  };

  const statCards = [
    {
      title: "Total Recruiters",
      value: recruiters.length,
      icon: Building2,
      gradient: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      color: "text-orange-600",
      description: "Registered companies",
    },
    {
      title: "Verified",
      value: totalVerified,
      icon: ShieldCheck,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      description: "Approved recruiters",
    },
    {
      title: "Pending",
      value: totalPending,
      icon: Clock3,
      gradient: "from-amber-400 to-orange-500",
      bg: "bg-amber-50",
      color: "text-amber-600",
      description: "Awaiting review",
    },
    {
      title: "Rejected",
      value: totalRejected,
      icon: XCircle,
      gradient: "from-red-500 to-rose-600",
      bg: "bg-red-50",
      color: "text-red-600",
      description: "Rejected accounts",
    },
  ];

  const clearFilters = () => {
    setSearch("");
    setSelectedStatus("ALL");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedStatus !== "ALL";

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-52 left-[5%] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[160px]" />

        <div className="absolute top-[20%] -right-56 w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute bottom-[-250px] left-[30%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[180px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* ================= HEADER ================= */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/80 backdrop-blur-xl
            border border-white
            shadow-[0_25px_80px_rgba(37,99,235,0.09)]
            mb-7 sm:mb-9
          "
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="hidden lg:block absolute top-10 right-[24%] w-16 h-16 rounded-[1.5rem] border border-orange-200/60 rotate-[25deg]" />

            <div className="hidden lg:block absolute bottom-10 right-[10%] w-10 h-10 rounded-xl bg-blue-500/10 rotate-[30deg]" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* Left */}
              <div className="max-w-2xl">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-orange-50
                    border border-orange-100
                    shadow-sm
                  "
                >
                  <Sparkles
                    size={16}
                    className="text-orange-600"
                  />

                  <span className="text-xs sm:text-sm font-black text-orange-600">
                    SmartJob Administration
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Manage your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-blue-600">
                    recruiter network.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                  Review company profiles, verify genuine recruiters,
                  handle pending requests, and maintain the quality of
                  your SmartJob hiring network.
                </p>

                {/* Mini Info */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <div
                    className="
                      inline-flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      bg-slate-50/80
                      border border-slate-100
                    "
                  >
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Building2
                        size={18}
                        className="text-orange-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Companies
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {recruiters.length} Recruiters
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      inline-flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      bg-slate-50/80
                      border border-slate-100
                    "
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Clock3
                        size={18}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Requires Review
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {totalPending} Pending
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col lg:items-center gap-5">

                {/* 3D Visual */}
                <div className="hidden lg:flex relative w-36 h-36 items-center justify-center">
                  <div className="absolute inset-0 rounded-[2.7rem] bg-orange-500/10 rotate-6 translate-y-3" />

                  <div
                    className="
                      absolute inset-2
                      rounded-[2.5rem]
                      bg-gradient-to-br
                      from-orange-500
                      via-amber-500
                      to-blue-600
                      shadow-2xl shadow-orange-500/20
                      rotate-[-6deg]
                      transition-transform duration-500
                      hover:rotate-0
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
                    <Building2
                      size={45}
                      className="text-orange-600"
                    />
                  </div>
                </div>

                <button
                  onClick={fetchRecruiters}
                  disabled={loading}
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    rounded-2xl
                    bg-slate-950
                    text-white
                    text-sm
                    font-black
                    shadow-xl shadow-slate-950/10
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-orange-600
                    hover:shadow-orange-500/20
                    disabled:opacity-60
                    disabled:cursor-not-allowed
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
                    : "Refresh Recruiters"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ALERTS ================= */}
        {(error || success) && (
          <div
            className={`
              relative overflow-hidden
              mb-7 sm:mb-9
              flex items-start gap-3
              rounded-[1.6rem]
              border
              px-5 py-4
              text-sm
              font-semibold
              backdrop-blur-xl
              shadow-lg
              ${
                error
                  ? "border-red-100 bg-red-50/90 text-red-700 shadow-red-500/5"
                  : "border-emerald-100 bg-emerald-50/90 text-emerald-700 shadow-emerald-500/5"
              }
            `}
          >
            <div
              className={`
                w-10 h-10
                shrink-0
                rounded-xl
                flex items-center justify-center
                ${
                  error
                    ? "bg-red-100"
                    : "bg-emerald-100"
                }
              `}
            >
              {error ? (
                <AlertCircle size={19} />
              ) : (
                <CheckCircle2 size={19} />
              )}
            </div>

            <div>
              <p className="font-black">
                {error
                  ? "Something went wrong"
                  : "Status updated successfully"}
              </p>

              <p className="mt-1 opacity-80">
                {error || success}
              </p>
            </div>
          </div>
        )}

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7 sm:mb-9">
          {statCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
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
                <div
                  className={`
                    absolute -top-10 -right-10
                    w-28 h-28
                    rounded-full
                    bg-gradient-to-br
                    ${item.gradient}
                    opacity-[0.07]
                    blur-2xl
                    transition-transform duration-500
                    group-hover:scale-150
                  `}
                />

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

                  <div
                    className={`
                      w-11 h-11 sm:w-14 sm:h-14
                      rounded-2xl
                      ${item.bg}
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:rotate-3
                    `}
                  >
                    <Icon
                      size={23}
                      className={item.color}
                    />
                  </div>
                </div>

                <div className="relative mt-5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`
                      h-full w-1/2
                      rounded-full
                      bg-gradient-to-r
                      ${item.gradient}
                      transition-all duration-500
                      group-hover:w-full
                    `}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {/* ================= FILTER SECTION ================= */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.3rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_18px_55px_rgba(37,99,235,0.07)]
            p-5 sm:p-7
            mb-7 sm:mb-9
          "
        >
          <div className="absolute -top-24 right-0 w-56 h-56 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-orange-600">
                  <SlidersHorizontal size={17} />

                  <span className="text-xs font-black uppercase tracking-[0.15em]">
                    Search & Filter
                  </span>
                </div>

                <h2 className="mt-2 text-xl sm:text-2xl font-black">
                  Find Recruiter Companies
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search by company, recruiter, email, location,
                  or filter by verification status.
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    bg-slate-50
                    border border-slate-100
                    text-sm font-bold text-slate-600
                    transition
                    hover:bg-red-50
                    hover:text-red-600
                    hover:border-red-100
                  "
                >
                  <X size={16} />

                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-4">

              {/* Search */}
              <div className="relative">
                <Search
                  size={20}
                  className="
                    absolute left-4 top-1/2 -translate-y-1/2
                    text-slate-400
                    pointer-events-none
                  "
                />

                <input
                  type="text"
                  placeholder="Search company, recruiter, email or location..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    pl-12 pr-4
                    py-4
                    rounded-2xl
                    bg-slate-50/80
                    border border-slate-100
                    outline-none
                    text-sm font-semibold
                    text-slate-700
                    placeholder:text-slate-400
                    transition-all duration-300
                    focus:bg-white
                    focus:border-orange-300
                    focus:ring-4
                    focus:ring-orange-50
                    focus:shadow-lg
                    focus:shadow-orange-500/5
                  "
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter
                  size={19}
                  className="
                    absolute left-4 top-1/2 -translate-y-1/2
                    text-slate-400
                    pointer-events-none
                  "
                />

                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value)
                  }
                  className="
                    w-full
                    pl-12 pr-10
                    py-4
                    rounded-2xl
                    bg-slate-50/80
                    border border-slate-100
                    outline-none
                    text-sm font-bold
                    text-slate-700
                    appearance-none
                    cursor-pointer
                    transition-all duration-300
                    focus:bg-white
                    focus:border-orange-300
                    focus:ring-4
                    focus:ring-orange-50
                  "
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="PENDING">
                    Pending
                  </option>

                  <option value="VERIFIED">
                    Verified
                  </option>

                  <option value="REJECTED">
                    Rejected
                  </option>
                </select>

                <div
                  className="
                    absolute right-4 top-1/2 -translate-y-1/2
                    pointer-events-none
                    text-slate-400
                  "
                >
                  ▾
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RECRUITER DIRECTORY ================= */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_20px_60px_rgba(37,99,235,0.07)]
            p-5 sm:p-7 lg:p-8
          "
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <div className="flex items-center gap-2 text-orange-600">
                <LayoutDashboard size={17} />

                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  Recruiter Directory
                </span>
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                All Recruiter Companies
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Showing{" "}
                <span className="font-black text-slate-700">
                  {filteredRecruiters.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-slate-700">
                  {recruiters.length}
                </span>{" "}
                companies
              </p>
            </div>

            {loading && (
              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2.5
                  rounded-full
                  bg-blue-50
                  border border-blue-100
                  text-blue-700
                  text-sm font-black
                "
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />

                Loading...
              </div>
            )}
          </div>

          {/* Empty */}
          {filteredRecruiters.length === 0 ? (
            <div className="py-14 sm:py-20 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-[2rem] bg-orange-500/10 rotate-6" />

                <div
                  className="
                    relative w-full h-full
                    rounded-[2rem]
                    bg-gradient-to-br
                    from-orange-50
                    to-amber-50
                    border border-orange-100
                    flex items-center justify-center
                  "
                >
                  <Building2
                    size={38}
                    className="text-orange-500"
                  />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black">
                No recruiters found
              </h3>

              <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 leading-relaxed">
                Try changing your search keyword or selected
                verification status.
              </p>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="
                    mt-6
                    inline-flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-orange-600
                    text-white
                    text-sm font-bold
                    shadow-lg shadow-orange-500/20
                    transition
                    hover:-translate-y-0.5
                    hover:bg-orange-700
                  "
                >
                  Clear Filters

                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ) : (
            <div className="grid xl:grid-cols-2 gap-5 sm:gap-6">
              {filteredRecruiters.map((company) => {
                const statusStyle =
                  getStatusStyle(
                    company.recruiterStatus
                  );

                const StatusIcon =
                  statusStyle.Icon;

                return (
                  <div
                    key={company.id}
                    className={`
                      group relative overflow-hidden
                      rounded-[1.8rem]
                      bg-slate-50/70
                      border border-slate-100
                      p-5 sm:p-6
                      transition-all duration-300
                      hover:-translate-y-1.5
                      hover:bg-white
                      hover:border-white
                      hover:shadow-[0_22px_50px_rgba(37,99,235,0.10)]
                      ${statusStyle.border}
                    `}
                  >
                    {/* Glow */}
                    <div
                      className={`
                        absolute -right-14 -top-14
                        w-32 h-32
                        rounded-full
                        ${statusStyle.glow}
                        blur-2xl
                        transition-transform duration-500
                        group-hover:scale-150
                      `}
                    />

                    <div className="relative">

                      {/* Company Header */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`
                            shrink-0
                            w-14 h-14 sm:w-16 sm:h-16
                            rounded-2xl
                            ${statusStyle.iconBg}
                            shadow-lg
                            flex items-center justify-center
                            transition-all duration-300
                            group-hover:scale-110
                            group-hover:-rotate-3
                          `}
                        >
                          <StatusIcon
                            size={27}
                            className={
                              statusStyle.iconColor
                            }
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h3 className="text-lg sm:text-xl font-black text-slate-950 break-words">
                              {company.companyName}
                            </h3>

                            <span
                              className={`
                                inline-flex items-center gap-1.5
                                px-3 py-1.5
                                rounded-full
                                border
                                text-[11px]
                                font-black
                                tracking-wide
                                ${statusStyle.badge}
                              `}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />

                              {company.recruiterStatus}
                            </span>
                          </div>

                          <div className="mt-3 space-y-2">

                            <div className="flex items-start gap-2">
                              <UserRound
                                size={15}
                                className="shrink-0 mt-0.5 text-slate-400"
                              />

                              <p className="text-sm font-semibold text-slate-600">
                                {company.recruiter?.name ||
                                  "Recruiter"}
                              </p>
                            </div>

                            <div className="flex items-start gap-2">
                              <Mail
                                size={15}
                                className="shrink-0 mt-0.5 text-slate-400"
                              />

                              <p className="text-sm text-slate-500 break-all">
                                {company.recruiter?.email ||
                                  "No email"}
                              </p>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin
                                size={15}
                                className="shrink-0 mt-0.5 text-slate-400"
                              />

                              <p className="text-sm text-slate-500">
                                {company.companyLocation ||
                                  "No location"}
                              </p>
                            </div>

                            {company.companyWebsite && (
                              <div className="flex items-start gap-2">
                                <Globe
                                  size={15}
                                  className="shrink-0 mt-0.5 text-slate-400"
                                />

                                <p className="text-sm text-slate-500 break-all">
                                  {company.companyWebsite}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {company.companyDescription && (
                        <div
                          className="
                            mt-5
                            rounded-2xl
                            bg-white/70
                            border border-slate-100
                            p-4
                          "
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <BriefcaseBusiness
                              size={15}
                              className="text-slate-400"
                            />

                            <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                              Company Overview
                            </span>
                          </div>

                          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {company.companyDescription}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-5 pt-5 border-t border-slate-200/70">
                        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
                          Verification Actions
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">

                          {/* Verify */}
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                company.id,
                                "VERIFIED"
                              )
                            }
                            disabled={
                              company.recruiterStatus ===
                                "VERIFIED" ||
                              updatingId ===
                                company.id
                            }
                            className="
                              group/btn
                              inline-flex items-center justify-center gap-2
                              px-4 py-3
                              rounded-xl
                              bg-emerald-600
                              text-white
                              text-sm
                              font-black
                              shadow-lg shadow-emerald-500/15
                              transition-all duration-300
                              hover:-translate-y-0.5
                              hover:bg-emerald-700
                              hover:shadow-emerald-500/25
                              disabled:opacity-45
                              disabled:cursor-not-allowed
                              disabled:hover:translate-y-0
                            "
                          >
                            <CheckCircle2 size={17} />

                            {updatingId ===
                            company.id
                              ? "Updating..."
                              : "Verify"}
                          </button>

                          {/* Reject */}
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                company.id,
                                "REJECTED"
                              )
                            }
                            disabled={
                              company.recruiterStatus ===
                                "REJECTED" ||
                              updatingId ===
                                company.id
                            }
                            className="
                              inline-flex items-center justify-center gap-2
                              px-4 py-3
                              rounded-xl
                              bg-red-600
                              text-white
                              text-sm
                              font-black
                              shadow-lg shadow-red-500/15
                              transition-all duration-300
                              hover:-translate-y-0.5
                              hover:bg-red-700
                              hover:shadow-red-500/25
                              disabled:opacity-45
                              disabled:cursor-not-allowed
                              disabled:hover:translate-y-0
                            "
                          >
                            <XCircle size={17} />

                            {updatingId ===
                            company.id
                              ? "Updating..."
                              : "Reject"}
                          </button>

                          {/* Pending */}
                          {company.recruiterStatus !==
                            "PENDING" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  company.id,
                                  "PENDING"
                                )
                              }
                              disabled={
                                updatingId ===
                                company.id
                              }
                              className="
                                inline-flex items-center justify-center gap-2
                                px-4 py-3
                                rounded-xl
                                bg-amber-50
                                border border-amber-100
                                text-amber-700
                                text-sm
                                font-black
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:bg-amber-100
                                hover:border-amber-200
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                              "
                            >
                              <Clock3 size={17} />

                              {updatingId ===
                              company.id
                                ? "Updating..."
                                : "Mark Pending"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminRecruiters;
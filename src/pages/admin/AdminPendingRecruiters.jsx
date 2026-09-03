import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getPendingRecruiters,
  updateRecruiterStatus,
} from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";

import {
  Clock3,
  Building2,
  CheckCircle2,
  XCircle,
  Search,
  MapPin,
  Mail,
  UserRound,
  Globe,
  Sparkles,
  RefreshCcw,
  ShieldCheck,
  AlertCircle,
  Activity,
  ArrowRight,
  LayoutDashboard,
  ClipboardCheck,
  CircleAlert,
  ShieldAlert,
  BadgeCheck,
  RotateCw,
  Users,
  FileSearch,
} from "lucide-react";

const AdminPendingRecruiters = () => {
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPendingRecruiters = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPendingRecruiters();

      setPendingRecruiters(data || []);
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to load pending recruiters."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRecruiters();
  }, []);

  const handleStatusUpdate = async (
    companyProfileId,
    status
  ) => {
    try {
      setUpdatingId(companyProfileId);
      setError("");
      setSuccess("");

      await updateRecruiterStatus(
        companyProfileId,
        status
      );

      setSuccess(
        `Recruiter status updated to ${status}.`
      );

      await fetchPendingRecruiters();
    } catch (error) {
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
    return pendingRecruiters.filter((company) => {
      const keyword = search.toLowerCase();

      return (
        company.companyName
          ?.toLowerCase()
          .includes(keyword) ||
        company.location
          ?.toLowerCase()
          .includes(keyword) ||
        company.recruiter?.name
          ?.toLowerCase()
          .includes(keyword) ||
        company.recruiter?.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [pendingRecruiters, search]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-52 left-[5%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[170px]" />

        <div className="absolute top-[20%] -right-56 w-[550px] h-[550px] rounded-full bg-orange-500/10 blur-[180px]" />

        <div className="absolute bottom-[-250px] left-[30%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[180px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* ================= HERO HEADER ================= */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_25px_80px_rgba(245,158,11,0.10)]
            mb-7 sm:mb-9
          "
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="hidden lg:block absolute top-12 right-[27%] w-16 h-16 rounded-[1.5rem] border border-amber-200/70 rotate-[25deg]" />

            <div className="hidden lg:block absolute bottom-10 right-[10%] w-11 h-11 rounded-xl bg-orange-500/10 rotate-[30deg]" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* Hero Content */}
              <div className="max-w-2xl">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-amber-50
                    border border-amber-100
                    shadow-sm
                  "
                >
                  <Sparkles
                    size={16}
                    className="text-amber-600"
                  />

                  <span className="text-xs sm:text-sm font-black text-amber-700">
                    Recruiter Verification Queue
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Review recruiter
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-blue-600">
                    verification requests.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                  Review newly registered companies, verify
                  genuine recruiters, and protect the SmartJob
                  platform from invalid or suspicious profiles.
                </p>

                {/* Mini Status Cards */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <div
                    className="
                      inline-flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      bg-amber-50/80
                      border border-amber-100
                    "
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <Clock3
                        size={19}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wide">
                        Waiting
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {pendingRecruiters.length} Pending
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
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <ClipboardCheck
                        size={19}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Review Mode
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        Admin Control
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Right */}
              <div className="flex flex-col lg:items-center gap-5">

                {/* 3D Verification Icon */}
                <div className="hidden lg:flex relative w-36 h-36 items-center justify-center">
                  <div className="absolute inset-0 rounded-[2.7rem] bg-amber-500/15 rotate-6 translate-y-3" />

                  <div
                    className="
                      absolute inset-2
                      rounded-[2.5rem]
                      bg-gradient-to-br
                      from-amber-400
                      via-orange-500
                      to-blue-600
                      shadow-2xl shadow-orange-500/25
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
                    <ShieldCheck
                      size={46}
                      className="text-amber-600"
                    />
                  </div>
                </div>

                {/* Refresh */}
                <button
                  onClick={fetchPendingRecruiters}
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
                    hover:bg-amber-600
                    hover:shadow-amber-500/20
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
                    : "Refresh Queue"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ALERT ================= */}
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
                  : "Action completed successfully"}
              </p>

              <p className="mt-1 opacity-80">
                {error || success}
              </p>
            </div>
          </div>
        )}

        {/* ================= SUMMARY CARDS ================= */}
        <section className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-7 sm:mb-9">

          {/* Pending */}
          <div
            className="
              group relative overflow-hidden
              rounded-[1.8rem]
              bg-white/85 backdrop-blur-xl
              border border-white
              shadow-[0_15px_45px_rgba(15,23,42,0.05)]
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-[0_25px_55px_rgba(245,158,11,0.12)]
            "
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Pending Reviews
                </p>

                <h3 className="mt-2 text-4xl font-black tracking-tight">
                  {pendingRecruiters.length}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Recruiters waiting for action
                </p>
              </div>

              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-amber-50
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-3
                "
              >
                <Clock3
                  size={28}
                  className="text-amber-600"
                />
              </div>
            </div>

            <div className="mt-5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>

          {/* Verify */}
          <div
            className="
              group relative overflow-hidden
              rounded-[1.8rem]
              bg-white/85 backdrop-blur-xl
              border border-white
              shadow-[0_15px_45px_rgba(15,23,42,0.05)]
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-[0_25px_55px_rgba(16,185,129,0.12)]
            "
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Verification Action
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Verify
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Approve genuine companies
                </p>
              </div>

              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-emerald-50
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-3
                "
              >
                <BadgeCheck
                  size={28}
                  className="text-emerald-600"
                />
              </div>
            </div>

            <div className="mt-5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>

          {/* Reject */}
          <div
            className="
              group relative overflow-hidden
              rounded-[1.8rem]
              bg-white/85 backdrop-blur-xl
              border border-white
              shadow-[0_15px_45px_rgba(15,23,42,0.05)]
              p-6
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-[0_25px_55px_rgba(239,68,68,0.12)]
            "
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-red-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Invalid Profiles
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Reject
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Decline suspicious requests
                </p>
              </div>

              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-red-50
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:-rotate-3
                "
              >
                <XCircle
                  size={28}
                  className="text-red-600"
                />
              </div>
            </div>

            <div className="mt-5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </section>

        {/* ================= SEARCH SECTION ================= */}
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
          <div className="absolute -top-24 right-0 w-56 h-56 rounded-full bg-amber-500/5 blur-3xl" />

          <div className="relative">
            <div className="mb-5">
              <div className="flex items-center gap-2 text-amber-600">
                <Search size={17} />

                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  Search Queue
                </span>
              </div>

              <h2 className="mt-2 text-xl sm:text-2xl font-black">
                Find Pending Recruiters
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search by company name, recruiter name,
                email, or location.
              </p>
            </div>

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
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  bg-slate-50/80
                  border border-slate-100
                  outline-none
                  text-sm
                  font-semibold
                  text-slate-700
                  placeholder:text-slate-400
                  transition-all duration-300
                  focus:bg-white
                  focus:border-amber-300
                  focus:ring-4
                  focus:ring-amber-50
                  focus:shadow-lg
                  focus:shadow-amber-500/5
                "
              />
            </div>
          </div>
        </section>

        {/* ================= PENDING DIRECTORY ================= */}
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
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <div className="flex items-center gap-2 text-amber-600">
                <LayoutDashboard size={17} />

                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  Pending Directory
                </span>
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                Recruiters Waiting for Approval
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Showing{" "}
                <span className="font-black text-slate-700">
                  {filteredRecruiters.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-slate-700">
                  {pendingRecruiters.length}
                </span>{" "}
                pending requests
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

          {/* ================= EMPTY STATE ================= */}
          {filteredRecruiters.length === 0 ? (
            <div className="py-16 sm:py-20 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-[2rem] bg-emerald-500/10 rotate-6" />

                <div
                  className="
                    relative
                    w-full h-full
                    rounded-[2rem]
                    bg-gradient-to-br
                    from-emerald-50
                    to-green-50
                    border border-emerald-100
                    flex items-center justify-center
                  "
                >
                  <CheckCircle2
                    size={40}
                    className="text-emerald-600"
                  />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black">
                No pending recruiters found
              </h3>

              <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 leading-relaxed">
                All recruiter requests are already reviewed
                or there are no results matching your search.
              </p>

              {search && (
                <button
                  onClick={clearSearch}
                  className="
                    mt-6
                    inline-flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-amber-600
                    text-white
                    text-sm
                    font-bold
                    shadow-lg shadow-amber-500/20
                    transition
                    hover:-translate-y-0.5
                    hover:bg-amber-700
                  "
                >
                  Clear Search

                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ) : (
            /* ================= RECRUITER CARDS ================= */
            <div className="grid xl:grid-cols-2 gap-5 sm:gap-6">
              {filteredRecruiters.map((company) => (
                <div
                  key={company.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[1.8rem]
                    bg-amber-50/40
                    border border-amber-100/80
                    p-5 sm:p-6
                    transition-all duration-300
                    hover:-translate-y-1.5
                    hover:bg-white
                    hover:border-white
                    hover:shadow-[0_22px_55px_rgba(245,158,11,0.13)]
                  "
                >
                  {/* Card Glow */}
                  <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-amber-500/10 blur-3xl transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative">

                    {/* Company Header */}
                    <div className="flex gap-4">
                      <div
                        className="
                          shrink-0
                          w-14 h-14 sm:w-16 sm:h-16
                          rounded-2xl
                          bg-gradient-to-br
                          from-amber-400
                          to-orange-500
                          shadow-lg shadow-amber-500/20
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:scale-110
                          group-hover:-rotate-3
                        "
                      >
                        <Building2
                          size={27}
                          className="text-white"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <h3 className="text-lg sm:text-xl font-black text-slate-950 break-words">
                            {company.companyName}
                          </h3>

                          <span
                            className="
                              inline-flex items-center gap-1.5
                              px-3 py-1.5
                              rounded-full
                              border border-amber-100
                              bg-amber-50
                              text-amber-700
                              text-[11px]
                              font-black
                              tracking-wide
                            "
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />

                            {company.recruiterStatus ||
                              "PENDING"}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2.5">

                          {/* Recruiter Name */}
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

                          {/* Email */}
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

                          {/* Location */}
                          <div className="flex items-start gap-2">
                            <MapPin
                              size={15}
                              className="shrink-0 mt-0.5 text-slate-400"
                            />

                            <p className="text-sm text-slate-500">
                              {company.location ||
                                "No location"}
                            </p>
                          </div>

                          {/* Website */}
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

                    {/* Company Description */}
                    {company.companyDescription && (
                      <div
                        className="
                          mt-5
                          rounded-2xl
                          bg-white/75
                          border border-amber-100
                          p-4
                        "
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FileSearch
                            size={15}
                            className="text-amber-600"
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

                    {/* Action Buttons */}
                    <div className="mt-5 pt-5 border-t border-amber-100/80">
                      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Verification Decision
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">

                        {/* Verify */}
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              company.id,
                              "VERIFIED"
                            )
                          }
                          disabled={
                            updatingId === company.id
                          }
                          className="
                            group/verify
                            flex-1
                            inline-flex items-center justify-center gap-2
                            px-4 py-3.5
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
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            disabled:hover:translate-y-0
                          "
                        >
                          <CheckCircle2
                            size={18}
                            className="transition-transform duration-300 group-hover/verify:scale-110"
                          />

                          {updatingId === company.id
                            ? "Updating..."
                            : "Verify Company"}
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
                            updatingId === company.id
                          }
                          className="
                            group/reject
                            flex-1
                            inline-flex items-center justify-center gap-2
                            px-4 py-3.5
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
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            disabled:hover:translate-y-0
                          "
                        >
                          <XCircle
                            size={18}
                            className="transition-transform duration-300 group-hover/reject:rotate-90"
                          />

                          {updatingId === company.id
                            ? "Updating..."
                            : "Reject Request"}
                        </button>
                      </div>
                    </div>

                    {/* Verification Warning */}
                    <div
                      className="
                        mt-4
                        flex items-start gap-3
                        rounded-2xl
                        bg-orange-50/80
                        border border-orange-100
                        p-3.5
                      "
                    >
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-orange-100 flex items-center justify-center">
                        <CircleAlert
                          size={16}
                          className="text-orange-600"
                        />
                      </div>

                      <p className="text-xs font-semibold text-orange-700 leading-relaxed">
                        Verify only if the company details look
                        genuine. Rejected recruiters cannot post
                        jobs until their status is changed again.
                      </p>
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

export default AdminPendingRecruiters;
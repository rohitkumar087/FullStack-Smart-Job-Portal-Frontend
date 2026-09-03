import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllUsersAdmin } from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";

import {
  Users,
  UserRound,
  Search,
  ShieldCheck,
  Building2,
  GraduationCap,
  Mail,
  Sparkles,
  Filter,
  RefreshCcw,
  AlertCircle,
  UserCheck,
  ArrowRight,
  LayoutDashboard,
  Activity,
  SlidersHorizontal,
  X,
} from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsersAdmin();

      setUsers(data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load users."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        selectedRole === "ALL" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, search, selectedRole]);

  const totalCandidates = users.filter(
    (user) => user.role === "CANDIDATE"
  ).length;

  const totalRecruiters = users.filter(
    (user) => user.role === "RECRUITER"
  ).length;

  const totalAdmins = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  const getRoleIcon = (role) => {
    if (role === "ADMIN") return ShieldCheck;

    if (role === "RECRUITER") return Building2;

    return GraduationCap;
  };

  const getRoleStyle = (role) => {
    if (role === "ADMIN") {
      return {
        badge:
          "bg-violet-50 text-violet-700 border-violet-100",
        iconBg:
          "bg-gradient-to-br from-violet-500 to-purple-700",
        iconColor: "text-white",
        glow: "bg-violet-500/10",
      };
    }

    if (role === "RECRUITER") {
      return {
        badge:
          "bg-orange-50 text-orange-700 border-orange-100",
        iconBg:
          "bg-gradient-to-br from-orange-500 to-amber-500",
        iconColor: "text-white",
        glow: "bg-orange-500/10",
      };
    }

    return {
      badge:
        "bg-blue-50 text-blue-700 border-blue-100",
      iconBg:
        "bg-gradient-to-br from-blue-500 to-indigo-600",
      iconColor: "text-white",
      glow: "bg-blue-500/10",
    };
  };

  const statCards = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "All platform accounts",
    },
    {
      title: "Candidates",
      value: totalCandidates,
      icon: GraduationCap,
      gradient: "from-emerald-500 to-green-600",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      description: "Active job seekers",
    },
    {
      title: "Recruiters",
      value: totalRecruiters,
      icon: Building2,
      gradient: "from-orange-500 to-amber-500",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      description: "Hiring companies",
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: ShieldCheck,
      gradient: "from-violet-500 to-purple-700",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      description: "Platform managers",
    },
  ];

  const clearFilters = () => {
    setSearch("");
    setSelectedRole("ALL");
  };

  const hasActiveFilters =
    search.trim() !== "" || selectedRole !== "ALL";

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-[8%] w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute top-[20%] -right-48 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[170px]" />

        <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[180px]" />
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
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="hidden lg:block absolute top-10 right-[25%] w-16 h-16 rounded-[1.5rem] border border-blue-200/60 rotate-[25deg]" />

            <div className="hidden lg:block absolute bottom-10 right-[12%] w-10 h-10 rounded-xl bg-indigo-500/10 rotate-[30deg]" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* Header Content */}
              <div className="max-w-2xl">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-blue-50
                    border border-blue-100
                    shadow-sm
                  "
                >
                  <Sparkles
                    size={16}
                    className="text-blue-600"
                  />

                  <span className="text-xs sm:text-sm font-black text-blue-600">
                    SmartJob Administration
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Manage your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                    platform users.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                  Search, filter, and monitor candidates, recruiters, and
                  administrators from one centralized workspace.
                </p>

                {/* Header Stats */}
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
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Users
                        size={18}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Total Accounts
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {users.length} Users
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
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Activity
                        size={18}
                        className="text-emerald-600"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Showing
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {filteredUsers.length} Results
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-4">

                {/* 3D Icon */}
                <div className="hidden lg:flex relative w-32 h-32 mx-auto items-center justify-center">
                  <div className="absolute inset-0 rounded-[2.4rem] bg-blue-500/10 rotate-6 translate-y-3" />

                  <div
                    className="
                      absolute inset-2
                      rounded-[2.2rem]
                      bg-gradient-to-br
                      from-blue-500
                      via-indigo-600
                      to-violet-700
                      shadow-2xl shadow-blue-500/25
                      rotate-[-6deg]
                      transition-transform duration-500
                      hover:rotate-0
                    "
                  />

                  <div
                    className="
                      relative
                      w-20 h-20
                      rounded-[1.7rem]
                      bg-white
                      shadow-xl
                      flex items-center justify-center
                    "
                  >
                    <Users
                      size={38}
                      className="text-blue-600"
                    />
                  </div>
                </div>

                <button
                  onClick={fetchUsers}
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
                    hover:bg-blue-600
                    hover:shadow-blue-500/20
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                >
                  <RefreshCcw
                    size={18}
                    className={loading ? "animate-spin" : "transition-transform duration-300 group-hover:rotate-180"}
                  />

                  {loading ? "Refreshing..." : "Refresh Users"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ERROR ================= */}
        {error && (
          <div
            className="
              relative overflow-hidden
              mb-7
              flex items-start gap-3
              rounded-[1.5rem]
              border border-red-100
              bg-red-50/90
              backdrop-blur-xl
              px-5 py-4
              text-sm
              font-semibold
              text-red-700
              shadow-lg shadow-red-500/5
            "
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertCircle size={19} />
            </div>

            <div>
              <p className="font-black">
                Unable to load users
              </p>

              <p className="mt-1 text-red-600/80">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ================= STATISTICS ================= */}
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
                {/* Background Gradient */}
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
                      ${item.iconBg}
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:rotate-3
                    `}
                  >
                    <Icon
                      size={23}
                      className={item.iconColor}
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

        {/* ================= SEARCH & FILTER ================= */}
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
          <div className="absolute -top-20 right-0 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-blue-600">
                  <SlidersHorizontal size={17} />

                  <span className="text-xs font-black uppercase tracking-[0.15em]">
                    Search & Filter
                  </span>
                </div>

                <h2 className="mt-2 text-xl sm:text-2xl font-black">
                  Find Platform Users
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search by name, email, or filter users by role.
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
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                    focus:border-blue-300
                    focus:ring-4
                    focus:ring-blue-50
                    focus:shadow-lg
                    focus:shadow-blue-500/5
                  "
                />
              </div>

              {/* Role Filter */}
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
                  value={selectedRole}
                  onChange={(e) =>
                    setSelectedRole(e.target.value)
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
                    focus:border-blue-300
                    focus:ring-4
                    focus:ring-blue-50
                  "
                >
                  <option value="ALL">
                    All Roles
                  </option>

                  <option value="CANDIDATE">
                    Candidates
                  </option>

                  <option value="RECRUITER">
                    Recruiters
                  </option>

                  <option value="ADMIN">
                    Admins
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

        {/* ================= USERS ================= */}
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
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <div className="flex items-center gap-2 text-blue-600">
                <LayoutDashboard size={17} />

                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  User Directory
                </span>
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                All Platform Users
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Showing{" "}
                <span className="font-black text-slate-700">
                  {filteredUsers.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-slate-700">
                  {users.length}
                </span>{" "}
                users
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

                Loading Users...
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 ? (
            <div className="py-14 sm:py-20 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-[2rem] bg-blue-500/10 rotate-6" />

                <div
                  className="
                    relative w-full h-full
                    rounded-[2rem]
                    bg-gradient-to-br
                    from-blue-50
                    to-indigo-50
                    border border-blue-100
                    flex items-center justify-center
                  "
                >
                  <Users
                    size={38}
                    className="text-blue-500"
                  />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black">
                No users found
              </h3>

              <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 leading-relaxed">
                We couldn't find any users matching your current search
                or selected role.
              </p>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="
                    mt-6
                    inline-flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                    text-sm font-bold
                    shadow-lg shadow-blue-500/20
                    transition
                    hover:-translate-y-0.5
                    hover:bg-blue-700
                  "
                >
                  Clear Filters

                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                const style = getRoleStyle(user.role);

                return (
                  <div
                    key={user.id}
                    className="
                      group relative overflow-hidden
                      rounded-[1.8rem]
                      bg-slate-50/70
                      border border-slate-100
                      p-5
                      transition-all duration-300
                      hover:-translate-y-1.5
                      hover:bg-white
                      hover:border-white
                      hover:shadow-[0_22px_50px_rgba(37,99,235,0.10)]
                    "
                  >
                    {/* Decorative Glow */}
                    <div
                      className={`
                        absolute -right-12 -top-12
                        w-28 h-28
                        rounded-full
                        ${style.glow}
                        blur-2xl
                        transition-transform duration-500
                        group-hover:scale-150
                      `}
                    />

                    <div className="relative">

                      {/* User Header */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`
                            shrink-0
                            w-14 h-14
                            rounded-2xl
                            ${style.iconBg}
                            shadow-lg
                            flex items-center justify-center
                            transition-all duration-300
                            group-hover:scale-110
                            group-hover:-rotate-3
                          `}
                        >
                          <RoleIcon
                            size={25}
                            className={style.iconColor}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-slate-950 truncate">
                            {user.name}
                          </h3>

                          <div className="mt-2 flex items-start gap-2">
                            <Mail
                              size={15}
                              className="shrink-0 mt-0.5 text-slate-400"
                            />

                            <p className="text-sm text-slate-500 break-all leading-relaxed">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-5 h-px bg-slate-200/70" />

                      {/* Footer */}
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={`
                            inline-flex items-center gap-2
                            px-3.5 py-2
                            rounded-full
                            border
                            text-xs font-black
                            ${style.badge}
                          `}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />

                          {user.role}
                        </span>

                        <div
                          className="
                            w-10 h-10
                            rounded-xl
                            bg-white
                            border border-slate-100
                            shadow-sm
                            flex items-center justify-center
                            text-slate-400
                            transition-all duration-300
                            group-hover:text-blue-600
                            group-hover:border-blue-100
                            group-hover:scale-110
                          "
                        >
                          <UserRound size={18} />
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

export default AdminUsers;
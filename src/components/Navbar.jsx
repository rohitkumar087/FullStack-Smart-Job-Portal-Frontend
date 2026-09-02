import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Menu,
  X,
  LogOut,
  UserRound,
  Sun,
  Moon,
  ShieldCheck,
  LayoutDashboard,
  Search,
  FileText,
  Building2,
  Users,
  Clock3,
  PlusCircle,
  Briefcase,
  User,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  Link,
  NavLink as RouterNavLink,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("userName");

    setIsLoggedIn(!!token);
    setRole(storedRole || "");
    setUserName(storedName || "User");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const getDashboardPath = () => {
    if (role === "ADMIN") return "/adminDashboard";
    if (role === "RECRUITER") return "/recruiterDashboard";
    if (role === "CANDIDATE") return "/candidateDashboard";
    return "/";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    setRole("");
    setUserName("");
    setShowLogoutModal(false);
    setMenuOpen(false);

    navigate("/login");
  };

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const getRoleLabel = () => {
    if (role === "ADMIN") return "Administrator";
    if (role === "RECRUITER") return "Recruiter";
    if (role === "CANDIDATE") return "Candidate";
    return "User";
  };

  const getRoleIcon = () => {
    if (role === "ADMIN") return ShieldCheck;
    if (role === "RECRUITER") return Building2;
    return UserRound;
  };

  const RoleIcon = getRoleIcon();

  return (
    <>
      {/* Navbar Wrapper */}
      <header className="sticky top-0 z-50 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
        <nav
          className="
            relative max-w-[1440px] mx-auto
            rounded-[1.4rem] lg:rounded-[1.7rem]
            border border-white/50 dark:border-slate-700/70
            bg-white/75 dark:bg-slate-950/75
            backdrop-blur-2xl
            shadow-[0_10px_35px_rgba(15,23,42,0.10)]
            dark:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
            transition-all duration-300
            hover:shadow-[0_16px_45px_rgba(37,99,235,0.14)]
          "
        >
          {/* Background Glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="absolute -top-24 left-[10%] w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute -right-20 -bottom-24 w-56 h-56 bg-indigo-400/10 rounded-full blur-3xl" />

            <div className="hidden lg:block absolute top-2 right-[35%] w-20 h-20 border border-blue-200/20 dark:border-blue-400/10 rounded-2xl rotate-12" />
          </div>

          <div className="relative h-[70px] sm:h-[76px] px-4 sm:px-5 lg:px-6 flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to={isLoggedIn ? getDashboardPath() : "/"}
              onClick={() => setMenuOpen(false)}
              className="group relative flex items-center gap-2.5 sm:gap-3 shrink-0"
            >
              {/* 3D Logo */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                <div
                  className="
                    absolute inset-0 rounded-xl sm:rounded-2xl
                    bg-blue-950/25
                    translate-y-1
                    group-hover:translate-y-2
                    transition-transform duration-300
                  "
                />

                <div
                  className="
                    relative w-full h-full rounded-xl sm:rounded-2xl
                    bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700
                    flex items-center justify-center
                    text-white
                    shadow-lg shadow-blue-500/30
                    border border-white/20
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:rotate-[-3deg]
                    group-hover:shadow-xl
                    active:translate-y-0
                  "
                >
                  <BriefcaseBusiness size={22} strokeWidth={2.4} />
                </div>

                {/* Small Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-blue-500/15 blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Brand Name - Visible on Both Mobile and Desktop */}
              <div className="flex flex-col justify-center leading-none min-w-0">
                <div className="flex items-center gap-1">
                  <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-950 dark:text-white whitespace-nowrap">
                    Smart
                    <span className="text-blue-600 dark:text-blue-400">
                      Job
                    </span>
                  </h1>

                  <Sparkles
                    size={14}
                    className="
                      hidden sm:block
                      text-blue-500
                      opacity-0
                      group-hover:opacity-100
                      group-hover:rotate-12
                      transition-all duration-300
                    "
                  />
                </div>

                {/* Subtitle only on larger screens */}
                <p className="hidden sm:block mt-1 text-[10px] sm:text-xs font-bold tracking-[0.16em] uppercase text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  Career Portal
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center justify-center min-w-0">
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-white dark:border-slate-800 shadow-inner">

                {!isLoggedIn && (
                  <>
                    <NavLink to="/" icon={LayoutDashboard}>
                      Home
                    </NavLink>

                    <NavLink to="/jobs" icon={Search}>
                      Jobs
                    </NavLink>
                  </>
                )}

                {isLoggedIn && role === "CANDIDATE" && (
                  <>
                    <NavLink to="/" icon={Search}>
                      Home
                    </NavLink>

                    <NavLink to="/jobs" icon={Briefcase}>
                      Jobs
                    </NavLink>

                    <NavLink
                      to="/candidateDashboard"
                      icon={LayoutDashboard}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/candidateProfile"
                      icon={User}
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/myApplications"
                      icon={FileText}
                    >
                      Applications
                    </NavLink>
                  </>
                )}

                {isLoggedIn && role === "RECRUITER" && (
                  <>
                    <NavLink to="/" icon={Search}>
                      Home
                    </NavLink>

                    <NavLink
                      to="/recruiterDashboard"
                      icon={LayoutDashboard}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/postJob"
                      icon={PlusCircle}
                    >
                      Post Job
                    </NavLink>

                    <NavLink
                      to="/myPostedJobs"
                      icon={Briefcase}
                    >
                      My Jobs
                    </NavLink>

                    <NavLink
                      to="/applicationManagement"
                      icon={FileText}
                    >
                      Applications
                    </NavLink>

                    <NavLink
                      to="/companyProfile"
                      icon={Building2}
                    >
                      Company
                    </NavLink>
                  </>
                )}

                {isLoggedIn && role === "ADMIN" && (
                  <>
                    <NavLink
                      to="/adminDashboard"
                      icon={LayoutDashboard}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/admin/users"
                      icon={Users}
                    >
                      Users
                    </NavLink>

                    <NavLink
                      to="/admin/recruiters"
                      icon={Building2}
                    >
                      Recruiters
                    </NavLink>

                    <NavLink
                      to="/admin/recruiters/pending"
                      icon={Clock3}
                    >
                      Pending
                    </NavLink>

                    <NavLink
                      to="/admin/jobs"
                      icon={Briefcase}
                    >
                      Jobs
                    </NavLink>
                  </>
                )}

              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="
                  group relative w-11 h-11 rounded-2xl
                  bg-slate-100 dark:bg-slate-900
                  border border-slate-200/70 dark:border-slate-700
                  flex items-center justify-center
                  text-slate-700 dark:text-slate-200
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  hover:bg-blue-50
                  dark:hover:bg-slate-800
                  active:translate-y-0
                "
                title="Toggle theme"
              >
                <div className="absolute inset-0 rounded-2xl bg-white/50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition" />

                <div className="relative transition-transform duration-500 group-hover:rotate-180">
                  {darkMode ? (
                    <Sun size={19} className="text-amber-500" />
                  ) : (
                    <Moon size={19} className="text-blue-600" />
                  )}
                </div>
              </button>

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="
                      px-5 py-2.5 rounded-xl
                      text-sm font-bold
                      text-slate-700 dark:text-slate-200
                      hover:text-blue-600
                      transition
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="
                      group relative overflow-hidden
                      px-5 py-2.5 rounded-xl
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white text-sm font-bold
                      shadow-lg shadow-blue-500/25
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:shadow-xl hover:shadow-blue-500/30
                      active:translate-y-0
                    "
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Register
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>

                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                </>
              ) : (
                <>
                  {/* User Card */}
                  <Link
                    to={getDashboardPath()}
                    className="
                      group flex items-center gap-3
                      px-2.5 py-2 pr-4
                      rounded-2xl
                      bg-white/70 dark:bg-slate-900/70
                      border border-slate-200/70 dark:border-slate-700
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:shadow-lg
                      hover:border-blue-200
                      dark:hover:border-blue-900
                    "
                  >
                    <div className="relative">

                      <div className="
                        w-10 h-10 rounded-xl
                        bg-gradient-to-br from-blue-500 to-indigo-700
                        text-white
                        flex items-center justify-center
                        shadow-lg shadow-blue-500/25
                        transition-transform duration-300
                        group-hover:rotate-[-5deg] group-hover:scale-105
                      ">
                        <RoleIcon size={19} />
                      </div>

                      <span className="absolute -right-1 -bottom-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />

                    </div>

                    <div className="max-w-[110px]">
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {userName}
                      </p>

                      <p className="text-[10px] font-bold tracking-wide uppercase text-blue-600 dark:text-blue-400 truncate">
                        {getRoleLabel()}
                      </p>
                    </div>

                    <ChevronDown
                      size={15}
                      className="text-slate-400 transition-transform group-hover:translate-y-0.5"
                    />
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(true)}
                    className="
                      group relative w-11 h-11 rounded-2xl
                      bg-red-50 dark:bg-red-950/30
                      border border-red-100 dark:border-red-900/40
                      text-red-600 dark:text-red-400
                      flex items-center justify-center
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:bg-red-100
                      dark:hover:bg-red-950/50
                      hover:shadow-lg hover:shadow-red-500/10
                      active:translate-y-0
                    "
                    title="Logout"
                  >
                    <LogOut
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </>
              )}
            </div>

            {/* Mobile / Tablet Controls */}
            <div className="xl:hidden flex items-center gap-2">

              <button
                type="button"
                onClick={toggleTheme}
                className="
                  w-10 h-10 sm:w-11 sm:h-11
                  rounded-xl sm:rounded-2xl
                  bg-slate-100 dark:bg-slate-900
                  border border-slate-200 dark:border-slate-700
                  flex items-center justify-center
                  text-slate-700 dark:text-slate-200
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                "
              >
                <div className="transition-transform duration-500 hover:rotate-180">
                  {darkMode ? (
                    <Sun size={18} className="text-amber-500" />
                  ) : (
                    <Moon size={18} className="text-blue-600" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  relative w-11 h-11 sm:w-12 sm:h-12
                  rounded-xl sm:rounded-2xl
                  bg-gradient-to-br from-blue-600 to-indigo-700
                  text-white
                  flex items-center justify-center
                  shadow-lg shadow-blue-500/25
                  border border-white/20
                  transition-all duration-300
                  hover:-translate-y-0.5
                  active:scale-95
                "
              >
                <span className="absolute inset-0 rounded-[inherit] bg-white/10 opacity-0 hover:opacity-100 transition" />

                <span className="relative">
                  {menuOpen ? (
                    <X size={22} />
                  ) : (
                    <Menu size={22} />
                  )}
                </span>
              </button>

            </div>

          </div>

          {/* Mobile Menu */}
          <div
            className={`
              xl:hidden overflow-hidden
              transition-all duration-500 ease-in-out
              ${
                menuOpen
                  ? "max-h-[900px] opacity-100 pb-5 px-4 sm:px-5"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <div className="
              relative overflow-hidden
              rounded-[1.5rem]
              bg-slate-50/90 dark:bg-slate-900/80
              border border-slate-200/70 dark:border-slate-700
              p-3
              shadow-inner
            ">

              <div className="pointer-events-none absolute -top-16 -right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl" />

              {/* User Summary */}
              {isLoggedIn && (
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMenuOpen(false)}
                  className="
                    relative mb-3
                    flex items-center gap-4
                    p-4 rounded-[1.2rem]
                    bg-gradient-to-br from-slate-950 to-slate-800
                    dark:from-blue-950 dark:to-slate-950
                    text-white
                    shadow-lg
                  "
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <RoleIcon size={23} className="text-blue-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-extrabold truncate">
                      {userName}
                    </p>

                    <p className="text-xs text-blue-300 font-bold">
                      {getRoleLabel()}
                    </p>
                  </div>

                  <ArrowRight
                    size={19}
                    className="ml-auto text-blue-300"
                  />
                </Link>
              )}

              <div className="relative grid gap-1.5">

                {!isLoggedIn && (
                  <>
                    <MobileLink
                      to="/"
                      icon={LayoutDashboard}
                      setMenuOpen={setMenuOpen}
                    >
                      Home
                    </MobileLink>

                    <MobileLink
                      to="/jobs"
                      icon={Search}
                      setMenuOpen={setMenuOpen}
                    >
                      Explore Jobs
                    </MobileLink>
                  </>
                )}

                {isLoggedIn && role === "CANDIDATE" && (
                  <>
                    <MobileLink
                      to="/candidateDashboard"
                      icon={LayoutDashboard}
                      setMenuOpen={setMenuOpen}
                    >
                      Dashboard
                    </MobileLink>

                    <MobileLink
                      to="/jobs"
                      icon={Briefcase}
                      setMenuOpen={setMenuOpen}
                    >
                      Explore Jobs
                    </MobileLink>

                    <MobileLink
                      to="/myApplications"
                      icon={FileText}
                      setMenuOpen={setMenuOpen}
                    >
                      My Applications
                    </MobileLink>

                    <MobileLink
                      to="/candidateProfile"
                      icon={User}
                      setMenuOpen={setMenuOpen}
                    >
                      My Profile
                    </MobileLink>
                  </>
                )}

                {isLoggedIn && role === "RECRUITER" && (
                  <>
                    <MobileLink
                      to="/recruiterDashboard"
                      icon={LayoutDashboard}
                      setMenuOpen={setMenuOpen}
                    >
                      Dashboard
                    </MobileLink>

                    <MobileLink
                      to="/postJob"
                      icon={PlusCircle}
                      setMenuOpen={setMenuOpen}
                    >
                      Post New Job
                    </MobileLink>

                    <MobileLink
                      to="/myPostedJobs"
                      icon={Briefcase}
                      setMenuOpen={setMenuOpen}
                    >
                      My Posted Jobs
                    </MobileLink>

                    <MobileLink
                      to="/applicationManagement"
                      icon={FileText}
                      setMenuOpen={setMenuOpen}
                    >
                      Applications
                    </MobileLink>

                    <MobileLink
                      to="/companyProfile"
                      icon={Building2}
                      setMenuOpen={setMenuOpen}
                    >
                      Company Profile
                    </MobileLink>
                  </>
                )}

                {isLoggedIn && role === "ADMIN" && (
                  <>
                    <MobileLink
                      to="/adminDashboard"
                      icon={LayoutDashboard}
                      setMenuOpen={setMenuOpen}
                    >
                      Dashboard
                    </MobileLink>

                    <MobileLink
                      to="/admin/users"
                      icon={Users}
                      setMenuOpen={setMenuOpen}
                    >
                      Users
                    </MobileLink>

                    <MobileLink
                      to="/admin/recruiters"
                      icon={Building2}
                      setMenuOpen={setMenuOpen}
                    >
                      Recruiters
                    </MobileLink>

                    <MobileLink
                      to="/admin/recruiters/pending"
                      icon={Clock3}
                      setMenuOpen={setMenuOpen}
                    >
                      Pending Recruiters
                    </MobileLink>

                    <MobileLink
                      to="/admin/jobs"
                      icon={Briefcase}
                      setMenuOpen={setMenuOpen}
                    >
                      Jobs
                    </MobileLink>
                  </>
                )}

              </div>

              {/* Authentication Buttons */}
              {!isLoggedIn ? (
                <div className="relative grid grid-cols-2 gap-3 mt-4">

                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="
                      text-center px-4 py-3.5 rounded-xl
                      bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      text-sm font-bold
                      text-slate-700 dark:text-slate-200
                      transition-all
                      hover:border-blue-200
                      hover:text-blue-600
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="
                      flex items-center justify-center gap-2
                      px-4 py-3.5 rounded-xl
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white text-sm font-bold
                      shadow-lg shadow-blue-500/20
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    Register
                    <ArrowRight size={16} />
                  </Link>

                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="
                    relative mt-4 w-full
                    flex items-center justify-center gap-2
                    px-4 py-3.5 rounded-xl
                    bg-red-50 dark:bg-red-950/30
                    border border-red-100 dark:border-red-900/40
                    text-red-600 dark:text-red-400
                    text-sm font-bold
                    transition-all
                    hover:bg-red-100
                    dark:hover:bg-red-950/50
                    active:scale-[0.98]
                  "
                >
                  <LogOut size={19} />
                  Logout
                </button>
              )}

            </div>
          </div>

        </nav>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal */}
          <div
            className="
              relative w-full max-w-md
              overflow-hidden
              rounded-[2rem]
              bg-white dark:bg-slate-900
              border border-white/40 dark:border-slate-700
              shadow-2xl
              animate-[modalIn_0.3s_ease-out]
            "
          >
            {/* Decorative Background */}
            <div className="absolute -top-20 -right-16 w-48 h-48 rounded-full bg-red-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative p-6 sm:p-8">

              <div className="
                relative w-20 h-20 mx-auto
                rounded-[1.7rem]
                bg-red-50 dark:bg-red-950/40
                border border-red-100 dark:border-red-900/40
                flex items-center justify-center
                shadow-lg shadow-red-500/10
              ">
                <div className="absolute inset-1 rounded-[1.4rem] bg-white/60 dark:bg-white/5" />

                <LogOut
                  size={33}
                  className="relative text-red-600 dark:text-red-400"
                />
              </div>

              <div className="text-center mt-6">

                <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wider">
                  Account Session
                </p>

                <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                  Ready to leave?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  You will be securely logged out from your account and will
                  need to login again to access your dashboard.
                </p>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="
                    px-5 py-3.5 rounded-xl
                    bg-slate-100 dark:bg-slate-800
                    text-slate-700 dark:text-slate-200
                    text-sm font-bold
                    transition-all duration-300
                    hover:bg-slate-200
                    dark:hover:bg-slate-700
                    active:scale-[0.98]
                  "
                >
                  Stay Here
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    px-5 py-3.5 rounded-xl
                    bg-gradient-to-r from-red-600 to-rose-600
                    text-white
                    text-sm font-bold
                    shadow-lg shadow-red-500/20
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    active:translate-y-0
                  "
                >
                  Yes, Logout
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

const NavLink = ({ to, children, icon: Icon }) => {
  return (
    <RouterNavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `
          group relative
          flex items-center gap-2
          px-3 py-2.5 rounded-xl
          text-[13px] font-bold
          whitespace-nowrap
          transition-all duration-300
          ${
            isActive
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-md shadow-slate-200/60 dark:shadow-black/20 -translate-y-[1px]"
              : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-slate-800/70"
          }
        `
      }
    >
      {Icon && (
        <Icon
          size={15}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      )}

      {children}
    </RouterNavLink>
  );
};

const MobileLink = ({
  to,
  children,
  setMenuOpen,
  icon: Icon,
}) => {
  return (
    <RouterNavLink
      to={to}
      end={to === "/"}
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `
          group flex items-center justify-between
          px-4 py-3.5 rounded-xl
          text-sm font-bold
          transition-all duration-300
          ${
            isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800"
          }
        `
      }
    >
      <span className="flex items-center gap-3">
        {Icon && (
          <Icon
            size={18}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {children}
      </span>

      <ArrowRight
        size={16}
        className="opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
      />
    </RouterNavLink>
  );
};

export default Navbar;
